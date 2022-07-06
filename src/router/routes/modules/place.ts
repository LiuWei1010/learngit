import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const place: AppRouteModule = {
  path: '/place',
  name: 'Place',
  component: LAYOUT,
  redirect: '/place/index',
  meta: {
    icon: 'flat-color-icons:home',
    title: '场景管理',
    orderNo: 15,
  },
  children: [
    {
      path: 'index',
      name: 'PlaceIndex',
      component: () => import('/@/views/sys/place/list/index.vue'),
      meta: {
        title: '修改场景',
        icon: 'fluent:clipboard-bullet-list-ltr-20-regular',
      },
    },
  ],
};

export default place;
