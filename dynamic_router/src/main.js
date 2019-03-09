// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import { asyncRouterMap } from './router';

//获取后台返回的路由
import { getRouters } from './api/index'
//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//图标
import '../static/font-awesome-4.7.0/css/font-awesome.css'
Vue.use(ElementUI);
//echarts
//状态管理
import store from '@/store/index';


Vue.config.productionTip = false


//获取组件的方法
const _import = require('./router/_import_' + process.env.NODE_ENV)

//路由守卫
router.beforeEach(function (to, from, next) {
  //如果有登录信息
  if (store.getters.role) {
    //有登录信息有路由
    if (store.getters.newrouter.length != 0) {
      next();
    } else {
      //还没有路由
      let newrouter;
      getRouters({}).then(function (res) {
        newrouter = filterAsyncRouter(res.asyncRouter);
        router.addRoutes(newrouter);
        store.dispatch('Route', newrouter).then(function (res) {
          next({ ...to });
        }).catch(function () { });
      }.bind(this));
    }
  } else if (['/login'].indexOf(to.path) !== -1) {   //必须判断，否则进入死循环
    next();
    //没有登录
  } else {
    next('/login');
  }
});

//解析后台返回的路由
function filterAsyncRouter(routerMap) {
  const rot = routerMap.filter(function (item) {
    item.component = _import(item.component)
    if (item.children && item.children.length) {
      item.children = filterAsyncRouter(item.children)
    }
    return true;
  });
  return rot;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
