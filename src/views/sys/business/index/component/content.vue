<template>
  <div>
    <a-button>页面引导</a-button>
    <BasicTable @register="register">
      <template #tableTitle>
        <a-button
          v-if="hasPermission([RoleEnum.superMaster])"
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="newAddBusiness"
          >添加商户</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction :actions="createAxios(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="添加商户"
      @register="register1"
      okText="保存"
      @ok="addBusinessOk"
      @cancel="cancelBusinessOk"
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
      title="编辑商户信息"
      @register="register3"
      okText="保存"
      @ok="editPersonOk"
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
      title="商户详情"
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
  import { businessList, addBusiness, editBusiness, businessDetailMessage } from '/@/api/business';
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
            label: '编辑商户信息',
            onClick: editBusinessMessage.bind(null, record),
            auth: [RoleEnum.superMaster],
          },
          {
            label: '商户详情',
            onClick: businessDetail.bind(null, record),
          },
        ];
      }
      async function newAddBusiness() {
        await openModal1(true);
      }
      async function editBusinessMessage(record) {
        await openModal2(true);
        formModel.value = {
          business_id: record.business_id,
          business_name: record.business_name,
          status: record.status,
        };
      }
      async function businessDetail(record) {
        const formData = await businessDetailMessage({ business_id: record.business_id });

        await openModal3(true);
        formModel1.value = {
          business_name: formData.business_name,
          status: formData.status,
        };
      }

      async function addBusinessOk() {
        //校验是否满足表单规则

        await validateFields1();
        //获取表单数据
        const formData = getFieldsValue1();
        await addBusiness(formData);
        success('新增商户成功');
        resetFields1();
        reload();
        openModal1(false);
      }

      async function editPersonOk() {
        //校验是否满足表单规则

        await validateFields2();
        //获取表单数据
        const formData = getFieldsValue2();
        console.log(formData);
        await editBusiness(formData);
        success('修改商户信息成功');
        resetFields2();
        reload();
        openModal2(false);
      }
      function cancelBusinessOk() {
        resetFields1();
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
        addBusinessOk,
        cancelBusinessOk,
        editPersonOk,
        newAddBusiness,
        formModel,
        formModel1,
        hasPermission,
        RoleEnum,
      };
    },
  });
</script>

<style></style>
