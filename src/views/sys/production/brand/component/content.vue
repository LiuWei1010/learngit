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
          @click="newAddBrand"
          >添加品牌</a-button
        >
      </template>
      <!-- <template #img="{ record }">
        <TableImg :size="15" :simpleShow="true" :imgList="[prefix + record.img]" />
      </template> -->
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
      @ok="addBrandOK"
      @cancel="cancelAddBrand"
    >
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :showActionButtonGroup="false"
        @register="register2"
      >
        <template #addImg>
          <Input type="file" @change="pictureChange" />
        </template>
      </BasicForm>
    </BasicModal>

    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="编辑品牌"
      @register="register3"
      okText="保存"
      @ok="editBrandOK"
      @cancel="cancelEditBrand"
    >
      <BasicForm
        :labelWidth="120"
        :schemas="schemas1"
        :model="formModel"
        :showActionButtonGroup="false"
        @register="register4"
      >
        <template #editImg>
          <Input type="file" @change="editPictureChange" />
        </template>
      </BasicForm>
    </BasicModal>

    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      :showCancelBtn="false"
      :showOkBtn="false"
      title="品牌详情"
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
  import { brandList, addBrand, editBrand, brandDetailMessage } from '/@/api/production';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { uploadImg } from '/@/api/file';
  import { Input } from 'ant-design-vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { RoleEnum } from '/@/enums/roleEnum';
  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicTable,
      TableAction,
      BasicForm,
      BasicModal,
      Input,
    },
    setup() {
      const { hasPermission } = usePermission();
      const prefix = 'https://automat.xsecvm.com/pc_management/file/img/';
      let addImg = '';
      let editImg = '';
      const formModel = ref({});
      const formModel1 = ref({});
      const {
        createMessage: { success },
      } = useMessage();
      const [register, { reload }] = useTable({
        title: '品牌管理列表',
        api: brandList,
        async afterFetch(T) {
          // console.log(T);
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
      ] = useForm({
        labelCol: {
          span: 8,
        },
      });
      const [register3, { openModal: openModal2 }] = useModal();
      const [
        register4,
        {
          getFieldsValue: getFieldsValue2,
          validateFields: validateFields2,
          resetFields: resetFields2,
        },
      ] = useForm({
        labelCol: {
          span: 6,
        },
      });
      const [register5, { openModal: openModal3 }] = useModal();
      const [register6] = useForm({
        labelCol: {
          span: 6,
        },
      });
      function createAxios(record) {
        return [
          {
            label: '编辑品牌信息',
            onClick: editBrandMessage.bind(null, record),
            auth: [
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ],
          },
          {
            label: '品牌详情',
            onClick: machineDetail.bind(null, record),
          },
        ];
      }
      async function newAddBrand() {
        await openModal1(true);
      }
      async function editBrandMessage(record) {
        await openModal2(true);
        formModel.value = {
          brand_id: record.brand_id,
          brand_name: record.brand_name,
          img: record.img,
          status: record.status,
        };
      }
      async function machineDetail(record) {
        const formData = await brandDetailMessage({ brand_id: record.brand_id });
        await openModal3(true);
        formModel1.value = {
          brand_id: formData.brand_id,
          brand_name: formData.brand_name,
          status: formData.status,
        };
      }

      async function addBrandOK() {
        //校验是否满足表单规则

        await validateFields1();
        //获取表单数据
        const formData = getFieldsValue1();

        //先不发送图片的上传
        await addBrand({
          brand_name: formData.brand_name,
          img: addImg,
        });
        success('新增品牌成功');
        addImg = '';
        resetFields1();
        reload();
        openModal1(false);
      }
      function cancelAddBrand() {
        addImg = '';
        resetFields1();
      }
      async function editBrandOK() {
        //校验是否满足表单规则

        await validateFields2();
        //获取表单数据
        const formData = getFieldsValue2();
        console.log(formData);
        formData.img = editImg || formData.img;
        await editBrand(formData);
        success('修改品牌信息成功');
        editImg = '';
        resetFields2();
        reload();
        openModal2(false);
      }

      function cancelEditBrand() {
        editImg = '';
      }
      async function pictureChange(event) {
        let params = new FormData();
        params.append('file', event.target.files[0]);
        let result = await uploadImg(params);
        addImg = result.filename;
      }
      async function editPictureChange(event) {
        let params = new FormData();
        params.append('file', event.target.files[0]);
        let result = await uploadImg(params);
        editImg = result.filename;
      }
      return {
        prefix,
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
        addBrandOK,
        cancelAddBrand,
        cancelEditBrand,
        editBrandOK,
        newAddBrand,
        formModel,
        formModel1,
        pictureChange,
        editPictureChange,
        editImg,
        addImg,
        hasPermission,
        RoleEnum,
      };
    },
  });
</script>

<style type="less">
  .image {
    width: 200px;
    height: 200px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
