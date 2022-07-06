import { FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '场所ID',
    dataIndex: 'place_id',
  },
  {
    title: '场景名称',
    dataIndex: 'place_name',
  },
  {
    title: '详细地址',
    dataIndex: 'address',
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
    label: '大概地址',
    field: 'place_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入大概地址',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '场景名称',
    field: 'address',
    component: 'Input',
    componentProps: {
      placeholder: '请输入场景名称',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '上级ID',
    field: 'parent_id',
    component: 'Input',
    componentProps: {
      placeholder: '上级ID为当前用户ID',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
];

export const schemas1 = [
  {
    label: 'ID',
    field: 'id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入场所id',
      disabled: true,
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '大概地址',
    field: 'place_name',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入大概地址',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '具体地址',
    field: 'address',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的具体地址',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '上级ID',
    field: 'parent_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的上级ID',
      disabled: true,
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
    label: '上级ID',
    field: 'parent_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的上级id',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '大概地址',
    field: 'place_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的大概地址',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '具体地址',
    field: 'address',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的具体地址',
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
          placeholder: '请输入大概地址',
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
