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
          >为补货员分配机器</a-button
        >
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="为补货员分配机器"
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
  import { machineList, distributeTallymanMachine } from '/@/api/machine';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { tallymanList } from '/@/api/replenish';
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
          colProps: {
            span: 24,
          },
          componentProps: () => {
            return {
              cancelFirstFeatchLimit: true,
              api: tallymanList,
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
                console.log(phone);
                // const { updateSchema } = formActionType;
                // updateSchema({ field: 'business_id', componentProps: { params: { phone } } });
              },
            };
          },
        },
        {
          label: '需要绑定的机器',
          field: 'machines',
          component: 'InputTextArea',
          componentProps: {
            placeholder: '请输入需要绑定的机器',
            disabled: true,
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
              ></Select>
            );
          },
          colProps: {
            span: 24,
          },
        },
      ];
      const { hasPermission } = usePermission();
      const {
        createMessage: { success },
      } = useMessage();
      const [register, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
        title: '机器分配',
        columns,
        api: machineList,
        border: true,
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
        machine_list.value = [];
        //遍历table数组
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
      }

      async function handleOk() {
        //获取的是选中行的table中的数据
        // console.log(getSelectRows());
        // //获取的是表格中的数据
        // console.log(getFieldsValue().machines.split(','));
        // console.log(getFieldsValue());
        //合成请求参数
        let machine_nos = machine_list.value;
        const params = {
          user_id: getFieldsValue().user_id,
          machine_nos,
          // business_id: getFieldsValue().business_id,
        };
        //发送请求的参数
        await distributeTallymanMachine(params);
        success('分配机器成功');
        resetFields();
        reload();
        openModal1(false);
        clearSelectedRowKeys();
      }
      function cancelOk() {
        resetFields();
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
        // keyChange,
      };
    },
  });
</script>

<style></style>
