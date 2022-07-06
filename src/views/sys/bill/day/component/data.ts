import { BasicColumn } from '/@/components/Table';
import { FormProps } from '/@/components/Form';
import moment from 'moment';
export const columns: BasicColumn = [
  // {
  //   title: '商户id',
  //   dataIndex: 'business_id',
  // },
  {
    title: '可分成收入(元)',
    dataIndex: 'real_total',
    format(data) {
      return parseInt(data) / 100;
    },
  },
  // {
  //   title: '已提现金额(元)',
  //   dataIndex: 'drawed_total',
  //   format(data) {
  //     return parseInt(data) / 100;
  //   },
  // },
  {
    title: '账单提现状态',
    dataIndex: 'draw_status',
    format(data) {
      if (Number(data) === -2) {
        return '未提现';
      } else if (Number(data) === 0) {
        return '已提交申请';
      } else if (Number(data) === 1) {
        return '已提现';
      }
    },
  },
  {
    title: '订单日期',
    dataIndex: 'bill_date',
  },
];

export const schemas = [
  {
    label: '商品ID',
    field: 'production_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品ID',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商户ID',
    field: 'business_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商户ID',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户ID',
    field: 'user_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户ID',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '正常',
          value: 1,
        },
        {
          label: '删除',
          value: -1,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品名称',
    field: 'production_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品名称',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品标题',
    field: 'title',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品标题',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '品牌id',
    field: 'brand_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入品牌id',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '品牌名',
    field: 'brand_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入品牌名',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '分类id',
    field: 'production_type_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入分类id',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '分类名',
    field: 'production_type_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入分类名',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '机器号',
    field: 'machine_no',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机器号',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '手机号',
    field: 'phone',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的手机号',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '价格',
    field: 'price',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的价格',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品原价',
    field: 'original_price',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的商品原价',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '场景id',
    field: 'place_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的场景id',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '场景名称',
    field: 'place_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的场景名称',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '退款数量',
    field: 'refund_count',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的退款数量',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '退款金额',
    field: 'refund_total',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的退款金额',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '收入',
    field: 'total',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的收入',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '订单数',
    field: 'rent_count',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的订单数',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '订单ID',
    field: 'rent_detail_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的订单Id',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '订单编号',
    field: 'rent_no',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的订单编号',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '重量',
    field: 'weight',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的商品重量',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '重量单位',
    field: 'weight_unit',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的重量单位',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '重量误差',
    field: 'weight_error',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的重量误差',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '保质期时间',
    field: 'expiration_date',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的保质期时间',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '保质期单位',
    field: 'expiration_date_unit',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的保质期单位',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '是否存在保质期',
    field: 'is_expiration_date',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '存在',
          value: 1,
        },
        {
          label: '不存在',
          value: 0,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '是否支付',
    field: 'is_pay',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '已支付',
          value: 1,
        },
        {
          label: '未支付',
          value: 0,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品标签',
    field: 'tags',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的商品标签',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品内容',
    field: 'content',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的商品内容',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品描述',
    field: 'summary',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的商品描述',
    },
    colProps: {
      span: 24,
    },
  },
];

export const schemas1 = [
  {
    label: '商户id',
    field: 'business_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的商户id',
      disabled: true,
    },
  },
  {
    label: '商户名称',
    field: 'business_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的商户名称',
      disabled: true,
    },
  },
  {
    label: '分成比例',
    field: 'rate',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的分成比例',
      disabled: true,
    },
  },
  {
    label: '订单日期',
    field: 'bill_date',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的订单日期',
      disabled: true,
    },
  },
  {
    label: '总收入(元)',
    field: 'total',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的总收入',
      disabled: true,
    },
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 80,
    compact: true,
    showAdvancedButton: false,
    fieldMapToTime: [
      // data为时间组件在表单内的字段，startTime，endTime为转化后的开始时间于结束时间
      // 'YYYY-MM-DD'为时间格式，参考moment
      ['datetime', ['startDate', 'endDate'], 'YYYY-MM-DD '],
    ],
    schemas: [
      {
        label: '订单时间',
        field: 'datetime',
        component: 'RangePicker',
        componentProps: {
          showTime: {
            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          },
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
