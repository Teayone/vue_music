import Vue from 'vue'
import VueRouter from 'vue-router'
//  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:()=>import(/* webpackChunkName: "home" */ '../pages/Home/Home.vue')
  },
  {
    path:'/playlist',
    component:()=>import( /* webpackChunkName: "playlist" */ '../pages/Playlist/Playlist.vue')
  },
  {
    path:'/toplist',
    component:()=>import(/* webpackChunkName: "toplist" */ '../pages/Toplist/Toplist.vue')
  },
  {
    path:'/artist',
    component:()=>import( /* webpackChunkName: "artist" */ '../pages/Artist/Artist.vue')
  },
  {
    path:'/mv',
    component:()=>import( /* webpackChunkName: "artist" */ '../pages/Mv/Mv.vue')
  },
  {
    path:'/newsongs',
    component:()=>import( /* webpackChunkName: "artist" */ '../pages/Newsong/Newsong.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
