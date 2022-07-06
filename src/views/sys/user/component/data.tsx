import { FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
import { businessList } from '/@/api/business';
const level = localStorage.getItem('level');
const role = [
  {
    label: '超级管理员',
    value: 1,
  },
  {
    label: '管理员',
    value: 2,
  },
  {
    label: '业务员',
    value: 3,
  },
  {
    label: '一级代理商',
    value: 4,
  },
  {
    label: '二级代理商',
    value: 5,
  },
  {
    label: '财务',
    value: 6,
  },
  {
    label: '运维管理员',
    value: 7,
  },
  {
    label: '客服',
    value: 8,
  },
];
const options = [];
const options1 = [];
for (let i = level - 1; i <= 7; i++) {
  options.push(role[i]);
}

for (let i = level - 1; i <= 7; i++) {
  options1.push(role[i]);
}

const result = JSON.parse(JSON.stringify(options1[0]));
options1[0] = result;
result.disabled = true;
export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
  },
  {
    title: '用户编号',
    dataIndex: 'user_no',
  },
  {
    title: '用户名',
    dataIndex: 'user_name',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '等级',
    dataIndex: 'level',
    format(data) {
      if (Number(data) === 1) {
        return '超级管理员';
      } else if (Number(data) === 2) {
        return '管理员';
      } else if (Number(data) === 3) {
        return '业务员';
      } else if (Number(data) === 4) {
        return '一级代理商';
      } else if (Number(data) === 5) {
        return '二级代理商';
      } else if (Number(data) === 6) {
        return '财务';
      } else if (Number(data) === 7) {
        return '运维管理员';
      } else if (Number(data) === 9) {
        return '客服';
      }
      return '暂未设置等级';
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    format(data) {
      return Number(data) === 1 ? '正常' : '禁用';
    },
  },
  {
    title: '备注',
    dataIndex: 'comment',
    format(data) {
      return data || '尚未备注';
    },
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
  },
];

export const schemas = [
  {
    label: '用户名',
    field: 'user_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户手机号',
    field: 'phone',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入用户手机号',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户权限',
    field: 'level',
    component: 'Select',
    required: true,
    componentProps: {
      options,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户登录密码',
    field: 'password',
    component: 'InputPassword',
    required: true,
    componentProps: {
      visibilityToggle: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '商户列表',
    field: 'business_id',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      cancelFirstFeatchLimit: true,
      api: businessList,
      params: {
        page: 1,
        pageSize: 10000,
        keyword: '',
      },
      resultField: 'list',
      labelField: 'business_name',
      valueField: 'business_id',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '备注',
    field: 'commment',
    component: 'Input',
    componentProps: {
      placeholder: '请输入备注',
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
      placeholder: '上级ID为当前用户id',
      disabled: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '选择是否提现',
    field: 'draw',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '不可以',
          value: 0,
        },
        {
          label: '可以',
          value: 1,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  // {
  //   label: '分成比例',
  //   field: 'rate',
  //   component: 'Input',
  //   componentProps: {
  //     placeholder: '无需带%号',
  //   },
  //   colProps: {
  //     span: 24,
  //   },
  // },
];

export const schemas1 = [
  {
    label: '原代理商手机号',
    field: 'old_phone',
    component: 'Input',
    componentProps: {
      placeholder: '请输入原代理商手机号',
      disabled: true,
    },
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: '新代理商手机号',
    field: 'new_phone',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入新代理商手机号',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户权限',
    field: 'level',
    component: 'Select',
    componentProps: {
      options: options1,
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户名',
    field: 'user_name',
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '用户登录密码',
    field: 'password',
    component: 'InputPassword',
    componentProps: {
      visibilityToggle: true,
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
  // {
  //   label: '商户列表',
  //   field: 'business_id',
  //   component: 'ApiSelect',
  //   componentProps: {
  //     cancelFirstFeatchLimit: true,
  //     api: businessList,
  //     params: {
  //       page: 1,
  //       pageSize: 10000,
  //       keyword: '',
  //     },
  //     resultField: 'list',
  //     labelField: 'business_name',
  //     valueField: 'business_id',
  //   },
  //   colProps: {
  //     span: 24,
  //   },
  // },
];

export const schemas2 = [
  {
    label: '用户名',
    field: 'user_name',
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '用户ID',
    field: 'id',
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '用户编号',
    field: 'user_no',
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '手机号',
    field: 'phone',
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '用户权限',
    field: 'level',
    component: 'Select',
    componentProps: {
      disabled: true,
      options: [
        {
          label: '超级管理员',
          value: 1,
        },
        {
          label: '管理员',
          value: 2,
        },
        {
          label: '业务员',
          value: 3,
        },
        {
          label: '一级代理商',
          value: 4,
        },
        {
          label: '二级代理商',
          value: 5,
        },
        {
          label: '财务',
          value: 6,
        },
        {
          label: '运维管理员',
          value: 7,
        },
        {
          label: '客服',
          value: 8,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '备注',
    field: 'comment',
    component: 'Input',
    componentProps: {
      disabled: true,
      placeholder: '请输入备注',
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
  {
    label: '商户列表',
    field: 'business_id',
    component: 'ApiSelect',
    componentProps: {
      disabled: true,
      cancelFirstFeatchLimit: true,
      api: businessList,
      params: {
        page: 1,
        pageSize: 10000,
        keyword: '',
      },
      resultField: 'list',
      labelField: 'business_name',
      valueField: 'business_id',
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
          placeholder: '请输入用户名或手机号或用户编号',
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
