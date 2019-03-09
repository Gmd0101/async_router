import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login';
Vue.use(Router)
// const _import = require('./router/_import_' + process.env.NODE_ENV)

//获取组件的方法
// const _import = require('./_import_' + process.env.NODE_ENV)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: "Login",
      component: Login
    }
  ]
});

// export const asyncRouterMap = [
//   {
//     path: '/',
//     name: 'Layout',
//     component: _import('Layout'),
//     redirect: '/home',
//     children: [
//       {
//         path: '/home',
//         name: "Home",
//         component: _import('home'),
//         meta: { title: "首页", auth: true }
//       }
//     ]
//   },
//   {
//     path: '/basic',
//     name: 'basic',
//     component: _import('Layout'),
//     redirect: "/basic/basicone",
//     meta: { title: "基础", auth: true },
//     children: [
//       {
//         path: '/basic/basicone',
//         name: 'BasicOne',
//         component: _import('basic/BasicOne'),
//         meta: { title: "基础一", auth: true }
//       },
//       {
//         path: '/basic/basictwo',
//         name: 'BasicTwo',
//         component: _import('basic/BasicTwo'),
//         meta: { title: "基础二", auth: true }
//       }
//     ]
//   }
// ]

export default router;