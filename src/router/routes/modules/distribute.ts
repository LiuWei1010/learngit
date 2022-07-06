import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const distribute: AppRouteModule = {
  path: '/distribute',
  name: 'Distribute',
  component: LAYOUT,
  redirect: '/distribute/agent',
  meta: {
    orderNo: 25,
    icon: 'icon-park-outline:file-cabinet',
    title: '机器分配',
  },
  children: [
    {
      path: 'agent',
      name: 'DistributeAgent',
      component: () => import('/@/views/sys/distribute/agent/index.vue'),
      meta: {
        // affix: true,
        title: '为代理商分配机器',
      },
    },
    {
      path: 'replenisher',
      name: 'DistributeReplenisher',
      component: () => import('/@/views/sys/distribute/replenisher/index.vue'),
      meta: {
        // affix: true,
        title: '为补货员分配机器',
      },
    },
  ],
};

export default distribute;
