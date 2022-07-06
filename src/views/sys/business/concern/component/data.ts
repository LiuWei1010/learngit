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

// export const schemas2 = [
//   {
//     label: '商户名称',
//     field: 'business_name',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入商户名称',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '状态',
//     field: 'status',
//     component: 'Select',
//     componentProps: {
//       options: [
//         {
//           label: '正常',
//           value: 1,
//         },
//         {
//           label: '禁用',
//           value: -1,
//         },
//       ],
//     },
//     colProps: {
//       span: 24,
//     },
//   },
// ];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 120,
    compact: true,
    showAdvancedButton: false,
    schemas: [
      {
        label: '搜索关键字',
        field: 'keyword',
        component: 'Input',
        componentProps: {
          placeholder: '请输入搜索关键字',
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
