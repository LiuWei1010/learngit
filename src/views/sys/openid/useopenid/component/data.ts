import { BasicColumn } from '/@/components/Table';
import { FormProps } from '/@/components/Form';
export const columns: BasicColumn[] = [
  {
    title: '已绑定openid',
    dataIndex: 'openid',
    // slots: { customRender: 'openid' },
    format(data) {
      return !data ? '暂未设置' : data;
    },
  },
  {
    title: '真实姓名',
    dataIndex: 'real_name',
    format(data) {
      return !data ? '暂未设置' : data;
    },
  },
  {
    title: '获取openid',
    dataIndex: 'img',
    slots: { customRender: 'img' },
  },
];

export const schemas = [
  {
    label: '真实姓名',
    field: 'real_name0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的真实姓名',
    },
    required: true,
  },
  {
    label: 'openid',
    field: 'openid0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入openid',
    },
    required: true,
    colProps: {
      span: 16,
    },
  },
  {
    label: '',
    field: '0',
    component: 'Input',
    colProps: {
      span: 8,
    },
    slot: 'add',
  },
];

export const schemas1 = [
  {
    label: '真实姓名',
    field: 'real_name0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入您的真实姓名',
    },
    required: true,
  },
  {
    label: 'openid',
    field: 'openid0',
    component: 'Input',
    componentProps: {
      placeholder: '请输入openid',
    },
    required: true,
    colProps: {
      span: 16,
    },
  },
  {
    label: '',
    field: '0',
    component: 'Input',
    colProps: {
      span: 8,
    },
    slot: 'add1',
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 120,
    compact: true,
    showAdvancedButton: false,
    showResetButton: false,
  };
}
