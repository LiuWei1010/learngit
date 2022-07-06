import { BasicColumn, FormProps } from '/@/components/Table';
import { accountList } from '/@/api/login';
import { accountDetailMessage } from '/@/api/login';
export const columns: BasicColumn[] = [
  {
    title: '机器号',
    dataIndex: 'machine_no',
  },
  {
    title: '商户名称',
    dataIndex: 'business_name',
    format(data) {
      return data || '暂未设置';
    },
  },
  {
    title: 'mac地址',
    dataIndex: 'mac',
  },
  {
    title: '蓝牙设备号',
    dataIndex: 'device_id',
    format(data) {
      return data || '暂未设置';
    },
  },
  {
    title: '仓道数',
    dataIndex: 'hatch_number',
  },
  {
    title: '折扣',
    dataIndex: 'discounts_name',
    format(data) {
      return data || '暂未设置';
    },
  },
  {
    title: '场景名称',
    dataIndex: 'place_name',
  },
  {
    title: '电量',
    dataIndex: 'power',
  },
  {
    title: '状态',
    dataIndex: 'status',
    format(data) {
      if (Number(data) === 1) {
        return '正常';
      } else if (Number(data) === 0) {
        return '未激活';
      } else if (Number(data) === -1) {
        return '禁用';
      }
      return '暂未设置';
    },
  },
  {
    title: '类型',
    dataIndex: 'type',
    format(data) {
      if (Number(data) === 1) {
        return '单库存';
      } else if (Number(data) === 2) {
        return '多库存';
      }
      return '暂未设置';
    },
  },
];

//这边给用户选择补货员id,其余通过useForm的get
export const schemas = [
  {
    label: '用户',
    field: 'user_id',
    component: 'ApiSelect',
    colProps: {
      span: 24,
    },
    componentProps: ({ formActionType }) => {
      return {
        cancelFirstFeatchLimit: true,
        api: accountList,
        params: {
          page: 1,
          pageSize: 10000,
          keyword: '',
        },
        resultField: 'list',
        labelField: 'user_name',
        valueField: 'id',
        onChange(e, ctx) {
          const { phone } = ctx;
          const { updateSchema } = formActionType;
          updateSchema({ field: 'business_id', componentProps: { params: { phone } } });
        },
      };
    },
  },
  {
    label: '商户',
    field: 'business_id',
    component: 'ApiSelect',
    colProps: {
      span: 24,
    },
    componentProps: {
      api: accountDetailMessage,
      params: {
        phone: '18361072551',
      },
      resultField: 'business_list',
      labelField: 'business_name',
      valueField: 'business_id',
    },
  },
  {
    label: '需要绑定的机器',
    field: 'machines',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入需要绑定的机器',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    compact: true,
    showAdvancedButton: false,
    schemas: [
      {
        label: '关键字',
        field: 'keyword',
        component: 'Input',
        componentProps: {
          placeholder: '请输入机器号或二维码号',
          // onchange(e:any) {
          //   console.log(e.target.value);
          // }
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
