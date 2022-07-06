import { BasicColumn } from '/@/components/Table';
import { FormProps } from '/@/components/Table';
import { FormSchema } from '/@/components/Form';
export const columns: BasicColumn[] = [
  {
    title: '机器号',
    key: 'machine_no',
    dataIndex: 'machine_no',
  },
  {
    title: '机器地址',
    key: 'machine_mac',
    dataIndex: 'machine_mac',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    format(data) {
      if (Number(data) === 0) {
        return '未激活';
      } else if (Number(data) === 1) {
        return '正常';
      }
      return '已删除';
    },
  },
  {
    title: '详细地址',
    key: 'short_address',
    dataIndex: 'short_address',
  },
  {
    title: '大概地址',
    key: 'address',
    dataIndex: 'address',
  },
];

export const dataSource = [
  {
    key: '1',
    machine_no: 'q123',
    machine_mac: 'EE:23:34:2s:we',
    status: 1,
    short_address: '三楼',
    address: '医院',
  },
];

export const schemas: FormSchema[] = [
  {
    label: '机器地址',
    field: 'machine_mac',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机器地址',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '更换的机器号',
    field: 'machine_afrno',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您更改的机器号',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '详细地址',
    field: 'short_address',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '随身玩',
          value: 'ssw',
          key: '1',
        },
        {
          label: '晓见文旅',
          value: 'xjwl',
          key: '2',
        },
      ],
    },
    defaultValue: 'ssw',
    colProps: {
      span: 24,
    },
  },
  {
    label: '大概地址',
    field: 'address',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的大概地址',
    },
    colProps: {
      span: 24,
    },
  },
];

export const schemas1: FormSchema[] = [
  {
    label: '机器地址',
    field: 'machine_mac',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的机器地址',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '更换状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '未激活',
          value: 0,
          key: '0',
        },
        {
          label: '正常',
          value: 1,
          key: '1',
        },
        {
          label: '已删除',
          value: 2,
          key: '2',
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
    labelWidth: 80,
    showAdvancedButton: false,
    compact: true,
    schemas: [
      {
        label: '机器号',
        field: 'machine_no',
        component: 'Input',
        componentProps: {
          placeholder: '请输入机器号',
        },
        defaultValue: '',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        label: '机器地址',
        field: 'machine_mac',
        component: 'Input',
        componentProps: {
          placeholder: '请输入机器地址',
        },
        defaultValue: '',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
