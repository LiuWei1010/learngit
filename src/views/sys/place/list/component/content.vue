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
          @click="newAddPlace"
          >添加场所</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction :actions="createAxios(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="添加场所"
      @register="register1"
      okText="保存"
      @ok="addPlaceOk"
      @cancel="cancelPlaceOk"
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
      title="编辑场所信息"
      @register="register3"
      okText="保存"
      @ok="editPlaceOk"
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
      title="场所详情"
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
  import { placeList, addPlace, editPlace, placeDetailMessage } from '/@/api/place';
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
        title: '场所列表',
        api: placeList,
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
            label: '编辑场所信息',
            onClick: editPlaceMessage.bind(null, record),
            auth: [
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ],
          },
          {
            label: '场所详情',
            onClick: placeDetail.bind(null, record),
          },
        ];
      }
      async function newAddPlace() {
        await openModal1(true);
      }
      async function editPlaceMessage(record) {
        await openModal2(true);
        formModel.value = {
          id: record.place_id,
          place_name: record.place_name,
          address: record.address,
          parent_id: record.parent_id,
          status: record.status,
        };
      }
      async function placeDetail(record) {
        await openModal3(true);
        const formData = await placeDetailMessage({ id: record.place_id });
        formModel1.value = {
          parent_id: formData.parent_id,
          place_name: formData.place_name,
          address: formData.address,
          status: formData.status,
        };
      }

      async function addPlaceOk() {
        //校验是否满足表单规则
        await validateFields1();
        //获取表单数据
        const formData = getFieldsValue1();

        await addPlace(formData);
        success('新增场所成功');
        resetFields1();
        reload();
        openModal1(false);
      }
      function cancelPlaceOk() {
        resetFields1();
      }
      async function editPlaceOk() {
        //校验是否满足表单规则

        await validateFields2();
        //获取表单数据
        const formData = getFieldsValue2();
        await editPlace(formData);
        success('修改场所信息成功');
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
        addPlaceOk,
        cancelPlaceOk,
        editPlaceOk,
        newAddPlace,
        formModel,
        formModel1,
        hasPermission,
        RoleEnum,
      };
    },
  });
</script>

<style></style>
