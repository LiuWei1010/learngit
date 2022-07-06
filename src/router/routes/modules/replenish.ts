import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const replenish: AppRouteModule = {
  path: '/replenish',
  name: 'Replensih',
  component: LAYOUT,
  redirect: '/replenish/index',
  meta: {
    orderNo: 40,
    icon: 'ion:grid-outline',
    title: '补货管理',
  },
  children: [
    {
      path: 'index',
      name: 'ReplenishIndex',
      component: () => import('/@/views/sys/replenish/index.vue'),
      meta: {
        // affix: true,
        title: '补货员管理',
        icon: 'mdi:account',
      },
    },
  ],
};

export default replenish;
