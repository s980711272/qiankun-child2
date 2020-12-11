import Vue from 'vue'
import App from './App.vue'
import {asyncRoutes} from '@/router/index'
import Router from 'vue-router'

Vue.config.productionTip = false
let instance = null;
let router = null //解决缓存问题

function render(props = {}) {
  console.log(props)
  router = new Router({
    routes: asyncRoutes,
    mode: 'history',
    base: !window.__POWERED_BY_QIANKUN__ ? '' : 'child',
  })

  //缓存实例化
  if (window.__POWERED_BY_QIANKUN__ && window.__CACHE_INSTANCE_BY_QIAN_KUN_FOR_VUE__) {
    const cachedInstance = window.__CACHE_INSTANCE_BY_QIAN_KUN_FOR_VUE__;

    // 从最初的Vue实例上获得_vnode
    const cachedNode =
      (cachedInstance.cachedInstance && cachedInstance.cachedInstance._vnode) ||
      cachedInstance._vnode;

    // 让当前路由在最初的Vue实例上可用
    router.apps.push(...cachedInstance.catchRoute.apps);

    instance = new Vue({
      router,
      render: () => cachedNode
    });

    // 缓存最初的Vue实例
    instance.cachedInstance = cachedInstance;

    router.onReady(() => {
      const { path } = router.currentRoute;
      const { path: oldPath } = cachedInstance.$router.currentRoute;
      // 当前路由和上一次卸载时不一致，则切换至新路由
      if (path !== oldPath) {
        cachedInstance.$router.push(path);
      }
    });
    instance.$mount('#child');
  } else {
    console.log('正常实例化');
    // 正常实例化
    instance = new Vue({
      el: '#child',
      router,
      render: h => h(App)
    });
  }
}

// 解决子项目不能独立访问的问题 根据访问来源，执行不同渲染方法
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 解决基础路径不正确的问题
if (window.__POWERED_BY_QIANKUN__) { // 动态添加publicPath
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
//导出生命周期
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('vue2 app 启动');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  console.log('卸载')
  const cachedInstance = instance.cachedInstance || instance;
  window.__CACHE_INSTANCE_BY_QIAN_KUN_FOR_VUE__ = cachedInstance;
  const cachedNode = cachedInstance._vnode;
  if (!cachedNode.data.keepAlive) cachedNode.data.keepAlive = true;
  cachedInstance.catchRoute = {
    apps: [...instance.$router.apps]
  }
  instance.$destroy();
  router = null;
  instance.$router.apps = [];
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log(instance,props)
}
