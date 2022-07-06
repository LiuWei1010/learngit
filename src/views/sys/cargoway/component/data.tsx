import { FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '商品名称',
    dataIndex: 'production_name',
  },
  {
    title: '价格(元)',
    dataIndex: 'price',
    format(data) {
      return data ? Number(data) / 100 : '还未设置';
    },
  },
  {
    title: '商品原价(元)',
    dataIndex: 'original_price',
    format(data) {
      return data ? Number(data) / 100 : '还未设置';
    },
  },
  {
    title: '机柜号',
    dataIndex: 'machine_no',
  },
  {
    title: '仓道序号',
    dataIndex: 'hatch_no',
  },
  {
    title: '剩余数量',
    dataIndex: 'left_count',
  },
  {
    title: '总数量',
    dataIndex: 'total_count',
  },
  {
    title: '图片链接',
    dataIndex: 'img',
    slots: { customRender: 'img' },
  },
  {
    title: '状态',
    dataIndex: 'status',
    format(data) {
      return Number(data) === 1 ? '可售' : '售空';
    },
  },
  {
    title: '仓道ID',
    dataIndex: 'hatch_id',
  },
  {
    title: '商品标题',
    dataIndex: 'title',
  },
  {
    title: '品牌名',
    dataIndex: 'brand_name',
  },
  {
    title: '分类名',
    dataIndex: 'production_type_name',
  },
  {
    title: '重量',
    dataIndex: 'weight',
  },
  {
    title: '重量单位',
    dataIndex: 'weight_unit',
  },
  {
    title: '重量误差',
    dataIndex: 'weight_error',
  },
  {
    title: '保质期',
    dataIndex: 'expiration_date',
  },
  {
    title: '保质期单位',
    dataIndex: 'expiration_date_unit',
  },
  {
    title: '是否存在保质期',
    dataIndex: 'is_expiration_date',
    format(data) {
      if (Number(data) === 1) {
        return '存在';
      } else if (Number(data) === 0) {
        return '不存在';
      }
      return '没有该选项';
    },
  },
  {
    title: '商品标签',
    dataIndex: 'tags',
  },
  {
    title: '商品内容',
    dataIndex: 'content',
  },
  {
    title: '商品描述',
    dataIndex: 'summary',
  },
];

// export const schemas = [
//   {
//     label: '商品名称',
//     field: 'production_name',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入商品名称',
//     },
//     // required: true,
//     colProps: {
//       span: 24,
//     },
//     slot: 'productionName',
//   },
//   {
//     label: '商品ID',
//     field: 'production_id',
//     component: 'Input',
//     required: true,
//     componentProps: {
//       disabled: true,
//     },
//     // required: true,
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '分类',
//     field: 'production_type_id',
//     component: 'ApiSelect',
//     required: true,
//     componentProps: {
//       cancelFirstFeatchLimit: true,
//       api: productionTypeList,
//       params: {
//         page: 1,
//         pageSize: 10000,
//       },
//       resultField: 'list',
//       labelField: 'production_type_name',
//       valueField: 'production_type_id',
//       disabled: true,
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '分类名称',
//     field: 'production_type_name',
//     component: 'Input',
//     componentProps: {
//       disabled: true,
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '品牌id',
//     field: 'brand_id',
//     component: 'ApiSelect',
//     componentProps: {
//       cancelFirstFeatchLimit: true,
//       api: brandList,
//       params: {
//         page: 1,
//         pageSize: 10000,
//       },
//       resultField: 'list',
//       labelField: 'brand_name',
//       valueField: 'brand_id',
//       disabled: true,
//     },
//     required: true,
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '品牌名称',
//     field: 'brand_name',
//     component: 'Input',
//     componentProps: {
//       disabled: true,
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '机器号',
//     field: 'machine_no',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的机器号',
//     },
//     required: true,
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '仓道序号',
//     field: 'hatch_no',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入仓道序号',
//     },
//     required: true,
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '总数量',
//     field: 'total_count',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入总数量',
//     },
//     required: true,
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '剩余数量',
//     field: 'left_count',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入剩余数量',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品标题',
//     field: 'title',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入商品标题',
//     },
//     colProps: {
//       span: 24,
//     },
//   },

//   {
//     label: '价格',
//     field: 'price',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的价格',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品原价',
//     field: 'original_price',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的商品原价',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '重量',
//     field: 'weight',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的商品重量',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '重量单位',
//     field: 'weight_unit',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的重量单位',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '重量误差',
//     field: 'weight_error',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的重量误差',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '保质期时间',
//     field: 'expiration_date',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的保质期时间',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '保质期单位',
//     field: 'expiration_date_unit',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的保质期单位',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '是否存在保质期',
//     field: 'is_expiration_date',
//     component: 'Select',
//     componentProps: {
//       options: [
//         {
//           label: '存在',
//           value: 1,
//         },
//         {
//           label: '不存在',
//           value: 0,
//         },
//       ],
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '图片链接',
//     field: 'img',
//     component: 'Input',
//     // componentProps: {
//     //   type: 'file',
//     // },
//     colProps: {
//       span: 24,
//     },
//     // slot: "tupian",
//     render: () => {
//       return <input type="file" onChange={addPicture}></input>;
//     },
//   },
//   {
//     label: '商品标签',
//     field: 'tags',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的商品标签',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品内容',
//     field: 'content',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的商品内容',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品描述',
//     field: 'summary',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的商品描述',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
// ];

// export const schemas2 = [
//   {
//     label: '商品ID',
//     field: 'production_id',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入商品ID',
//     },
//     required: true,
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品编号',
//     field: 'production_no',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入商品编号',
//     },
//     required: true,
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品名称',
//     field: 'production_name',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入商品名称',
//     },
//     required: true,
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品标题',
//     field: 'title',
//     component: 'Input',
//     required: true,
//     componentProps: {
//       placeholder: '请输入商品标题',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '品牌id',
//     field: 'brand_id',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入品牌id',
//     },
//     required: true,
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '品牌名',
//     field: 'brand_name',
//     component: 'Input',
//     required: true,
//     componentProps: {
//       placeholder: '请输入品牌名',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '分类id',
//     field: 'production_type_id',
//     component: 'Input',
//     required: true,
//     componentProps: {
//       placeholder: '请输入分类id',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '分类名',
//     field: 'production_type_name',
//     component: 'Input',
//     required: true,
//     componentProps: {
//       placeholder: '请输入分类名',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '价格',
//     field: 'price',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的价格',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品原价',
//     field: 'original_price',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的商品原价',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '重量',
//     field: 'weight',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的商品重量',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '重量单位',
//     field: 'weight_unit',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的重量单位',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '重量误差',
//     field: 'weight_error',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的重量误差',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '保质期时间',
//     field: 'expiration_date',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的保质期时间',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '保质期单位',
//     field: 'expiration_date_unit',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的保质期单位',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '是否存在保质期',
//     field: 'is_expiration_date',
//     component: 'Select',
//     componentProps: {
//       options: [
//         {
//           label: '存在',
//           value: 1,
//         },
//         {
//           label: '不存在',
//           value: 0,
//         },
//       ],
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '图片链接',
//     field: 'img',
//     component: 'Input',
//     componentProps: {
//       type: 'file',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品标签',
//     field: 'tages',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的商品标签',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品内容',
//     field: 'content',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的商品内容',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     label: '商品描述',
//     field: 'summary',
//     component: 'Input',
//     componentProps: {
//       placeholder: '请输入您的商品描述',
//     },
//     colProps: {
//       span: 24,
//     },
//   },
// ];

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
          placeholder: '请输入商品名,分类名,品牌名或商品编号',
          // onchange(e:any) {
          //   console.log(e.target.value);
          // }
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      // {
      //   label: '机器号',
      //   field: 'machine_no',
      //   component: 'Input',
      //   componentProps: {
      //     placeholder: '请输入机器号',
      //     // onchange(e:any) {
      //     //   console.log(e.target.value);
      //     // }
      //   },
      //   colProps: {
      //     xl: 12,
      //     xxl: 8,
      //   },
      // },
    ],
  };
}
