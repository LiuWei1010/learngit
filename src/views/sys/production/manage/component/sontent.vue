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
          @click="newAddProduction"
          >添加商品</a-button
        >
      </template>
      <template #img="{ record }">
        <TableImg :size="30" :simpleShow="true" :imgList="[prefix + record.img]" />
      </template>
      <template #action="{ record }">
        <TableAction :actions="createAxios(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="添加商品"
      @register="register1"
      okText="保存"
      @ok="addProductionOK"
      @cancel="cancelAddProduction"
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
      title="编辑商品"
      @register="register3"
      okText="保存"
      @ok="editProductionOK"
      @cancel="cancelEditProduction"
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
      title="商品详情"
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

<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { columns, getFormConfig, schemas2 } from './data';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';

  // import { getAuthCache, setAuthCache } from '/@/utils/auth';
  import {
    productionList,
    addProduction,
    editProduction,
    productionDetailMessage,
  } from '/@/api/production';
  import { brandList, productionTypeList } from '/@/api/production';
  import { uploadImg } from '/@/api/file';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { Upload } from 'ant-design-vue';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicTable,
      TableAction,
      BasicForm,
      BasicModal,
      TableImg,
      Upload,
      PlusOutlined,
      LoadingOutlined,
    },
    setup() {
      let seenFileList = ref(true);
      let seen = ref(false);
      let result = '';
      const fileList = ref([]);
      const imageUrl = ref<string>('');
      const loading = ref<boolean>(false);
      const prefix = 'https://automat.xsecvm.com/pc_management/file/img/';
      const { hasPermission } = usePermission();
      const formModel = ref({});
      const formModel1 = ref({});
      const {
        createMessage: { success, error: errorMessage },
      } = useMessage();
      const [register, { reload }] = useTable({
        title: '商品管理列表',
        api: productionList,
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
      ] = useForm({
        labelCol: {
          span: 6,
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
      ] = useForm();
      const [register5, { openModal: openModal3 }] = useModal();
      const [register6] = useForm();
      function createAxios(record) {
        return [
          {
            label: '编辑商品信息',
            onClick: editProductionMessage.bind(null, record),
            auth: [
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ],
          },
          {
            label: '商品详情',
            onClick: productionDetail.bind(null, record),
          },
        ];
      }
      function cancel() {
        //图片刚进行加载就触发
        return false;
      }
      function getBase64(img: Blob, callback: (base64Url: string) => void) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
      }
      const handleChange = async (info) => {
        const params = new FormData();

        params.append('file', info.file);

        let data = await uploadImg(params);
        result = data.filename;

        getBase64(info.file, (base64Url: string) => {
          imageUrl.value = base64Url;
          loading.value = false;
        });
        // console.log(result);
        // }
      };
      const handleChangeTwo = async (info) => {
        //图片加载完成后触发

        if (info.fileList.length == 0) {
          seen.value = true;
          seenFileList.value = false;
          result = '';
        } else {
          getBase64(info.file, (base64Url: string) => {
            imageUrl.value = base64Url;
            seen.value = false;
          });

          const params = new FormData();

          params.append('file', info.file);

          const data = await uploadImg(params);

          result = data.filename;
        }
      };
      async function newAddProduction() {
        await openModal1(true);
      }
      async function editProductionMessage(record) {
        await openModal2(true);
        result = record.img;
        let url = prefix + result;
        fileList.value.push({
          url,
        });
        formModel.value = {
          production_id: record.production_id,
          production_name: record.production_name,
          title: record.title,
          brand_id: record.brand_id,
          production_type_id: record.production_type_id,
          price: record.price / 100,
          original_price: record.original_price / 100,
          weight: record.weight,
          weight_unit: record.weight_unit,
          weight_error: record.weight_error,
          expiration_date: record.expiration_date,
          expiration_date_unit: record.expiration_date_unit,
          is_expiration_date: record.is_expiration_date,
          content: record.content,
          tags: record.tags,
          summary: record.summary,
          img: record.img,
        };
      }
      async function productionDetail(record) {
        const formData = await productionDetailMessage({ production_id: record.production_id });
        await openModal3(true);
        formModel1.value = {
          production_id: formData.production_id,
          production_no: formData.production_no,
          production_name: formData.production_name,
          title: formData.title,
          brand_id: formData.brand_id,
          brand_name: formData.brand_name,
          production_type_id: formData.production_type_id,
          production_type_name: formData.production_type_name,
          price: formData.price / 100,
          original_price: formData.original_price / 100,
          weight: formData.weight,
          weight_unit: formData.weight_unit,
          weight_error: formData.weight_error,
          expiration_date: formData.expiration_date,
          expiration_date_unit: formData.expiration_date_unit,
          is_expiration_date: formData.is_expiration_date,
          content: formData.content,
          tags: formData.tags,
          summary: formData.summary,
        };
      }

      async function addProductionOK() {
        //校验是否满足表单规则

        await validateFields1();
        // 默认其中没有重复的
        let bool = true;
        //获取表单数据
        const formData = getFieldsValue1();
        let productionData = await productionList({
          page: 1,
          pageSize: 1000,
          keyword: '',
        });
        let data = productionData.list;
        for (let key of data) {
          if (key.production_name === formData.production_name) {
            bool = false;
            break;
          }
        }
        if (bool) {
          if (result !== '') {
            formData.img = result;
          }
          formData.price = formData.price * 100;
          formData.original_price = formData.original_price * 100;
          console.log(formData);

          await addProduction(formData);
          success('新增商品成功');
          cancelAddProduction();
          reload();
          openModal1(false);
        } else {
          errorMessage('该商品名已被创建,请更换商品名');
        }
        //判断该商品是否已被创建,如果已经被创建,不再允许创建
      }
      function cancelAddProduction() {
        fileList.value = [];
        seenFileList.value = true;
        imageUrl.value = '';
        seen.value = false;
        result = '';
        resetFields1();
      }
      async function editProductionOK() {
        //校验是否满足表单规则

        await validateFields2();
        // 默认其中没有重复的
        let bool = true;
        //获取表单数据
        const formData = getFieldsValue2();
        let productionData = await productionList({
          page: 1,
          pageSize: 1000,
          keyword: '',
        });
        let data = productionData.list;
        for (let key of data) {
          if (key.production_name === formData.production_name) {
            bool = false;
            break;
          }
        }
        if (bool) {
          if (result !== '') {
            formData.img = result;
          }
          formData.price = formData.price * 100;
          formData.original_price = formData.original_price * 100;
          await editProduction(formData);
          success('修改商品信息成功');
          cancelEditProduction();
          reload();
          openModal2(false);
        } else {
          errorMessage('该商品名已被创建,请更换商品名');
        }
      }
      function cancelEditProduction() {
        fileList.value = [];
        seenFileList.value = true;
        imageUrl.value = '';
        seen.value = false;
        result = '';
        resetFields2();
      }
      const schemas = [
        {
          label: '商品名称',
          field: 'production_name',
          component: 'Input',
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品标题',
          field: 'title',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入商品标题',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '品牌',
          field: 'brand_id',
          component: 'ApiSelect',
          componentProps: {
            cancelFirstFeatchLimit: true,
            api: brandList,
            params: {
              page: 1,
              pageSize: 10000,
            },
            resultField: 'list',
            labelField: 'brand_name',
            valueField: 'brand_id',
          },
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '分类',
          field: 'production_type_id',
          component: 'ApiSelect',
          required: true,
          componentProps: {
            cancelFirstFeatchLimit: true,
            api: productionTypeList,
            params: {
              page: 1,
              pageSize: 10000,
            },
            resultField: 'list',
            labelField: 'production_type_name',
            valueField: 'production_type_id',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '价格(元)',
          field: 'price',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入您的价格',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品原价(元)',
          field: 'original_price',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入您的商品原价',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '图片(格式均支持)',
          field: 'img',
          component: 'Input',
          // componentProps: {
          //   type: 'file',
          // },
          colProps: {
            span: 24,
          },
          // slot: "tupian",
          render() {
            return (
              <Upload
                v-model:file-list={fileList.value}
                list-type="picture-card"
                class="avatar-uploader"
                show-upload-list={false}
                before-upload={cancel}
                onChange={handleChange}
              >
                {imageUrl.value === '' ? (
                  <div>
                    {loading.value === true ? (
                      <LoadingOutlined></LoadingOutlined>
                    ) : (
                      <PlusOutlined></PlusOutlined>
                    )}
                    <div class="ant-upload-text">Upload</div>
                  </div>
                ) : (
                  <img src={imageUrl.value} />
                )}
              </Upload>
            );
          },
        },
        {
          label: '重量',
          field: 'weight',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的商品重量',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '重量单位',
          field: 'weight_unit',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的重量单位',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '重量误差',
          field: 'weight_error',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的重量误差',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '保质期时间',
          field: 'expiration_date',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的保质期时间',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '保质期单位',
          field: 'expiration_date_unit',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的保质期单位',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '是否存在保质期',
          field: 'is_expiration_date',
          component: 'Select',
          componentProps: {
            options: [
              {
                label: '存在',
                value: 1,
              },
              {
                label: '不存在',
                value: 0,
              },
            ],
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品标签',
          field: 'tags',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的商品标签',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品内容',
          field: 'content',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的商品内容',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品描述',
          field: 'summary',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的商品描述',
          },
          colProps: {
            span: 24,
          },
        },
      ];
      const schemas1 = [
        {
          label: '商品ID',
          field: 'production_id',
          component: 'Input',
          componentProps: {
            placeholder: '请输入商品ID',
            disabled: true,
          },
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品名称',
          field: 'production_name',
          component: 'Input',
          componentProps: {
            placeholder: '请输入商品名称',
          },
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品标题',
          field: 'title',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入商品标题',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '品牌',
          field: 'brand_id',
          component: 'ApiSelect',
          componentProps: {
            cancelFirstFeatchLimit: true,
            api: brandList,
            params: {
              page: 1,
              pageSize: 10000,
            },
            resultField: 'list',
            labelField: 'brand_name',
            valueField: 'brand_id',
          },
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '分类',
          field: 'production_type_id',
          component: 'ApiSelect',
          required: true,
          componentProps: {
            cancelFirstFeatchLimit: true,
            api: productionTypeList,
            params: {
              page: 1,
              pageSize: 10000,
            },
            resultField: 'list',
            labelField: 'production_type_name',
            valueField: 'production_type_id',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '价格(元)',
          field: 'price',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的价格',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品原价(元)',
          field: 'original_price',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的商品原价',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '图片(格式均支持)',
          field: 'img',
          component: 'Input',
          // componentProps: {
          //   type: 'file',
          // },
          colProps: {
            span: 24,
          },
          render() {
            return (
              <Upload
                v-model:file-list={fileList.value}
                list-type="picture-card"
                class="avatar-uploader"
                show-upload-list={seenFileList.value}
                before-upload={cancel}
                onChange={handleChangeTwo}
              >
                {imageUrl.value === '' ? <></> : <img src={imageUrl.value} />}
                {seen.value === true ? (
                  <div>
                    <PlusOutlined></PlusOutlined>
                    <div class="ant-upload-text">Upload</div>
                  </div>
                ) : (
                  <></>
                )}
              </Upload>
            );
          },
          // slot: "picture"
        },
        {
          label: '重量',
          field: 'weight',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的商品重量',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '重量单位',
          field: 'weight_unit',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的重量单位',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '重量误差',
          field: 'weight_error',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的重量误差',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '保质期时间',
          field: 'expiration_date',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的保质期时间',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '保质期单位',
          field: 'expiration_date_unit',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的保质期单位',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '是否存在保质期',
          field: 'is_expiration_date',
          component: 'Select',
          componentProps: {
            options: [
              {
                label: '存在',
                value: 1,
              },
              {
                label: '不存在',
                value: 0,
              },
            ],
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品标签',
          field: 'tags',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的商品标签',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品内容',
          field: 'content',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的商品内容',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品描述',
          field: 'summary',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的商品描述',
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
        register5,
        register6,
        schemas,
        schemas1,
        schemas2,
        createAxios,
        addProductionOK,
        editProductionOK,
        newAddProduction,
        formModel,
        formModel1,
        cancelAddProduction,
        cancelEditProduction,
        hasPermission,
        RoleEnum,
        prefix,
        fileList,
        imageUrl,
        loading,
        seenFileList,
        seen,
      };
    },
  });
</script>

<style></style>
