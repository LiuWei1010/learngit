import { FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '商户ID',
    dataIndex: 'business_id',
  },
  {
    title: '商户名称',
    dataIndex: 'business_name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    format(data) {
      return Number(data) === 1 ? '正常' : '禁用';
    },
  },
];

export const schemas = [
  {
    label: '商户名称',
    field: 'business_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商户名称',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
];

export const schemas1 = [
  {
    label: '商户ID',
    field: 'business_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商户ID',
      disabled: true,
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '商户名称',
    field: 'business_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商户名称',
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
];

export const schemas2 = [
  {
    label: '商户名称',
    field: 'business_name',
    component: 'Input',
    componentProps: {
      disabled: true,
      placeholder: '请输入商户名称',
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
          placeholder: '请输入商户名',
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
