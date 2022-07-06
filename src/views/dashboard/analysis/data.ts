export interface GrowCardItem {
  icon?: string;
  title: string;
  value: number;
  total?: number;
  color: string;
  action?: string;
  cash?: String | Number;
  nonCash?: String | Number;
  content?: String;
  count?: string | Number;
  headline?: string | Number;
}

export const growCardList: GrowCardItem[] = [
  {
    headline: '机器信息',
    title: '今日交易额',
    value: 0,
    color: '#66CBFF',
    content: '订单笔数',
    count: 0,
  },
  {
    headline: '代办事项',
    title: '今日退款金额',
    value: 0,
    color: '#FF6634',
    content: '退款笔数',
    count: 0,
  },
  {
    headline: '系统通知',
    title: '今日成交额',
    value: 0,
    color: '#66CBFF',
    content: '订单笔数',
    count: 0,
  },
  // {
  //   title: '昨日销售额',
  //   value: 0,
  //   color: '#339933',
  //   content: '订单笔数',
  //   count: 0,
  // },
  // {
  //   title: '本周销售额',
  //   value: 8000,
  //   total: 120000,
  //   color: '#FF6634',
  // },
  // {
  //   title: '本月销售额',
  //   value: 5000,
  //   total: 50000,
  //   color: '#339933',
  // },
];

export const MachineCardList: GrowCardItem[] = [
  {
    title: '机器在线',
    value: 0,
    color: '#FF6634',
    content: '在线',
    count: 0,
  },
  {
    title: '机器离线',
    value: 0,
    color: '#66CBFF',
    content: '离线',
    count: 0,
  },
  {
    title: '机器异常',
    value: 0,
    color: '#339933',
    content: '台数',
    count: 0,
  },
  {
    title: '机器缺货',
    value: 0,
    color: '#66CBFF',
    content: '台数',
    count: 0,
  },
];
