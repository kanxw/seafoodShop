import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/view/login'
import clientindex from '@/view/client'
import orderDetail from '@/view/client/order/orderdetail'
import mangeindex from '@/view/mange'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/clientindex',
      name: 'clientindex',
      component: clientindex
    },
    {
      path: '/mangeindex',
      name: 'mangeindex',
      component: mangeindex
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
  ]
})


