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
          @click="newAddWay"
          >添加仓道</a-button
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
      title="添加货道商品"
      @register="register1"
      okText="保存"
      @ok="addHatchOK"
      @cancel="cancelAddHatch"
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
      @ok="editHatchOK"
      @cancel="cancelEditHatch"
    >
      <BasicForm
        :labelWidth="120"
        :schemas="schemas1"
        :model="formModel"
        :showActionButtonGroup="false"
        @register="register4"
      />
    </BasicModal>
  </div>
</template>

<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { columns, getFormConfig } from './data';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { hatchList, addHatch, editHatch } from '/@/api/cargoway';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { productionList } from '/@/api/production';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { brandList, productionTypeList } from '/@/api/production';
  import { uploadImg } from '/@/api/file';
  import { machineList } from '/@/api/machine';
  import { Upload } from 'ant-design-vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicTable,
      TableAction,
      BasicForm,
      BasicModal,
      TableImg,
      PlusOutlined,
      Upload,
    },
    setup() {
      let result = '';
      let seenFileList = ref(true);
      let seen = ref(false);
      const imageUrl = ref<string>('');
      const loading = ref<boolean>(false);
      const fileList = ref([]);
      const { hasPermission } = usePermission();
      const prefix = 'https://automat.xsecvm.com/pc_management/file/img/';

      const formModel = ref({});

      const {
        createMessage: { success },
      } = useMessage();
      const [register, { reload }] = useTable({
        title: '货道管理列表',
        api: hatchList,
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
          updateSchema: updateSchema2,
          setFieldsValue: setFieldsValue2,
        },
      ] = useForm();

      function createAxios(record) {
        return [
          {
            label: '编辑货道信息',
            onClick: editHatchMessage.bind(null, record),
            auth: [
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ],
          },
        ];
      }

      async function newAddWay() {
        await openModal1(true);
      }
      async function editHatchMessage(record) {
        await openModal2(true);
        result = record.img;
        let url = prefix + record.img;
        fileList.value.push({
          url: url,
        });
        formModel.value = {
          hatch_id: record.hatch_id,
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
          left_count: record.left_count,
          total_count: record.total_count,
          production_type_name: record.production_type_name,
          brand_name: record.brand_name,
        };
      }

      async function addHatchOK() {
        //校验是否满足表单规则

        await validateFields1();
        //获取表单数据
        const formData = getFieldsValue1();
        // let addImg = getAuthCache('addImg');
        // formData.img = addImg;
        // formData.production_name = getAuthCache('production_name');
        formData.price = formData.price * 100;
        formData.original_price = formData.original_price * 100;
        // const data = formData.img.split(/\\\\|\\/g);
        if (result !== '') {
          formData.img = result;
        }
        //先不发送图片的上传
        // const result = await uploadImg({file: data[data.length-1]})
        await addHatch(formData);
        success('新增货道成功');
        cancelAddHatch();
        reload();
        openModal1(false);
      }
      function cancelAddHatch() {
        fileList.value = [];
        seenFileList.value = true;
        imageUrl.value = '';
        seen.value = false;
        result = '';
        updateSchema1([
          {
            field: 'production_name',
            componentProps: {
              params: {
                page: 1,
                pageSize: 1000,
                keyword: '',
              },
            },
          },
          {
            field: 'machine_no',
            componentProps: {
              params: {
                page: 1,
                pageSize: 10000,
                machine_no: '',
              },
            },
          },
        ]);
        resetFields1();
      }
      async function editHatchOK() {
        //校验是否满足表单规则

        await validateFields2();
        //获取表单数据
        const formData = getFieldsValue2();
        if (result !== '') {
          formData.img = result;
        }
        formData.price = formData.price * 100;
        formData.original_price = formData.original_price * 100;
        await editHatch(formData);
        success('修改货道信息成功');
        cancelEditHatch();
        reload();
        openModal2(false);
      }
      function cancelEditHatch() {
        fileList.value = [];
        seenFileList.value = true;
        imageUrl.value = '';
        seen.value = false;
        result = '';
        updateSchema2([
          {
            field: 'production_name',
            componentProps: {
              params: {
                page: 1,
                pageSize: 1000,
                keyword: '',
              },
            },
          },
          {
            field: 'machine_no',
            componentProps: {
              params: {
                page: 1,
                pageSize: 10000,
                machine_no: '',
              },
            },
          },
        ]);
        resetFields2();
      }
      function cancel() {
        //图片刚进行加载就触发

        return false;
      }
      const handleChange = async (info) => {
        //图片加载完成后触发

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
      function getBase64(img: Blob, callback: (base64Url: string) => void) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
      }
      const schemas = [
        {
          label: '机器关键字',
          field: 'machine_search',
          // required: true,
          component: 'Input',
          componentProps: {
            placeholder: '请输入机器搜索关键字',
            onChange(e) {
              updateSchema1({
                field: 'machine_no',
                componentProps: {
                  params: {
                    keyword: e.target.value,
                  },
                },
              });
            },
          },
          // required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '机器号',
          field: 'machine_no',
          component: 'ApiSelect',
          componentProps: {
            api: machineList,
            params: {
              page: 1,
              pageSize: 10000,
              keyword: '',
            },
            resultField: 'list',
            labelField: 'machine_no',
            valueField: 'machine_no',
          },
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '仓道序号',
          field: 'hatch_no',
          component: 'Input',
          componentProps: {
            placeholder: '请输入仓道序号',
          },
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '总数量',
          field: 'total_count',
          component: 'Input',
          componentProps: {
            placeholder: '请输入总数量',
          },
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '剩余数量',
          field: 'left_count',
          component: 'Input',
          componentProps: {
            placeholder: '请输入剩余数量',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品关键字',
          field: 'production_search',
          // required: true,
          component: 'Input',
          componentProps: {
            placeholder: '请输入商品搜索关键字',
            onChange(e) {
              updateSchema1({
                field: 'production_name',
                componentProps: {
                  params: {
                    keyword: e.target.value,
                  },
                },
              });
            },
          },
          // required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品名称',
          field: 'production_name',
          component: 'ApiSelect',
          required: true,
          componentProps: {
            api: productionList,
            params: {
              page: 1,
              pageSize: 100,
              keyword: '',
            },
            resultField: 'list',
            labelField: 'production_name',
            valueField: 'production_name',
            async onChange(e) {
              const data = await productionList({
                page: 1,
                pageSize: 100,
                keyword: e,
              });
              //获取正确商品数据, 是个对象
              let productionData;
              //for循环遍历,当数据中的production_name === e(当前数据), 结束循环,并将数据赋值给productionData
              for (let key of data.list) {
                if (key.production_name === e) {
                  productionData = key;
                  break;
                }
              }
              result = productionData.img;
              fileList.value = [];
              fileList.value.push({
                url: prefix + result,
              });
              // console.log(data.list[0].img);
              setFieldsValue1({
                title: productionData.title,
                production_type_id: productionData.production_type_id,
                production_type_name: productionData.production_type_name,
                brand_name: productionData.brand_name,
                brand_id: productionData.brand_id,
                production_id: productionData.production_id,
                weight: productionData.weight,
                weight_unit: productionData.weight_unit,
                weight_error: productionData.weight_error,
                expiration_date: productionData.expiration_date,
                expiration_date_unit: productionData.expiration_date_unit,
                is_expiration_date_: productionData.is_expiration_date,
                tags: productionData.tags,
                content: productionData.content,
                summary: productionData.summary,
                price: productionData.price / 100,
                img: productionData.img,
                original_price: productionData.original_price / 100,
              });
            },
          },
          // required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '选择图片',
          field: 'img',
          component: 'Input',
          // componentProps: {
          //   type: 'file',
          // },
          colProps: {
            span: 24,
          },
          // slot: "tupian",
          // componentProps: {
          //   type: 'file',
          //   async onChange(event) {
          //     const params = new FormData();
          //     params.append('file', event.target.files[0]);
          //     const result = await uploadImg(params);
          //     const addImg = result.filename;
          //     setAuthCache('addImg', addImg);
          //   },
          // },
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
          label: '商品ID',
          field: 'production_id',
          component: 'Input',
          required: true,
          componentProps: {
            disabled: true,
          },
          // required: true,
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
            disabled: true,
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '分类名称',
          field: 'production_type_name',
          component: 'Input',
          componentProps: {
            disabled: true,
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '品牌id',
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
            disabled: true,
          },
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '品牌名称',
          field: 'brand_name',
          component: 'Input',
          componentProps: {
            disabled: true,
          },
          colProps: {
            span: 24,
          },
        },

        {
          label: '商品标题',
          field: 'title',
          component: 'Input',
          componentProps: {
            placeholder: '请输入商品标题',
          },
          colProps: {
            span: 24,
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
          label: '仓道ID',
          field: 'hatch_id',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的仓道id',
            disabled: true,
          },
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '总数量',
          field: 'total_count',
          component: 'Input',
          componentProps: {
            placeholder: '请输入总数量',
          },
          required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '剩余数量',
          field: 'left_count',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入剩余数量',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品关键字',
          field: 'production_search',
          component: 'Input',
          componentProps: {
            placeholder: '请输入商品搜索关键字',
            onChange(e) {
              updateSchema2({
                field: 'production_name',
                componentProps: {
                  params: {
                    keyword: e.target.value,
                  },
                },
              });
            },
          },
          // required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品名称',
          field: 'production_name',
          component: 'ApiSelect',
          required: true,
          componentProps: {
            api: productionList,
            params: {
              page: 1,
              pageSize: 100000,
              keyword: '',
            },
            resultField: 'list',
            labelField: 'production_name',
            valueField: 'production_name',
            async onChange(e) {
              const data = await productionList({
                page: 1,
                pageSize: 100,
                keyword: e,
              });
              //获取正确商品数据, 是个对象
              let productionData;
              //for循环遍历,当数据中的production_name === e(当前数据), 结束循环,并将数据赋值给productionData
              for (let key of data.list) {
                if (key.production_name === e) {
                  productionData = key;
                  break;
                }
              }
              result = productionData.img;
              fileList.value = [];
              fileList.value.push({
                url: prefix + result,
              });
              // console.log(data.list[0].img);
              setFieldsValue2({
                title: productionData.title,
                production_type_id: productionData.production_type_id,
                production_type_name: productionData.production_type_name,
                brand_name: productionData.brand_name,
                brand_id: productionData.brand_id,
                production_id: productionData.production_id,
                weight: productionData.weight,
                weight_unit: productionData.weight_unit,
                weight_error: productionData.weight_error,
                expiration_date: productionData.expiration_date,
                expiration_date_unit: productionData.expiration_date_unit,
                is_expiration_date_: productionData.is_expiration_date,
                tags: productionData.tags,
                content: productionData.content,
                summary: productionData.summary,
                price: productionData.price / 100,
                img: productionData.img,
                original_price: productionData.original_price / 100,
              });
            },
          },
          // required: true,
          colProps: {
            span: 24,
          },
        },
        {
          label: '选择图片',
          field: 'img',
          component: 'Input',
          // componentProps: {
          //   type: 'file',
          // },
          colProps: {
            span: 24,
          },
          // slot: "tupian",
          // componentProps: {
          //   type: 'file',
          //   async onChange(event) {
          //     const params = new FormData();
          //     params.append('file', event.target.files[0]);
          //     const result = await uploadImg(params);
          //     const editImg = result.filename;
          //     setAuthCache('editImg', editImg);
          //   },
          // },
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
          label: '商品原价',
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
          label: '商品ID',
          field: 'production_id',
          component: 'Input',
          componentProps: {
            placeholder: '请输入您的商品ID',
            disabled: true,
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
            disabled: true,
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
          label: '分类名称',
          field: 'production_type_name',
          component: 'Input',
          componentProps: {
            disabled: true,
            placeholder: '分类名称',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '品牌id',
          field: 'brand_id',
          component: 'ApiSelect',
          componentProps: {
            disabled: true,
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
          label: '品牌名称',
          field: 'brand_name',
          component: 'Input',
          componentProps: {
            disabled: true,
            placeholder: '品牌名称',
          },
          colProps: {
            span: 24,
          },
        },
        {
          label: '商品标题',
          field: 'title',
          component: 'Input',
          componentProps: {
            placeholder: '请输入商品标题',
          },
          colProps: {
            span: 24,
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
      return {
        register,
        register1,
        register2,
        register3,
        register4,
        schemas,
        schemas1,
        createAxios,
        addHatchOK,
        editHatchOK,
        newAddWay,
        formModel,
        cancelEditHatch,
        cancelAddHatch,
        prefix,
        hasPermission,
        RoleEnum,
        cancel,
        handleChange,
        handleChangeTwo,
        fileList,
      };
    },
  });
</script>

<style></style>
