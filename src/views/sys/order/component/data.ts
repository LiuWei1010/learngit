import { BasicColumn } from '/@/components/Table';
import { FormProps } from '/@/components/Form';
import moment from 'moment';
export const columns: BasicColumn = [
  {
    title: '下单时间',
    dataIndex: 'create_time',
  },
  {
    title: '机器编号',
    dataIndex: 'machine_no',
  },
  {
    title: '商品名称',
    dataIndex: 'production_name',
  },
  // {
  //   title: '支付时间',
  //   dataIndex: 'pay_time',
  // },
  {
    title: '用户手机号',
    dataIndex: 'phone',
  },
  // {
  //   title: '子订单ID',
  //   dataIndex: 'rent_detail_id',
  // },
  {
    title: '订单编号',
    dataIndex: 'rent_no',
    width: 200,
  },
  {
    title: '收入(元)',
    dataIndex: 'total',
    format(data) {
      return parseFloat(data) / 100;
    },
  },
  {
    title: '支付状态',
    dataIndex: 'is_pay',
    format(data) {
      return Number(data) === 1 ? '已支付' : '未支付';
    },
  },
  {
    title: '场所名称',
    dataIndex: 'place_name',
  },
  {
    title: '退款数量',
    dataIndex: 'refund_count',
  },
  {
    title: '购买数量',
    dataIndex: 'rent_count',
  },

  {
    title: '状态',
    dataIndex: 'status',
    format(data) {
      return Number(data) === 1 ? '正常' : '删除';
    },
  },
  // {
  //   title: '用户ID',
  //   dataIndex: 'user_id',
  // },
];

export const schemas = [
  {
    label: '商品ID',
    field: 'production_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品ID',
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
      placeholder: '请输入您的商品描述',
    },
    colProps: {
      span: 24,
    },
  },
];

export const schemas1 = [
  {
    label: '订单编号',
    field: 'rent_no',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入您的订单编号',
      disabled: true,
    },
  },
  {
    label: '子订单编号',
    field: 'rent_detail_id',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入您的子订单编号',
      disabled: true,
    },
  },
  {
    label: '原因',
    field: 'cause',
    component: 'InputTextArea',
    required: true,
    componentProps: {
      placeholder: '请输入您的退款原因,简单写即可',
    },
  },
  {
    label: '退款数量',
    field: 'refund_count',
    component: 'InputNumber',
    required: true,
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
      ['datetime', ['startDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss'],
    ],
    schemas: [
      {
        label: '关键字',
        field: 'keyword',
        component: 'Input',
        componentProps: {
          placeholder: '请输入您的订单编号或手机号',
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
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
      {
        label: '支付选项',
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
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
