import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const order: AppRouteModule = {
  path: '/order',
  name: 'Order',
  component: LAYOUT,
  redirect: '/order/index',
  meta: {
    icon: 'icon-park-outline:transaction-order',
    title: '订单管理',
    orderNo: 30,
  },
  children: [
    {
      path: 'index',
      name: 'OrderIndex',
      component: () => import('/@/views/sys/order/index.vue'),
      meta: {
        title: '订单列表',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default order;
