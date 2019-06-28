import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import CraftZeny from '@/components/craft-zeny/CraftZeny';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/crafting',
      name: 'CraftZeny',
      component: CraftZeny,
    },
    {
      path: '/vue',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
});
