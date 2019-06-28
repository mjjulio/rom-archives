// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App';

import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

// Vue.use(Router);
// Vue.use(BootstrapVue);
// const routes = [
//   { path: '/', component: HelloWorld },
//   { path: '/about', component: About },
//   { path: '/craft-zeny', component: CraftZeny },
// ];
// const router = new Router({
//   routes,
//   mode: 'history',
// });

// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App },
//   router,
// }).$mount('#app');
