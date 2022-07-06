import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { getAuthCache } from '/@/utils/auth';

const level = localStorage.getItem('level');
const judgeLevel = Number(level) === 1 ? false : true;
const cargoway: AppRouteModule = {
  path: '/examine',
  name: 'Examine',
  component: LAYOUT,
  redirect: '/examine/index',
  meta: {
    orderNo: 17000,
    icon: 'ion:grid-outline',
    title: '审核管理',
    hideChildrenInMenu: true,
    hideMenu: judgeLevel,
  },
  children: [
    {
      path: 'index',
      name: 'ExamineIndex',
      component: () => import('/@/views/sys/examine/index.vue'),
      meta: {
        // affix: true,
        title: '审核管理',
      },
    },
  ],
};

export default cargoway;
