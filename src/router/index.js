import Vue from 'vue'
import VueRouter from 'vue-router'
//  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path:'/',
    redirect:'/home',

  },
  {
    path:'/home',
    component: ()=>import(/* webpackChunkName: "home" */ '../pages/Home/Home.vue')
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
  },
  {
    path:'/playlist-detail',
    component:()=>import( /* webpackChunkName: "playlist-detail" */ '../pages/PlaylistDetail/PlaylistDetail.vue')
  },
  {
    path:'/play-mv',
    component:()=>import( /* webpackChunkName: "play-mv" */ '../pages/Playmv/Playmv.vue')
  },
  {
    path:'/play-video',
    component:()=>import( /* webpackChunkName: "play-video" */ '../pages/Playvideo/Playvideo.vue' )
  },
  {
    path:'/search',
    component:()=>import( /* webpackChunkName: "search" */ '../pages/Search/index.vue' )
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
