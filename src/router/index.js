import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'
Vue.use(Router)

export const asyncRoutes = [
  {
    path: '/goods',
    component: Layout,
    children: [
      {
        path: '/declare',
        title: 'declare',
        component: () => import('../views/declare'),
        name: 'declare',
        meta: { title: '申报审核', icon: 'dashboard', affix: true }
      },
      {
        path: 'appeal',
        title: 'appeal',
        component: () => import('../views/appeal'),
        name: 'appeal',
        meta: { title: '申诉审核', icon: 'dashboard', affix: true }
      }
    ]
  }
];

// mode: 'history', // require service support
const createRouter = () => new Router({
  routes: asyncRoutes,
  mode: 'history',
  base: !window.__POWERED_BY_QIANKUN__ ? '' : 'child',
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
