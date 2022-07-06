import { BasicColumn } from '/@/components/Table';
import { FormProps } from '/@/components/Form';
import moment from 'moment';
import { businessList } from '/@/api/business';
export const columns: BasicColumn = [
  {
    title: '用户id',
    dataIndex: 'user_id',
  },
  {
    title: '用户名',
    dataIndex: 'user_name',
  },
  {
    title: '分成收入(元)',
    dataIndex: 'real_total',
    format(data) {
      return parseInt(data) / 100;
    },
  },
  {
    title: '提交日期',
    dataIndex: 'create_time',
  },
  {
    title: '分账日期',
    dataIndex: 'bill_date',
  },
  {
    title: '打款日期',
    dataIndex: 'draw_time',
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    format(data) {
      if (Number(data) === 0) {
        return '未审核';
      } else if (Number(data) === 1) {
        return '审核通过';
      } else if (Number(data) === 2) {
        return '驳回';
      } else {
        return '删除';
      }
    },
  },
];

export const schemas1 = [
  {
    label: '商户名称',
    field: 'business_id0',
    component: 'ApiSelect',
    componentProps: {
      disabled: true,
      api: businessList,
      params: {
        page: 1,
        pageSize: 1000,
        keyword: '',
      },
      resultField: 'list',
      labelField: 'business_name',
      valueField: 'business_id',
    },
  },
  {
    label: '提现月份',
    field: 'draw_month0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的提现月份',
      disabled: true,
    },
  },
  {
    label: '提现单号',
    field: 'draw_no0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的提现单号',
      disabled: true,
    },
  },
  {
    label: 'openid',
    field: 'open_id0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的openid',
      disabled: true,
    },
  },
  {
    label: '微信支付单号',
    field: 'payment_no0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的微信支付单号',
      disabled: true,
    },
  },
  {
    label: '打款时间',
    field: 'payment_time0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的打款时间',
      disabled: true,
    },
  },
  {
    label: '打款金额(元)',
    field: 'real_total0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的打款金额',
      disabled: true,
    },
  },
  {
    label: '状态',
    field: 'status0',
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
      disabled: true,
    },
  },
  {
    label: '提现记录收入(元)',
    field: 'total0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的提现记录收入',
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
      ['datetime', ['startDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss'],
    ],
    schemas: [
      {
        label: '商户关键字',
        field: 'business_key',
        component: 'Input',
        componentProps({ formActionType }) {
          return {
            placeholder: '请输入商户关键字',
            onChange(e) {
              const { updateSchema } = formActionType;
              updateSchema({
                field: 'business_id',
                componentProps: {
                  params: {
                    keyword: e.target.value,
                  },
                },
              });
            },
          };
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        label: '商户名称',
        field: 'business_id',
        component: 'ApiSelect',
        componentProps: {
          api: businessList,
          params: {
            page: 1,
            pageSize: 10000,
            keyword: '',
          },
          resultField: 'list',
          labelField: 'business_name',
          valueField: 'business_id',
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        label: '分账日期',
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
        label: '状态',
        field: 'status',
        component: 'Select',
        componentProps: {
          options: [
            {
              label: '未审核',
              value: 0,
            },
            {
              label: '审核通过',
              value: 1,
            },
            {
              label: '驳回',
              value: 2,
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
