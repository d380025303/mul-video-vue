import Vue from 'vue'
import Router from 'vue-router'
import VideoMovie from './components/VideoMovie.vue';
import VideoSearch from './components/VideoSearch.vue';
// import Home from './views/Home.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'VideoSearch',
      component: VideoSearch
    },
    {
      path: '/VideoMovie',
      name: 'VideoMovie',
      component: VideoMovie
    },
    {
      path: '/VideoSearch',
      name: 'VideoSearch',
      component: VideoSearch
    },
  ]
})
