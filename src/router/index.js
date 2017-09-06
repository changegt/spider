import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Song from '@/components/Song'
import Music from '@/components/Music'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
    	path: '/song/:songname',
    	name: 'Song',
    	component: Song
    },
    {
    	path: '/music/:songid',
    	name: 'Music',
    	component: Music
    }
  ]
})
