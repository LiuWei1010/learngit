import { FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
import { businessList } from '/@/api/business';
export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
  },
  {
    title: '用户编号',
    dataIndex: 'user_no',
  },
  {
    title: '用户名',
    dataIndex: 'user_name',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '商户名',
    dataIndex: 'business_name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    format(data) {
      return Number(data) === 1 ? '正常' : '禁用';
    },
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
  },
];

export const schemas = [
  {
    label: '用户名',
    field: 'user_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户手机号',
    field: 'phone',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入用户手机号',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户登录密码',
    field: 'password',
    component: 'InputPassword',
    required: true,
    componentProps: {
      visibilityToggle: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商户列表',
    field: 'business_id',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      cancelFirstFeatchLimit: true,
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
      span: 24,
    },
  },
  {
    label: '备注',
    field: 'commment',
    component: 'Input',
    componentProps: {
      placeholder: '请输入备注',
    },
    colProps: {
      span: 24,
    },
  },
];

export const schemas1 = [
  {
    label: '原手机号',
    field: 'old_phone',
    component: 'Input',
    componentProps: {
      placeholder: '请输入原手机号',
      disabled: true,
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '新手机号',
    field: 'new_phone',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入新手机号',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '补货员名称',
    field: 'user_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '备注',
    field: 'comment',
    component: 'Input',
    componentProps: {
      placeholder: '请输入备注',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户登录密码',
    field: 'password',
    component: 'InputPassword',
    componentProps: {
      visibilityToggle: true,
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
          label: '禁用',
          value: -1,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商户',
    field: 'business_id',
    component: 'ApiSelect',
    componentProps: {
      cancelFirstFeatchLimit: true,
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
      span: 24,
    },
  },
];

export const schemas2 = [
  {
    label: '用户名',
    field: 'user_name',
    component: 'Input',
    componentProps: {
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
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户编号',
    field: 'user_no',
    component: 'Input',
    componentProps: {
      disabled: true,
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
          label: '禁用',
          value: -1,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商户号',
    field: 'business_id',
    component: 'ApiSelect',
    componentProps: {
      disabled: true,
      cancelFirstFeatchLimit: true,
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
      span: 24,
    },
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 120,
    compact: true,
    showAdvancedButton: false,
    schemas: [
      {
        label: '查询关键字',
        field: 'keyword',
        component: 'Input',
        componentProps: {
          placeholder: '请输入(用户名,手机号)',
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
