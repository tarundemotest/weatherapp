import {getWeathers} from '../../js/storage';
import weatherComponent from '../weather.vue';

export default {
  data() {
    return {
      loading: true,
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
    },
    doSearch(keyword) {
      this.loading = true;
      getWeathers([keyword], (err, weathers) => {
        if (err) throw err;
        this.weathers = weathers;
        this.$nextTick(() => {
          this.loading = false;
        });
      });
    }
  },

  watch: {
    '$route'() {
      this.doSearch(this.$route.params.keyword);
    }
  },

  created() {
    this.doSearch(this.$route.params.keyword);
  }
}