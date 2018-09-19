Vue.use(VueRouter);

import HomePage from './../components/home-page.vue';
import SearchPage from './../components/search-page.vue';
import LocationPage from './../components/location-page.vue';

const router = new VueRouter({
  routes: [
    {path: '/', component: HomePage},
    {path: '/weather/:woeid', component: LocationPage},
    {path: '/search/:keyword', component: SearchPage},
  ]
});

new Vue({
  router,
  el: '#app',
  data: {
    search: null
  },
  methods: {
    searchSubmit() {
      if (!this.search) return;
      this.$router.push({path: `/search/${this.search}`});
    }
  }
});