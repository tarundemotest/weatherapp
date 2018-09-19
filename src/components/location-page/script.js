import weatherIcon from '../../js/weatherIcon';
import {getWeather} from '../../js/storage';

export default {
  data() {
    return {
      weather: null,
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    icon: weatherIcon,
    formattedDate(date) {
      return moment(date).format('dddd, D MMM');
    },
    isToday(item) {
      return item.applicable_date === moment().format('YYYY-MM-DD');
    }
  },

  created() {

    getWeather(this.$route.params.woeid, (err, weather) => {
      if (err) throw err;
      this.weather = weather;
    });
  }
}