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
          @click="newAddCate"
          >添加商品分类</a-button
        >
      </template>
      <template #img="{ text }">
        <TableImg :size="60" :simpleShow="true" :imgList="text" />
      </template>
      <template #action="{ record }">
        <TableAction :actions="createAxios(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="添加品牌"
      @register="register1"
      okText="保存"
      @ok="addProductionTypeOK"
      @cancel="cancelProductionTypeOK"
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
      title="编辑分类"
      @register="register3"
      okText="保存"
      @ok="editProductionTypeOK"
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
      title="分类详情"
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
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { columns, getFormConfig, schemas, schemas1, schemas2 } from './data';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import {
    productionTypeList,
    addProductionType,
    editProductionType,
    productionTypeDetailMessage,
  } from '/@/api/production';
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
      TableImg,
    },
    setup() {
      const { hasPermission } = usePermission();
      const formModel = ref({});
      const formModel1 = ref({});
      const {
        createMessage: { success },
      } = useMessage();
      const [register, { reload }] = useTable({
        title: '品牌管理列表',
        api: productionTypeList,
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
            label: '编辑分类信息',
            onClick: editProductionTypeMessage.bind(null, record),
            auth: [
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ],
          },
          {
            label: '分类详情',
            onClick: cateDetail.bind(null, record),
          },
        ];
      }
      async function newAddCate() {
        await openModal1(true);
      }
      async function editProductionTypeMessage(record) {
        await openModal2(true);
        formModel.value = {
          production_type_id: record.production_type_id,
          production_type_name: record.production_type_name,
          status: record.status,
        };
      }
      async function cateDetail(record) {
        const formData = await productionTypeDetailMessage({
          production_type_id: record.production_type_id,
        });
        await openModal3(true);
        formModel1.value = {
          production_type_id: formData.production_type_id,
          production_type_name: formData.production_type_name,
          status: formData.status,
        };
      }

      async function addProductionTypeOK() {
        //校验是否满足表单规则

        await validateFields1();
        //获取表单数据
        const formData = getFieldsValue1();
        // const data = formData.img.split(/\\\\|\\/g);
        //先不发送图片的上传
        // const result = await uploadImg({file: data[data.length-1]})
        await addProductionType(formData);
        success('新增分类信息成功');
        resetFields1();
        reload();
        openModal1(false);
      }
      function cancelProductionTypeOK() {
        resetFields1();
      }
      async function editProductionTypeOK() {
        //校验是否满足表单规则

        await validateFields2();
        //获取表单数据
        const formData = getFieldsValue2();
        await editProductionType(formData);
        success('修改品牌信息成功');
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
        addProductionTypeOK,
        cancelProductionTypeOK,
        editProductionTypeOK,
        newAddCate,
        formModel,
        formModel1,
        hasPermission,
        RoleEnum,
      };
    },
  });
</script>

<style></style>
