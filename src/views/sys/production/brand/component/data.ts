import { FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '品牌id',
    dataIndex: 'brand_id',
  },
  {
    title: '品牌名称',
    dataIndex: 'brand_name',
  },
  // {
  //   title: '图片logo',
  //   dataIndex: 'img',
  //   slots: { customRender: 'img' },
  // },
  {
    title: '状态',
    dataIndex: 'status',
    format(data) {
      if (Number(data) === 1) {
        return '正常';
      } else if (Number(data) === -1) {
        return '删除';
      }
      return '暂未设置';
    },
  },
];

export const schemas = [
  {
    label: '商品名称',
    field: 'brand_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品名称',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  // {
  //   label: '请选择图片(格式均支持)',
  //   field: 'img',
  //   component: 'Input',
  //   slot: 'addImg',
  //   colProps: {
  //     span: 24,
  //   },
  // },
];

export const schemas1 = [
  {
    label: '商品ID',
    field: 'brand_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品ID',
      disabled: true,
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品名称',
    field: 'brand_name',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入商品名称',
    },
    colProps: {
      span: 24,
    },
  },
  // {
  //   label: '图片(格式均支持)',
  //   field: 'img',
  //   component: 'Input',
  //   colProps: {
  //     span: 24,
  //   },
  //   slot: 'editImg',
  // },
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
];

export const schemas2 = [
  {
    label: '商品ID',
    field: 'brand_id',
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
    label: '商品名称',
    field: 'brand_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品名称',
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
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 60,
    compact: true,
    showAdvancedButton: false,
    schemas: [
      {
        label: '关键字',
        field: 'keyword',
        component: 'Input',
        componentProps: {
          placeholder: '请输入品牌名称',
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
