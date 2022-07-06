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
          @click="newAddUser"
          >添加用户</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction :actions="createAxios(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="添加用户"
      @register="register1"
      okText="保存"
      @ok="addPersonOk"
      @cancel="cancelPersonOk"
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
      title="编辑用户信息"
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
      title="账号详情"
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
  import { accountList, addAccount, editAccount, accountDetailMessage } from '/@/api/login';
  import { businessList } from '/@/api/business';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { isString } from '/@/utils/is';
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
        title: '用户管理列表',
        api: accountList,
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
            label: '编辑用户信息',
            onClick: editPersonMessage.bind(null, record),
            auth: [
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ],
          },
          {
            label: '账号详情',
            onClick: infoDetail.bind(null, record),
          },
        ];
      }
      async function newAddUser() {
        await openModal1(true);
      }
      async function editPersonMessage(record) {
        const formData = await accountDetailMessage({ phone: record.phone });
        await openModal2(true);
        formModel.value = {
          old_phone: formData.phone,
          new_phone: formData.phone,
          level: formData.level,
          password: '',
          status: formData.status,
          user_name: formData.user_name,
          business_id: formData.business_list.map((v) => v.business_name),
        };
      }
      async function infoDetail(record) {
        const formData = await accountDetailMessage({ phone: record.phone });
        await openModal3(true);
        formModel1.value = {
          user_name: formData.user_name,
          id: formData.id,
          user_no: formData.user_no,
          phone: formData.phone,
          level: formData.level,
          comment: formData.comment,
          status: formData.status,
          business_id: formData.business_list.map((v) => v.business_name),
        };
      }

      async function addPersonOk() {
        //校验是否满足表单规则

        await validateFields1();
        //获取表单数据
        const formData = getFieldsValue1();

        await addAccount(formData);
        success('新增用户成功');
        resetFields1();
        reload();
        openModal1(false);
      }
      function cancelPersonOk() {
        resetFields1();
      }
      async function editPersonOk() {
        //校验是否满足表单规则

        await validateFields2();
        //获取表单数据
        const formData = getFieldsValue2();
        const array = formData.business_ids;
        const business_ids = [];
        for (let key in array) {
          if (isString(array[key])) {
            const result = await businessList({ page: 1, pageSize: 10, keyword: array[key] });
            business_ids.push(result.list[0].business_id);
          } else {
            business_ids.push(array[key]);
          }
        }
        formData.business_ids = business_ids;
        await editAccount(formData);
        success('修改用户信息成功');
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
        addPersonOk,
        cancelPersonOk,
        editPersonOk,
        newAddUser,
        formModel,
        formModel1,
        hasPermission,
        RoleEnum,
      };
    },
  });
</script>

<style></style>
