import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import CraftZeny from '@/components/craft-zeny/CraftZeny';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/craft-zeny',
      name: 'CraftZeny',
      component: CraftZeny,
    },
  ],
});
