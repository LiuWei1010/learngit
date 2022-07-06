import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const home: AppRouteModule = {
  path: '/dashboard',
  name: 'Home',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'mdi:view-grid-outline',
    title: '首页',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.analysis'),
      },
    },
  ],
};

export default home;
