import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const cargoway: AppRouteModule = {
  path: '/cargoway',
  name: 'Cargoway',
  component: LAYOUT,
  redirect: '/cargoway/index',
  meta: {
    orderNo: 60,
    icon: 'ion:grid-outline',
    title: '货道管理',
  },
  children: [
    {
      path: 'index',
      name: 'CargowayIndex',
      component: () => import('/@/views/sys/cargoway/index.vue'),
      meta: {
        // affix: true,
        title: '货道管理',
      },
    },
  ],
};

export default cargoway;
