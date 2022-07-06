import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const machine: AppRouteModule = {
  path: '/machine',
  name: 'Machine',
  component: LAYOUT,
  redirect: '/machine/index',
  meta: {
    icon: 'icon-park-outline:file-cabinet',
    title: '机柜管理',
    orderNo: 20,
  },
  children: [
    {
      path: 'index',
      name: 'MachineIndex',
      component: () => import('/@/views/sys/machine/list/index.vue'),
      meta: {
        title: '机柜列表',
        icon: 'fluent:clipboard-bullet-list-ltr-20-regular',
      },
    },
  ],
};

export default machine;
