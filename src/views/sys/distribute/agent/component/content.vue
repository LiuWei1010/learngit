<template>
  <div>
    <BasicTable @register="register">
      <template #tableTitle>
        <a-button
          v-if="
            hasPermission([
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ])
          "
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="getRows"
          >为代理商分配机器</a-button
        >
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="为人员分配机器"
      @register="register1"
      okText="保存"
      @ok="handleOk"
      @cancel="cancelOk"
    >
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :model="formModel"
        @register="register2"
        :showActionButtonGroup="false"
      >
        <!-- <template #search>
          <Input type="text" placeholder="请输入用户名" @change="keyChange" />
        </template> -->
      </BasicForm>
    </BasicModal>
  </div>
</template>

<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { useTable, BasicTable } from '/@/components/Table';
  import { columns, getFormConfig } from './data';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { machineList, distributeMachine } from '/@/api/machine';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { accountList } from '/@/api/login';
  import { accountDetailMessage } from '/@/api/login';
  import { Select } from 'ant-design-vue';
  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicTable,
      BasicModal,
      BasicForm,
      Select,
    },
    setup() {
      let machine_list = ref([]);
      const schemas = [
        {
          label: '用户',
          field: 'user_id',
          component: 'ApiSelect',
          required: true,
          colProps: {
            span: 24,
          },
          componentProps: ({ formActionType }) => {
            return {
              cancelFirstFeatchLimit: true,
              api: accountList,
              params: {
                page: 1,
                pageSize: 10000,
                keyword: '',
              },
              resultField: 'list',
              labelField: 'user_name',
              valueField: 'id',
              onChange(e, ctx) {
                const { phone } = ctx;
                const { updateSchema } = formActionType;
                updateSchema({ field: 'business_id', componentProps: { params: { phone } } });
              },
            };
          },
        },
        {
          label: '商户',
          field: 'business_id',
          component: 'ApiSelect',
          required: true,
          colProps: {
            span: 24,
          },
          componentProps: {
            api: accountDetailMessage,
            params: {
              phone: '18361072551',
            },
            resultField: 'business_list',
            labelField: 'business_name',
            valueField: 'business_id',
          },
        },
        {
          label: '绑定的机器',
          field: 'machine_list',
          component: 'Select',
          required: true,
          componentProps: {
            // defaultValue: machineList,
            mode: 'multiple',
            open: false,
          },
          render() {
            return (
              <Select
                mode="multiple"
                size="default"
                open={false}
                allowClear={true}
                placeholder="Please select"
                default-value={machine_list}
                onChange={handleChange}
              ></Select>
            );
          },
          colProps: {
            span: 24,
          },
        },
      ];
      function handleChange() {
        console.log(machine_list.value);
      }
      const { hasPermission } = usePermission();
      const {
        createMessage: { success },
      } = useMessage();
      const [register, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
        title: '机器分配',
        columns,
        api: machineList,
        border: true,
        clickToRowSelect: false,
        useSearchForm: true,
        rowSelection: {
          type: 'checkbox',
        },
        formConfig: getFormConfig(),
      });
      const formModel = ref({});
      const [register1, { openModal: openModal1 }] = useModal();
      const [register2, { getFieldsValue, resetFields }] = useForm();
      async function getRows() {
        //打开模态框
        await openModal1();
        // const machineList = [];
        //遍历table数组
        console.log(machine_list.value);
        for (let key in getSelectRows()) {
          const formData = getSelectRows();
          machine_list.value.push(formData[key].machine_no);
        }
        let setMachineList = new Set(machine_list.value);
        machine_list.value = [];
        for (let key of setMachineList) {
          machine_list.value.push(key);
        }
        machine_list.value.sort(function (a, b) {
          return a - b;
        });
        // formModel.value = {
        //   machines,
        // };
      }
      async function handleOk() {
        //获取的是选中行的table中的数据
        // console.log(getSelectRows());
        // //获取的是表格中的数据
        // console.log(getFieldsValue().machines.split(','));
        // console.log(getFieldsValue());
        //合成请求参数
        console.log(machine_list.value);
        let machine_nos = machine_list.value;
        const params = {
          user_id: getFieldsValue().user_id,
          machine_nos,
          business_id: getFieldsValue().business_id,
        };
        //发送请求的参数
        console.log(params);
        await distributeMachine(params);
        success('分配机器成功');
        resetFields();
        reload();
        openModal1(false);
        clearSelectedRowKeys();
        machine_list.value = [];
      }
      function cancelOk() {
        resetFields();
        machine_list.value = [];
      }
      return {
        register,
        register1,
        register2,
        formModel,
        getRows,
        handleOk,
        cancelOk,
        schemas,
        hasPermission,
        RoleEnum,
      };
    },
  });
</script>

<style></style>
