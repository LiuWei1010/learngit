import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const production: AppRouteModule = {
  path: '/production',
  name: 'Production',
  component: LAYOUT,
  redirect: '/production/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '商品管理',
    orderNo: 50,
  },
  children: [
    {
      path: 'brand',
      name: 'productionBrand',
      component: () => import('/@/views/sys/production/brand/index.vue'),
      meta: {
        title: '品牌管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'cate',
      name: 'productionCate',
      component: () => import('/@/views/sys/production/cate/index.vue'),
      meta: {
        title: '分类管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'manage',
      name: 'productionManage',
      component: () => import('/@/views/sys/production/manage/index.vue'),
      meta: {
        title: '商品管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default production;
