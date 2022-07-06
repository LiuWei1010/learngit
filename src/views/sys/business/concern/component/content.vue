<template>
  <div>
    <BasicTable @register="register">
      <template #tableTitle>
        <a-button
          v-if="hasPermission([RoleEnum.superMaster])"
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="newAddBusiness"
          >添加关联</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction :actions="createAxios(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="添加关联"
      @register="register1"
      okText="保存"
      @ok="addBusinessOk"
      @cancel="cancelBusinessOk"
    >
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :model="formModel1"
        :showActionButtonGroup="false"
        @register="register2"
      >
        <template #add="{ field }">
          <Button v-if="Number(field) === 0" @click="add()">+</Button>
          <Button v-if="field > 0" @click="del(field)">-</Button>
        </template>
      </BasicForm>
    </BasicModal>

    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="编辑关联"
      @register="register3"
      okText="保存"
      @ok="editPersonOk"
      @cancel="cancelPersonOk"
    >
      <BasicForm
        :labelWidth="120"
        :schemas="schemas1"
        :model="formModel"
        :showActionButtonGroup="false"
        @register="register4"
      >
        <template #add1="{ field }">
          <Button v-if="Number(field) === 0" @click="add1()">+</Button>
          <Button v-if="Number(field) > 0" @click="del1(field)">-</Button>
        </template>
      </BasicForm>
    </BasicModal>
  </div>
</template>

<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, getFormConfig } from './data';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { Button } from '/@/components/Button';
  import {
    businessList,
    editAdminAccount,
    businessAccountList,
    businessSuperAccountList,
  } from '/@/api/business';
  import { getAuthCache } from '/@/utils/auth';
  import { accountList } from '/@/api/login';

  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicTable,
      TableAction,
      BasicForm,
      BasicModal,
      Button,
    },
    setup() {
      let n = ref(1);
      let t = 0;
      let distributed_rate = 0;
      const { hasPermission } = usePermission();
      let bus_id = 0;
      const formModel = ref({});
      const formModel1 = ref({});
      const {
        createMessage: { success, error },
      } = useMessage();
      const [register, { reload }] = useTable({
        title: '商户管理列表',
        api: businessList,
        beforeFetch: (params) => {
          return params;
        },
        afterFetch(T) {
          return T;
        },
        columns,
        bordered: true,
        immediate: true,
        useSearchForm: true,
        formConfig: getFormConfig(),
        actionColumn: {
          width: 250,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const [register1, { openModal: openModal1 }] = useModal();
      const [
        register2,
        {
          getFieldsValue: getFieldsValue1,
          validateFields: validateFields1,
          resetFields: resetFields1,
          appendSchemaByField: appendSchemaByField1,
          removeSchemaByFiled: removeSchemaByFiled1,
          updateSchema: updateSchema1,
          setFieldsValue: setFieldsValue1,
        },
      ] = useForm();
      const [register3, { openModal: openModal2 }] = useModal();
      const [
        register4,
        {
          getFieldsValue: getFieldsValue2,
          validateFields: validateFields2,
          resetFields: resetFields2,
          appendSchemaByField: appendSchemaByField2,
          removeSchemaByFiled: removeSchemaByFiled2,
          updateSchema: updateSchema2,
          setFieldsValue: setFieldsValue2,
        },
      ] = useForm();

      function createAxios(record) {
        return [
          {
            label: '编辑关联',
            onClick: editBusinessMessage.bind(null, record),
            auth: [
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ],
          },
        ];
      }
      async function newAddBusiness() {
        await openModal1(true);
        formModel1.value = {
          distributed: 0,
        };
      }
      async function editBusinessMessage(record) {
        const [level] = getAuthCache('ROLES__KEY__');
        const phone = localStorage.getItem('phone');
        let obj = {};
        let distributed = 0;
        obj.business_id = record.business_id;
        const superdata = await businessSuperAccountList({
          business_id: record.business_id,
        });
        const newSuperData = superdata.list;
        for (let key of newSuperData) {
          distributed += Number(key.rate);
        }
        obj.distributed = distributed;
        //获取绑定用户数
        let params = {
          page: 1,
          pageSize: 1000,
          business_id: record.business_id,
        };
        let data = await businessAccountList(params);
        let data1 = await businessSuperAccountList({
          business_id: record.business_id,
        });
        let newData = data.list;
        let newData1 = data1.list;
        n.value = newData.length;
        t = newData1.length;
        await openModal2(true);
        for (let i = 0; i < n.value; i++) {
          let id = 'id' + i;
          let rate = 'rate' + i;

          appendSchemaByField2(
            {
              label: '用户名' + i,
              field: 'id' + i,
              component: 'ApiSelect',
              required: true,
              componentProps: {
                disabled: level > newData[i].level || Number(phone) === 17363371939,
                api: businessAccountList,
                params: {
                  page: 1,
                  pageSize: 10000,
                  business_id: record.business_id,
                },
                resultField: 'list',
                labelField: 'user_name',
                valueField: 'user_id',
              },
              colProps: {
                span: 24,
              },
            },
            '',
          );
          appendSchemaByField2(
            {
              field: `rate${i}`,
              component: 'Input',
              label: '分成比例',
              colProps: {
                span: 16,
              },
              componentProps: {
                disabled: level > newData[i].level || Number(phone) === 17363371939,
                placeholder: '不带有%号',
              },
              required: true,
            },
            '',
          );

          appendSchemaByField2(
            {
              field: `${i}`,
              component: 'Input',
              label: ' ',
              colProps: {
                span: 8,
              },
              // slot: 'add1'
              render: ({ field }) => {
                // const result = {true ? <Button>ceshi{field}</Button> : null}
                return (
                  <>
                    {Number(field) === 0 ? (
                      <Button
                        onClick={() => {
                          add1();
                        }}
                      >
                        +
                      </Button>
                    ) : (
                      <Button
                        disabled={level > newData[i].level}
                        onClick={() => {
                          del1(field);
                        }}
                      >
                        -
                      </Button>
                    )}
                  </>
                );
                // return <Button>ceshi{field}</Button>
                // <template>
                //     <Button  v-if="Number(field) === 0" @click="add1(field[field.length-1])">+</Button>
                //     <Button :disabled="!field.slice(0,field.length-1)" v-if="Number(field[field.length-1]) > 0" @click="del1(field)">-</Button>
                // </template>
              },
            },
            '',
          );
          obj[id] = newData[i].user_id;
          obj[rate] = newData[i].rate;
        }
        setTimeout(() => {
          formModel.value = obj;
        }, 0);
      }

      function cancelPersonOk() {
        for (let i = 0; i < n.value; i++) {
          removeSchemaByFiled2([`user_key${i}`, `id${i}`, `rate${i}`, `${i}`]);
        }
        for (let i = 0; i < t; i++) {
          removeSchemaByFiled2([`super${i}`, `superrate${i}`]);
        }
        for (let i = 0; i < n.value; i++) {
          updateSchema2({
            field: 'id' + i,
            componentProps: {
              params: {
                keyword: '',
              },
            },
          });
        }
        n.value = 1;
        t = 0;
        resetFields2();
      }

      async function addBusinessOk() {
        //校验是否满足表单规则

        await validateFields1();
        let concernList = [];
        //获取表单数据
        const formData = getFieldsValue1();
        let unDistributed = 0;
        const distributed = Number(formData.distributed);
        const Unassigned = 100 - distributed;
        for (let key in formData) {
          if (key.includes('rate')) {
            unDistributed += Number(formData[key]);
          }
        }
        if (Unassigned >= unDistributed) {
          for (let i = 0; i < n.value; i++) {
            let id = 'id' + i;
            let rate = 'rate' + i;
            let user_id = formData[id];
            let user_rate = formData[rate];
            concernList.push({ rate: user_rate, user_id: user_id });
          }
          let data = {
            business_id: formData.business_id,
            user_data: concernList,
          };
          await editAdminAccount(data);
          // await addBusiness(formData);
          success('新增成功');
          cancelBusinessOk();
          reload();
          openModal1(false);
        } else {
          error('分成比例已超过100%');
        }
      }

      async function editPersonOk() {
        //校验是否满足表单规则

        await validateFields2();
        let concernList = [];
        //获取表单数据
        const formData = getFieldsValue2();
        let unDistributed = 0;
        const distributed = Number(formData.distributed);
        const Unassigned = 100 - distributed;
        for (let key in formData) {
          if (key.includes('rate')) {
            unDistributed += Number(formData[key]);
          }
        }
        if (Unassigned >= unDistributed) {
          for (let i = 0; i < n.value; i++) {
            let id = 'id' + i;
            let rate = 'rate' + i;
            let user_id = formData[id];
            let user_rate = formData[rate];
            concernList.push({ rate: user_rate, user_id: user_id });
          }
          let data = {
            business_id: formData.business_id,
            user_data: concernList,
          };
          await editAdminAccount(data);
          success('修改商户关联成功');
          cancelPersonOk();
          reload();
          openModal2(false);
        } else {
          error('分成比例已超过100%');
        }
      }
      function cancelBusinessOk() {
        for (let i = 1; i < n.value; i++) {
          removeSchemaByFiled1([`user_key${i}`, `id${i}`, `rate${i}`, `${i}`]);
        }
        for (let i = 0; i < n.value; i++) {
          updateSchema1({
            field: 'id' + i,
            componentProps: {
              params: {
                keyword: '',
              },
            },
          });
        }
        n.value = 1;
        resetFields1();
      }
      async function add() {
        appendSchemaByField1(
          {
            label: '用户名' + n.value,
            field: 'id' + n.value,
            component: 'ApiSelect',
            required: true,
            componentProps: {
              api: businessAccountList,
              params: {
                page: 1,
                pageSize: 10000,
                business_id: bus_id,
              },
              resultField: 'list',
              labelField: 'user_name',
              valueField: 'user_id',
              immediate: false,
              onChange() {
                console.log('我是添加的用户');
              },
            },
            colProps: {
              span: 24,
            },
          },
          '',
        );
        appendSchemaByField1(
          {
            field: `rate${n.value}`,
            component: 'Input',
            label: '分成比例',
            colProps: {
              span: 16,
            },
            required: true,
          },
          '',
        );

        appendSchemaByField1(
          {
            field: `${n.value}`,
            component: 'Input',
            label: ' ',
            colProps: {
              span: 8,
            },
            slot: 'add',
          },
          '',
        );
        n.value++;
      }

      function del(field) {
        removeSchemaByFiled1([`user_key${field}`, `id${field}`, `rate${field}`, `${field}`]);
        n.value--;
      }

      function add1() {
        appendSchemaByField2(
          {
            label: '用户名' + n.value,
            field: 'id' + n.value,
            component: 'ApiSelect',
            required: true,
            componentProps: {
              api: accountList,
              params: {
                page: 1,
                pageSize: 10000,
                keyword: '',
              },
              resultField: 'list',
              labelField: 'user_name',
              valueField: 'id',
            },
            colProps: {
              span: 24,
            },
          },
          '',
        );
        appendSchemaByField2(
          {
            field: `rate${n.value}`,
            component: 'Input',
            label: '分成比例',
            colProps: {
              span: 16,
            },
            required: true,
          },
          '',
        );

        appendSchemaByField2(
          {
            field: `${n.value}`,
            component: 'Input',
            label: ' ',
            colProps: {
              span: 8,
            },
            slot: 'add1',
          },
          '',
        );
        n.value++;
      }

      function del1(field) {
        removeSchemaByFiled2([`user_key${field}`, `id${field}`, `rate${field}`, `${field}`]);
        n.value--;
      }

      const schemas = [
        {
          label: '商户关键字',
          field: 'business_key',
          component: 'Input',
          componentProps({ formActionType }) {
            return {
              placeholder: '请输入商户关键字',
              onChange(e) {
                const { updateSchema } = formActionType;
                updateSchema({
                  field: 'business_id',
                  componentProps: {
                    params: {
                      keyword: e.target.value,
                    },
                  },
                });
              },
            };
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商户名称',
          field: 'business_id',
          component: 'ApiSelect',
          required: true,
          componentProps: {
            api: businessList,
            params: {
              page: 1,
              pageSize: 10000,
              keyword: '',
            },
            resultField: 'list',
            labelField: 'business_name',
            valueField: 'business_id',
            async onChange(e) {
              bus_id = e;
              const data = await businessSuperAccountList({
                business_id: e,
              });
              const newData = data.list;
              for (let key of newData) {
                distributed_rate += Number(key.rate);
              }
              setFieldsValue1({ distributed: distributed_rate });
              let data1 = await businessAccountList({
                page: 1,
                pageSize: 1000,
                business_id: e,
              });
              for (let i = 1; i < n.value; i++) {
                removeSchemaByFiled1([`id${i}`, `rate${i}`, `${i}`]);
              }
              n.value = 1;
              let personLength = data1.list.length;
              for (let key of data1.list) {
                if (key.level === 1) {
                  setFieldsValue1({ id0: key.user_name });
                  setFieldsValue1({ rate0: key.rate });
                }
              }
              for (let i = 0; i < personLength; i++) {
                updateSchema1({
                  field: 'id' + i,
                  componentProps: {
                    params: {
                      business_id: e,
                    },
                  },
                });
              }
            },
          },
        },
        {
          label: '上级已分配比例',
          field: 'distributed',
          component: 'Input',
          componentProps: {
            placeholder: '请输入上级已分配比例',
            disabled: true,
          },
          colProps: {
            span: 24,
          },
        },

        {
          label: '用户名0',
          field: 'id0',
          component: 'ApiSelect',
          required: true,
          componentProps: {
            api: businessAccountList,
            params: {
              page: 1,
              pageSize: 10000,
              business_id: '',
            },
            resultField: 'list',
            labelField: 'user_name',
            valueField: 'user_id',
            immediate: false,
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '分成比例',
          field: 'rate0',
          component: 'Input',
          componentProps: {
            placeholder: '不需要带%',
          },
          colProps: {
            span: 16,
          },
          required: true,
        },
        {
          label: ' ',
          field: '0',
          component: 'Input',
          colProps: {
            span: 8,
          },
          slot: 'add',
        },
      ];

      const schemas1 = [
        {
          label: '商户名称',
          field: 'business_id',
          component: 'ApiSelect',
          required: true,
          componentProps: {
            disabled: true,
            api: businessList,
            params: {
              page: 1,
              pageSize: 10000,
              keyword: '',
            },
            resultField: 'list',
            labelField: 'business_name',
            valueField: 'business_id',
            async onChange(e) {
              console.log(e);
              const data = await businessSuperAccountList({
                business_id: e,
              });
              const newData = data.list;
              for (let key of newData) {
                distributed_rate += Number(key.rate);
              }
              setFieldsValue2({ distributed: distributed_rate });
            },
          },
        },
        {
          label: '上级已分配比例',
          field: 'distributed',
          component: 'Input',
          componentProps: {
            placeholder: '请输入上级已分配比例',
            disabled: true,
          },
          colProps: {
            span: 24,
          },
        },
      ];
      return {
        register,
        register1,
        register2,
        register3,
        register4,
        schemas,
        schemas1,
        createAxios,
        addBusinessOk,
        cancelBusinessOk,
        cancelPersonOk,
        editPersonOk,
        newAddBusiness,
        formModel,
        formModel1,
        hasPermission,
        RoleEnum,
        add,
        del,
        add1,
        del1,
      };
    },
  });
</script>

<style></style>
