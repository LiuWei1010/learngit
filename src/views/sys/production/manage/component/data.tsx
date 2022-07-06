import { FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
import { brandList, productionTypeList } from '/@/api/production';
import { setAuthCache } from '/@/utils/auth';
import { uploadImg } from '/@/api/file';
import { Input } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '商品编号',
    dataIndex: 'production_no',
  },
  {
    title: '商品名称',
    dataIndex: 'production_name',
  },
  {
    title: '价格(元)',
    dataIndex: 'price',
    format(data) {
      return data ? Number(data) / 100 : '暂未设置';
    },
  },
  {
    title: '商品原价(元)',
    dataIndex: 'original_price',
    format(data) {
      return data ? Number(data) / 100 : '暂未设置';
    },
  },
  {
    title: '图片',
    dataIndex: 'img',
    slots: { customRender: 'img' },
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

export const schemas = [
  {
    label: '商品名称',
    field: 'production_name',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品标题',
    field: 'title',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入商品标题',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '品牌',
    field: 'brand_id',
    component: 'ApiSelect',
    componentProps: {
      cancelFirstFeatchLimit: true,
      api: brandList,
      params: {
        page: 1,
        pageSize: 10000,
      },
      resultField: 'list',
      labelField: 'brand_name',
      valueField: 'brand_id',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '分类',
    field: 'production_type_id',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      cancelFirstFeatchLimit: true,
      api: productionTypeList,
      params: {
        page: 1,
        pageSize: 10000,
      },
      resultField: 'list',
      labelField: 'production_type_name',
      valueField: 'production_type_id',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '价格(元)',
    field: 'price',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入您的价格',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品原价(元)',
    field: 'original_price',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入您的商品原价',
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
    label: '图片(格式均支持)',
    field: 'img',
    component: 'Input',
    // componentProps: {
    //   type: 'file',
    // },
    colProps: {
      span: 24,
    },
    // slot: "tupian",
    render: (ctx) => {
      console.log(ctx);
      return <input type="file" onChange={addPicture}></input>;
    },
  },
  {
    label: '商品标签',
    field: 'tags',
    component: 'Input',
    componentProps: {
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
      placeholder: '请输入您的商品描述',
    },
    colProps: {
      span: 24,
    },
  },
];

export const schemas1 = [
  {
    label: '商品ID',
    field: 'production_id',
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
    field: 'production_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品名称',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品标题',
    field: 'title',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入商品标题',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '品牌',
    field: 'brand_id',
    component: 'ApiSelect',
    componentProps: {
      cancelFirstFeatchLimit: true,
      api: brandList,
      params: {
        page: 1,
        pageSize: 10000,
      },
      resultField: 'list',
      labelField: 'brand_name',
      valueField: 'brand_id',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '分类',
    field: 'production_type_id',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      cancelFirstFeatchLimit: true,
      api: productionTypeList,
      params: {
        page: 1,
        pageSize: 10000,
      },
      resultField: 'list',
      labelField: 'production_type_name',
      valueField: 'production_type_id',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '价格(元)',
    field: 'price',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的价格',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商品原价(元)',
    field: 'original_price',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的商品原价',
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
    label: '图片(格式均支持)',
    field: 'img',
    component: 'Input',
    // componentProps: {
    //   type: 'file',
    // },
    colProps: {
      span: 24,
    },
    render() {
      return <Input type="file" onChange={editPicture}></Input>;
    },
    // slot: "picture"
  },
  {
    label: '商品标签',
    field: 'tags',
    component: 'Input',
    componentProps: {
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
      placeholder: '请输入您的商品描述',
    },
    colProps: {
      span: 24,
    },
  },
];

export const schemas2 = [
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
    label: '商品编号',
    field: 'production_no',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品编号',
      disabled: true,
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
      placeholder: '请输入商品名称',
      disabled: true,
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
      placeholder: '请输入商品标题',
      disabled: true,
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
      placeholder: '请输入品牌id',
      disabled: true,
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
      placeholder: '请输入品牌名',
      disabled: true,
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
      placeholder: '请输入分类id',
      disabled: true,
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
      placeholder: '请输入分类名',
      disabled: true,
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
      placeholder: '请输入您的价格',
      disabled: true,
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
      placeholder: '请输入您的商品原价',
      disabled: true,
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
      disabled: true,
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
      placeholder: '请输入您的重量单位',
      disabled: true,
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
      placeholder: '请输入您的重量误差',
      disabled: true,
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
      placeholder: '请输入您的保质期时间',
      disabled: true,
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
      placeholder: '请输入您的保质期单位',
      disabled: true,
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
    label: '商品标签',
    field: 'tags',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的商品标签',
      disabeld: true,
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
      placeholder: '请输入您的商品内容',
      disabeld: true,
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
      disabeld: true,
      placeholder: '请输入您的商品描述',
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
    ],
  };
}

async function addPicture(event) {
  const params = new FormData();
  params.append('file', event.target.files[0]);
  const result = await uploadImg(params);
  const addImg = result.filename;
  setAuthCache('addImg', addImg);
}

async function editPicture(event) {
  const params = new FormData();
  params.append('file', event.target.files[0]);
  const result = await uploadImg(params);
  const editImg = result.filename;
  setAuthCache('editImg', editImg);
}
