<template>
  <div>
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction :actions="createActions(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="编辑机柜"
      @register="register1"
      okText="保存"
      @ok="handleOk"
    >
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :model="formModel"
        :showActionButtonGroup="false"
        @register="register2"
      />
    </BasicModal>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="更改机器状态"
      @register="register3"
      okText="保存"
      @ok="handleMachineOk"
    >
      <BasicForm
        :labelWidth="100"
        :schemas="schemas1"
        :model="formModel1"
        :showActionButtonGroup="false"
        @register="register4"
      />
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { dataSource, columns, getFormConfig, schemas, schemas1 } from './data';
  // import { getMachineList } from '/@/api/machine';
  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicForm,
      BasicTable,
      TableAction,
      BasicModal,
    },
    setup() {
      const {
        createMessage: { success, error },
      } = useMessage();
      const formModel = ref({});
      const formModel1 = ref({});
      const [register, { reload }] = useTable({
        title: '设备初始化列表',
        // api: getMachineList,
        dataSource,
        columns,
        bordered: true,
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
      // updateSchema  之后查询请求使用,先注销
      const [register2, { getFieldsValue: getFieldsValue1 }] = useForm();

      const [register3, { openModal: openModal2 }] = useModal();
      const [register4, {}] = useForm();
      function createActions(record) {
        return [
          {
            label: '编辑机柜',
            onClick: EditMachine.bind(null, record),
          },
          {
            label: '更改机器状态',
            onClick: EditMachineStatus.bind(null, record),
          },
        ];
      }
      async function EditMachine(record) {
        /**
         * 这边先写死,等后端查询接口写完后,通过record.machine_mac查询展示数据,赋值给formModel,
         * openModel是一个异步加载,会先去执行openModel之后的代码,需要使用await使之变成同步执行方式
         */
        await openModal1(true);
        //后期给了数据再给
        // updateSchema({
        //    field: "short_address",

        //   });
        formModel.value = {
          machine_mac: record.machine_mac,
          machine_afrno: record.machine_no,
          short_address: record.short_address,
          address: record.address,
        };
      }
      async function EditMachineStatus(record) {
        /**
         * 这边先写死,等后端查询接口写完后,通过record.machine_mac查询展示数据,赋值给formModel
         */
        await openModal2(true);
        formModel1.value = {
          machine_mac: record.machine_mac,
          status: record.status,
        };
      }
      async function handleOk() {
        /**
         * 通过getFieldsValue()获取表单值,筛选后传给后端，等后端写完修改机柜接口,调用后根据返回结果判断,
         * 修改成功后,success返回修改成功,刷新表格
         */
        const formData = getFieldsValue1();
        if (!formData.machine_afrno) {
          error('机器号不能为空,请重新输入');
          return;
        }
        //发送请求验证判断
        success('修改成功');
        reload();
        await openModal1(false);
      }
      async function handleMachineOk() {
        /**
         * 通过getFieldsValue()获取表单值,筛选后传给后端，等后端写完修改机柜接口,调用后根据返回结果判断,
         * 修改成功后,success返回修改成功,刷新表格
         */
        //发送请求验证判断
        success('修改成功');
        reload();
        openModal2(false);
      }

      return {
        register,
        register1,
        register2,
        register3,
        register4,
        createActions,
        schemas,
        handleOk,
        handleMachineOk,
        formModel,
        formModel1,
        schemas1,
      };
    },
  });
</script>
