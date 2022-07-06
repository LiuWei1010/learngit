import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const business: AppRouteModule = {
  path: '/personchar',
  name: 'personCharactic',
  component: LAYOUT,
  redirect: '/personCharactic/getopenid',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: 'openid管理',
    orderNo: 15000,
    hideChildrenInMenu: true,
    hideMenu: true,
  },
  children: [
    {
      path: 'useopenid',
      name: 'useOpenid',
      component: () => import('/@/views/sys/openid/useopenid/index.vue'),
      meta: {
        title: 'openid管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default business;
