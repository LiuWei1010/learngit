import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/index',
  meta: {
    orderNo: 70,
    icon: 'ant-design:user-outlined',
    title: '账号管理',
  },
  children: [
    {
      path: 'index',
      name: 'UserIndex',
      component: () => import('/@/views/sys/user/index.vue'),
      meta: {
        // affix: true,
        title: '添加用户',
      },
    },
  ],
};

export default user;
