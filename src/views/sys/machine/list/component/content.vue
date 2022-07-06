<template>
  <div>
    <BasicTable @register="register">
      <template #tableTitle>
        <a-button
          v-if="hasPermission([RoleEnum.superMaster])"
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="newAddMachine"
          >添加机柜</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction :actions="createAxios(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="添加机柜"
      @register="register1"
      okText="保存"
      @ok="addMachineOK"
      @cancel="cancelMachineOK"
    >
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :showActionButtonGroup="false"
        @register="register2"
      />
    </BasicModal>

    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="编辑机柜"
      @register="register3"
      okText="保存"
      @ok="editMachineOK"
    >
      <BasicForm
        :labelWidth="120"
        :schemas="schemas1"
        :model="formModel"
        :showActionButtonGroup="false"
        @register="register4"
      />
    </BasicModal>

    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      :showCancelBtn="false"
      :showOkBtn="false"
      title="机柜详情"
      @register="register5"
    >
      <BasicForm
        :labelWidth="120"
        :schemas="schemas2"
        :model="formModel1"
        :showActionButtonGroup="false"
        @register="register6"
      />
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, getFormConfig, schemas, schemas1, schemas2 } from './data';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { machineList, addMachine, editMachine, machineDetailMessage } from '/@/api/machine';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { RoleEnum } from '/@/enums/roleEnum';
  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicTable,
      TableAction,
      BasicForm,
      BasicModal,
    },
    setup() {
      const { hasPermission } = usePermission();
      const formModel = ref({});
      const formModel1 = ref({});
      const {
        createMessage: { success },
      } = useMessage();
      const [register, { reload }] = useTable({
        title: '机器管理列表',
        api: machineList,
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
        },
      ] = useForm();
      const [register3, { openModal: openModal2 }] = useModal();
      const [
        register4,
        {
          getFieldsValue: getFieldsValue2,
          validateFields: validateFields2,
          resetFields: resetFields2,
        },
      ] = useForm();
      const [register5, { openModal: openModal3 }] = useModal();
      const [register6] = useForm();
      function createAxios(record) {
        return [
          {
            label: '编辑机柜信息',
            onClick: editMachineMessage.bind(null, record),
            auth: [
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ],
          },
          {
            label: '机柜详情',
            onClick: machineDetail.bind(null, record),
          },
        ];
      }
      async function newAddMachine() {
        await openModal1(true);
      }
      async function editMachineMessage(record) {
        await openModal2(true);
        formModel.value = {
          machine_no: record.machine_no,
          mac: record.mac,
          device_id: record.device_id,
          hatch_number: record.hatch_number,
          place_id: record.place_id,
          power: record.power,
          status: record.status,
          type: record.type,
          discounts_id: record.discounts_id,
        };
      }
      async function machineDetail(record) {
        const formData = await machineDetailMessage({ machine_no: record.machine_no });

        await openModal3(true);
        formModel1.value = {
          machine_no: formData.machine_no,
          mac: formData.mac,
          device_id: formData.device_id,
          hatch_number: formData.hatch_number,
          business_id: formData.business_id,
          business_name: formData.business_name || '暂不存在',
          place_id: formData.place_id,
          place_name: formData.place_name,
          power: formData.power,
          status: formData.status,
          type: formData.type,
          discounts_id: formData.discounts_id,
        };
      }

      async function addMachineOK() {
        //校验是否满足表单规则

        await validateFields1();
        //获取表单数据
        const formData = getFieldsValue1();
        await addMachine(formData);
        success('新增机柜成功');
        resetFields1();
        reload();
        openModal1(false);
      }
      function cancelMachineOK() {
        resetFields1();
      }
      async function editMachineOK() {
        //校验是否满足表单规则

        await validateFields2();
        //获取表单数据
        const formData = getFieldsValue2();
        console.log(formData);
        await editMachine(formData);
        success('修改机器信息成功');
        resetFields2();
        reload();
        openModal2(false);
      }
      return {
        register,
        register1,
        register2,
        register3,
        register4,
        register5,
        register6,
        schemas,
        schemas1,
        schemas2,
        createAxios,
        addMachineOK,
        cancelMachineOK,
        editMachineOK,
        newAddMachine,
        formModel,
        formModel1,
        hasPermission,
        RoleEnum,
      };
    },
  });
</script>

<style></style>
