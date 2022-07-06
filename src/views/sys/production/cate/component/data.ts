import { FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '分类id',
    dataIndex: 'production_type_id',
  },
  {
    title: '分类名称',
    dataIndex: 'production_type_name',
  },
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
    label: '商品分类名称',
    field: 'production_type_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品分类名称',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
];

export const schemas1 = [
  {
    label: '商品分类ID',
    field: 'production_type_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品分类ID',
      disabled: true,
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品分类名称',
    field: 'production_type_name',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入商品分类名称',
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
];

export const schemas2 = [
  {
    label: '商品分类ID',
    field: 'production_type_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品分类ID',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品分类名称',
    field: 'production_type_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品分类名称',
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
    labelWidth: 120,
    compact: true,
    showAdvancedButton: false,
    schemas: [
      {
        label: '关键字',
        field: 'keyword',
        component: 'Input',
        componentProps: {
          placeholder: '请输入商品分类名称',
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
