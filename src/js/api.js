const api = {
  search(keyword, cb) {
    axios.get(`/weather.php?command=search&keyword=${keyword}`).then(res => {

      //errors
      if (res.status !== 200) return cb(res);
      if (res.data.error) return (res.data.error);

      let city = res.data[0] || null;
      return cb(null, city);
    });
  },


  location(woeid, cb) {
    axios.get(`/weather.php?command=location&woeid=${woeid}`).then(res => {

      //errors
      if (res.status !== 200) return cb(res);
      if (res.data.error) return (res.data.error);

      return cb(null, res.data);

    }).catch(res => {
      cb(res.response.data);
    });
  }
};

export default api;