import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: resolve => require(['../components/login.vue'], resolve)
  },
  {
    path: '/register',
    name: '管理员注册',
    component: resolve => require(['../components/register.vue'], resolve)
  }, {
    path: '/home',
    component: resolve => require(['../components/home.vue'], resolve),
    children: [{
      path: 'news',
      name: '资讯管理',
      component: resolve => require(['../components/news.vue'], resolve)
    }, {
      path: 'book',
      name: '服务管理',
      component: resolve => require(['../components/book.vue'], resolve)
    }, {
      path: 'feedback',
      name: '用户管理',
      component: resolve => require(['../components/feedback.vue'], resolve)
    }, {
      path: 'user',
      name: '反馈管理',
      component: resolve => require(['../components/user.vue'], resolve)
    }]
  }]
})
