<template>
  <div>
    <BasicTable @register="register">
      <template #tableTitle>
        <a-button
          class="addopenid"
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
          @click="newAddOpenid"
          >绑定openid</a-button
        >
        <h1>获取openid:</h1><TableImg :size="30" :simpleShow="true" :imgList="[image]" />
      </template>

      <!-- <template #openid="{ record }">
         <template v-for="item in record.openids">
             {{ item + " | "}} 
         </template>
         
      </template> -->
      <template #img>
        <TableImg :size="30" :simpleShow="true" :imgList="[image]" />
      </template>
      <template #action="{ record }">
        <TableAction :actions="createAxios(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="绑定openid"
      @register="register1"
      okText="保存"
      @ok="addOpenidOk"
      @cancel="cancelOpenidOk"
    >
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :showActionButtonGroup="false"
        @register="register2"
      >
        <template #add="{ field }">
          <Button class="tt" v-if="Number(field) === 0" @click="add(field)">+</Button>
          <Button v-if="field > 0" @click="del(field)">-</Button>
        </template>
      </BasicForm>
    </BasicModal>

    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="修改openid"
      @register="register3"
      okText="保存"
      @ok="editOpenidOk"
      @cancel="canceleditOpenidOk"
    >
      <BasicForm
        :labelWidth="120"
        :schemas="schemas1"
        :model="formModel"
        :showActionButtonGroup="false"
        @register="register4"
      >
        <template #add1="{ field }">
          <Button class="ttt" v-if="Number(field) === 0" @click="add1(field)">+</Button>
          <Button v-if="field > 0" @click="del1(field)">-</Button>
        </template>
      </BasicForm>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { columns, schemas, schemas1, getFormConfig } from './data';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { openidList, editOpenid } from '/@/api/openid';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { Button } from '/@/components/Button';

  export default defineComponent({
    name: 'UseOpenid',
    components: {
      BasicTable,
      TableAction,
      BasicForm,
      BasicModal,
      Button,
      TableImg,
    },
    setup() {
      const { hasPermission } = usePermission();
      const formModel = ref({});
      const image = 'https://famon.top/pictures/get_openid.png';
      const n = ref(1);
      const {
        createMessage: { success },
      } = useMessage();
      const [register, { reload }] = useTable({
        title: 'openid管理列表',
        api: openidList,
        beforeFetch: (params) => {
          return params;
        },
        afterFetch(T) {
          // for (let key of T) {
          //   key.img = 'https://famon.top/pictures/get_openid.png';
          // }
          return T;
        },
        columns,
        // dataSource,
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
          appendSchemaByField: appendSchemaByField1,
          removeSchemaByFiled: removeSchemaByFiled1,
        },
      ] = useForm();
      const [register3, { openModal: openModal2 }] = useModal();
      const [
        register4,
        {
          getFieldsValue: getFieldsValue2,
          validateFields: validateFields2,
          resetFields: resetFields2,
          appendSchemaByField: appendSchemaByField2,
          removeSchemaByFiled: removeSchemaByFiled2,
        },
      ] = useForm();

      function createAxios(record) {
        return [
          {
            label: '编辑openid',
            onClick: editOpenidMessage.bind(null, record),
            auth: [
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ],
          },
        ];
      }
      async function newAddOpenid() {
        //加个接口,判断是否缴纳保证金
        //判断未缴纳保证金,让其缴纳保证金,后端提供接口
        //判断已缴纳保证金,正常打开弹窗,让其进行绑定
        await openModal1(true);
      }
      async function editOpenidMessage() {
        await openModal2(true);
        const openList = await openidList();
        const data = openList.list;
        n.value = data.length;
        let obj = { openid0: data[0].openid };
        obj.real_name0 = data[0].real_name;
        for (let i = 1; i < n.value; i++) {
          console.log('循环在执行中');
          let open = 'openid' + i;
          let realName = 'real_name' + i;
          appendSchemaByField2(
            {
              field: `real_name${i}`,
              component: 'Input',
              label: '真实姓名',
              colProps: {
                span: 24,
              },
              required: true,
            },
            '',
          );
          appendSchemaByField2(
            {
              field: `openid${i}`,
              component: 'Input',
              label: 'openid',
              colProps: {
                span: 16,
              },
              required: true,
            },
            '',
          );
          appendSchemaByField2(
            {
              field: `${i}`,
              component: 'Input',
              label: ' ',
              colProps: {
                span: 8,
              },
              slot: 'add1',
            },
            '',
          );
          obj[open] = data[i].openid;
          obj[realName] = data[i].real_name;
        }
        setTimeout(() => {
          formModel.value = obj;
        }, 0);
      }

      async function addOpenidOk() {
        //校验是否满足表单规则
        await validateFields1();
        //获取表单数据
        const formData = getFieldsValue1();
        const openidList = [];
        // for (let key in formData) {
        //   if (key.includes('openid')) {
        //     let obj = {};
        //     obj.openid = formData[key];
        //     obj.real_name = formData.real_name;
        //     openidList.push(obj);
        //   }
        // }

        for (let i = 0; i < n.value; i++) {
          let real_name = 'real_name' + i;
          let openid = 'openid' + i;
          let obj = {};
          obj.openid = formData[openid] || '';
          obj.real_name = formData[real_name] || '';
          openidList.push(obj);
        }

        await editOpenid({
          openids: openidList,
        });
        success('绑定openid成功');
        resetFields1();
        for (let i = 1; i < n.value; i++) {
          removeSchemaByFiled1([`real_name${i}`, `openid${i}`, `${i}`]);
        }
        n.value = 1;
        reload();
        openModal1(false);
      }
      function cancelOpenidOk() {
        for (let i = 1; i < n.value; i++) {
          removeSchemaByFiled1([`real_name${i}`, `openid${i}`, `${i}`]);
        }
        n.value = 1;
        resetFields1();
      }

      function canceleditOpenidOk() {
        for (let i = 1; i < n.value; i++) {
          removeSchemaByFiled2([`real_name${i}`, `openid${i}`, `${i}`]);
        }
        n.value = 1;
        resetFields2();
      }
      async function editOpenidOk() {
        //校验是否满足表单规则

        await validateFields2();
        //获取表单数据
        // console.log(schemas1);
        const formData = getFieldsValue2();
        const openidList = [];
        for (let i = 0; i < n.value; i++) {
          let real_name = 'real_name' + i;
          let openid = 'openid' + i;
          let obj = {};
          obj.openid = formData[openid];
          obj.real_name = formData[real_name];
          openidList.push(obj);
        }
        await editOpenid({
          openids: openidList,
        });
        success('修改openid成功');
        resetFields2();
        for (let i = 1; i < n.value; i++) {
          removeSchemaByFiled2([`real_name${i}`, `openid${i}`, `${i}`]);
        }
        reload();
        openModal2(false);
      }

      function add() {
        appendSchemaByField1(
          {
            field: `real_name${n.value}`,
            component: 'Input',
            label: '真实姓名',
            colProps: {
              span: 24,
            },
            required: true,
          },
          '',
        );
        appendSchemaByField1(
          {
            field: `openid${n.value}`,
            component: 'Input',
            label: 'openid',
            colProps: {
              span: 16,
            },
            required: true,
          },
          '',
        );
        appendSchemaByField1(
          {
            field: `${n.value}`,
            component: 'Input',
            label: ' ',
            colProps: {
              span: 8,
            },
            slot: 'add',
          },
          '',
        );
        n.value++;
      }

      function del(field) {
        removeSchemaByFiled1([`real_name${field}`, `openid${field}`, `${field}`]);
        n.value--;
      }

      function add1() {
        appendSchemaByField2(
          {
            field: `real_name${n.value}`,
            component: 'Input',
            label: '真实姓名',
            colProps: {
              span: 24,
            },
            required: true,
          },
          '',
        );
        appendSchemaByField2(
          {
            field: `openid${n.value}`,
            component: 'Input',
            label: 'openid',
            colProps: {
              span: 16,
            },
            required: true,
          },
          '',
        );
        appendSchemaByField2(
          {
            field: `${n.value}`,
            component: 'Input',
            label: ' ',
            colProps: {
              span: 8,
            },
            slot: 'add1',
          },
          '',
        );
        n.value++;
      }

      function del1(field) {
        removeSchemaByFiled2([`real_name${field}`, `openid${field}`, `${field}`]);
        n.value--;
      }

      return {
        register,
        register1,
        register2,
        register3,
        register4,
        schemas,
        schemas1,
        createAxios,
        addOpenidOk,
        cancelOpenidOk,
        editOpenidOk,
        newAddOpenid,
        formModel,
        hasPermission,
        RoleEnum,
        add,
        del,
        add1,
        del1,
        canceleditOpenidOk,
        image,
      };
    },
  });
</script>

<style>
  .tt {
    margin-left: 100px;
    width: 37.62px;
  }
  .ttt {
    margin-left: 120px;
    width: 37.62px;
  }
  .addopenid {
    margin-right: 30px;
  }
</style>
