import { FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
import { placeList } from '/@/api/place';
export const columns: BasicColumn[] = [
  {
    title: '机器号',
    dataIndex: 'machine_no',
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
    title: '商户名称',
    dataIndex: 'business_name',
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
  {
    title: '场景名称',
    dataIndex: 'place_name',
  },
];

export const schemas = [
  {
    label: '机器号',
    field: 'machine_no',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机器号',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: 'mac地址',
    field: 'mac',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入mac地址',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '仓道数',
    field: 'hatch_number',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入仓道数',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '蓝牙设备号',
    field: 'device_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入蓝牙设备号',
    },
    colProps: {
      span: 24,
    },
  },

  {
    label: '场景选择',
    field: 'place_id',
    component: 'ApiSelect',
    componentProps: {
      cancelFirstFeatchLimit: true,
      api: placeList,
      params: {
        page: 1,
        pageSize: 10000,
      },
      resultField: 'list',
      labelField: 'place_name',
      valueField: 'place_id',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '电量',
    field: 'power',
    component: 'Input',
    componentProps: {
      placeholder: '请输入当前机器电量',
    },
    colProps: {
      span: 24,
    },
  },

  {
    label: '类型',
    field: 'type',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '单库存',
          value: 1,
        },
        {
          label: '多库存',
          value: 2,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '折扣类型',
    field: 'discounts_id',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '暂无折扣',
          value: 0,
        },
        {
          label: '每日首单免费',
          value: 1,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
];

export const schemas1 = [
  {
    label: '机器号',
    field: 'machine_no',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机器号',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: 'mac地址',
    field: 'mac',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入mac地址',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '仓道数',
    field: 'hatch_number',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入仓道数',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '蓝牙设备号',
    field: 'device_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入蓝牙设备号',
    },
    colProps: {
      span: 24,
    },
  },

  {
    label: '场景选择',
    field: 'place_id',
    component: 'ApiSelect',
    componentProps: {
      cancelFirstFeatchLimit: true,
      api: placeList,
      params: {
        page: 1,
        pageSize: 10000,
      },
      resultField: 'list',
      labelField: 'place_name',
      valueField: 'place_id',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '电量',
    field: 'power',
    component: 'Input',
    componentProps: {
      placeholder: '请输入当前机器电量',
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
          label: '未激活',
          value: 0,
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
  {
    label: '类型',
    field: 'type',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '单库存',
          value: 1,
        },
        {
          label: '多库存',
          value: 2,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '折扣类型',
    field: 'discounts_id',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '暂无折扣',
          value: 0,
        },
        {
          label: '每日首单免费',
          value: 1,
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
    label: '机器号',
    field: 'machine_no',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机器号',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: 'mac地址',
    field: 'mac',
    component: 'Input',
    componentProps: {
      placeholder: '请输入mac地址',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '仓道数',
    field: 'hatch_number',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入仓道数',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '蓝牙设备号',
    field: 'device_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入蓝牙设备号',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },

  {
    label: '商户id',
    field: 'business_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商户id',
      disabled: true,
    },
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
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '场景id',
    field: 'place_id',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的场景id',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '场景名称',
    field: 'place_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的场景名称',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '电量',
    field: 'power',
    component: 'Input',
    componentProps: {
      placeholder: '请输入当前机器电量',
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
          label: '未激活',
          value: 0,
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
  {
    label: '类型',
    field: 'type',
    component: 'Select',
    componentProps: {
      disabled: true,
      options: [
        {
          label: '单库存',
          value: 1,
        },
        {
          label: '多库存',
          value: 2,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '折扣类型',
    field: 'discounts_id',
    component: 'Select',
    componentProps: {
      disabled: true,
      options: [
        {
          label: '暂无折扣',
          value: 0,
        },
        {
          label: '每日首单免费',
          value: 1,
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
