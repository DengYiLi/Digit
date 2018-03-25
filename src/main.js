import Vue from 'vue'
import Layout from './components/layout'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import IndexPage from './pages/index'
import DetailPage from './pages/detail'
import DigitCountPage from './pages/detail/digitcount'
import PublishPage from './pages/detail/publish'
import ForeCastPage from './pages/detail/forecast'
import AnalysisPage from './pages/detail/analysis'
import OrderListPage from './pages/orderList'

Vue.config.productionTip = false
Vue.use(VueRouter) // 注册
Vue.use(VueResource)

let router = new VueRouter({
  mode: 'history', // history模式
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/orderList',
      component: OrderListPage
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/analysis', // 直接url跳转
      children: [
        {
          path: 'digitcount',
          component: DigitCountPage
        },
        {
          path: 'publish',
          component: PublishPage
        },
        {
          path: 'forecast',
          component: ForeCastPage
        },
        {
          path: 'analysis',
          component: AnalysisPage
        }
      ]
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>'
})
