import weatherIcon from '../../js/weatherIcon';

export default {
  props: ['weather', 'date'],
  data() {
    return {}
  },
  computed: {
    showWeather() {
      let dateKey = moment(this.date).format('YYYY-MM-DD');
      return this.weather.consolidated_weather.find(weather => {
        return weather.applicable_date === dateKey;
      }) || {};
    }
  },
  methods: {
    icon: weatherIcon,
    click() {
      this.$emit('click', this.weather);
    }
  }
}