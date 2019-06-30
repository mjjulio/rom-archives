import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import CraftZeny from '@/components/craft-zeny/CraftZeny';
import Headgear from '@/components/headgear/HeadGear.vue';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  mode: 'hash',
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
      path: '/headgear',
      name: 'Headgear',
      component: Headgear,
    },
    {
      path: '/vue',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
});
