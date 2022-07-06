import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { getAuthCache } from '/@/utils/auth';

// const [level] = getAuthCache('ROLES__KEY__');
const level = localStorage.getItem('level');
const judgeLevel = Number(level) === 1 ? false : true;

const business: AppRouteModule = {
  path: '/business',
  name: 'Business',
  component: LAYOUT,
  redirect: '/business/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '商户管理',
    orderNo: 10000,
  },
  children: [
    {
      path: 'index',
      name: 'BusinessIndex',
      component: () => import('/@/views/sys/business/index/index.vue'),
      meta: {
        title: '商户管理',
        icon: 'simple-icons:about-dot-me',
        hideMenu: judgeLevel,
      },
    },
    {
      path: 'concern',
      name: 'BusinessConcern',
      component: () => import('/@/views/sys/business/concern/index.vue'),
      meta: {
        title: '商户关联管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default business;
