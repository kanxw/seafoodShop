import Vue from 'vue'
import VueRouter from 'vue-router'
//import layout from './layout'
import router from './route'

Vue.use(VueRouter)

let routes = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  beforeEach:(to, from, next) => {
    console.log(to,from,'this isbeforeeach')
    if (to.name !== 'Login') next({ name: 'Login' })
    else next()
  },
  routes: [],
})


routes.addRoutes([...router]);
export default routes


// const constantRouterMap = [
//   { path: '/login', component: () => import('@/views/login/index'), hidden: true },
//   { path: '/404', component: () => import('@/views/404'), hidden: true },

//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard',
//     name: 'Dashboard',
//     hidden: true,
//     children: [{
//       path: 'dashboard',
//       component: () => import('@/views/dashboard/index')
//     }]
//   },
// ]

//export default new VueRouter({
// let router =  new VueRouter({
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

// router.beforeEach((to, from, next) => {
//     NProgress.start() // start progress bar
//     if (getToken()) { // determine if there has token
//       /* has token*/
//       if (to.path === '/login') {
//         next({ path: '/' })
//         NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
//       } else {
//         if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
//           store.dispatch('GetInfo').then(res => { // 拉取user_info
//            const roles = res.roles
//             store.dispatch("GetMenu").then(data => {
//               initMenu(router, data);
//             });
//             next()
//           }).catch((err) => {
//             store.dispatch('FedLogOut').then(() => {
//               Message.error(err || 'Verification failed, please login again')
//               next({ path: '/' })
//             })
//           })
//         } else {
//           next()
//         }
//       }
//     } else {
//       /* has no token*/
//       if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//         next()
//       } else {
//         next('/login') // 否则全部重定向到登录页
//         NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
//       }
//     }
//   })
  
//   router.afterEach(() => {
//     NProgress.done() // finish progress bar
//   })











