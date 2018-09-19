import {getWeathers} from '../../js/storage';
import weatherComponent from '../weather.vue';

const homeCities = [
  "Istanbul",
  "Berlin",
  "London",
  "Helsinki",
  "Dublin",
  "Vancouver",
];

export default {
  data() {
    return {
      weathers: [],
      date: new Date(),
    }
  },
  components: {
    weather: weatherComponent,
  },
  computed: {
    formattedDate() {
      return moment(this.date).format('dddd, Do MMMM');
    }
  },

  methods: {
    weatherClick(weather) {
      this.$router.push({path: `/weather/${weather.woeid}`});
    }
  },

  created() {

    getWeathers(homeCities, (err, weathers) => {
      if (err) throw err;
      this.weathers = weathers;
    });

  }
}