import {waterfall, map as asyncMap} from 'async';
import api from './api';

// let doLog = process.env.NODE_ENV === 'development';
const doLog = false;

export function getCity(keyword, cb) {

  let cities = store('cities') || [];

  cities = cities.filter(city => city);

  //search city in storage
  let city = cities.find(city => {
    return city.title.toLowerCase() === keyword.toLowerCase();
  });
  if (city) {
    if (doLog) console.log('read city from storage');
    return cb(null, city);
  }

  api.search(keyword, (err, city) => {
    if (err) return cb(err);

    if (doLog) console.log('get city from api');

    //save to local storage
    cities.push(city);
    store('cities', cities);

    cb(null, city);
  });

}

export function getWeather(woeid, cb) {
  const key = 'weather-' + woeid;
  let weather = store(key);

  if (weather) {
    if (doLog) console.log('get cached weather');
    return cb(null, weather);
  }

  // console.log(weather);
  api.location(woeid, function (err, weather) {
    if (err) return cb(err);

    if (doLog) console.log('get weather from api');

    //save to local storage
    store(key, weather, 60); //expires after 1 min

    cb(null, weather);
  });
}

export function getWeathers(keywords, cb) {

  waterfall([

    cb => {
      asyncMap(keywords, (keyword, cb) => {
        getCity(keyword, cb);
      }, cb);
    },

    //reject empty cities
    (cities, cb) => {
      cities = cities.filter(city => city);
      cb(null, cities);
    },

    (cities, cb) => {
      asyncMap(cities, (city, cb) => {
        getWeather(city.woeid, (err, weather) => {
          if (err) return cb(err);
          cb(null, weather); //weather object includes city data
        });
      }, cb);
    }

  ], cb);

}