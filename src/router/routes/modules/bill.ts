import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const business: AppRouteModule = {
  path: '/bill',
  name: 'Bill',
  component: LAYOUT,
  redirect: '/bill/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '账单管理',
    orderNo: 15000,
  },
  children: [
    {
      path: 'index',
      name: 'BillIndex',
      component: () => import('/@/views/sys/bill/month/index.vue'),
      meta: {
        title: '月账单管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'dayindex',
      name: 'BillDayIndex',
      component: () => import('/@/views/sys/bill/day/index.vue'),
      meta: {
        title: '日账单管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default business;
