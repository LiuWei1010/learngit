<template>
  <div>
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction :actions="createAxios(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="审核申请"
      @register="register1"
      @Ok="agreeOk"
    >
      <h1>确定通过这笔申请吗?</h1>
    </BasicModal>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      :showCancelBtn="false"
      :showOkBtn="false"
      title="提现详情"
      @register="register3"
      okText="保存"
      @cancel="cancelBtn"
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

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, getFormConfig, schemas1 } from './data';
  import { drawList, approveDraw, drawDetail } from '/@/api/examine';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { useForm, BasicForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { businessList } from '/@/api/business';

  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicTable,
      BasicModal,
      TableAction,
      BasicForm,
    },
    setup() {
      let n = 1;
      const { hasPermission } = usePermission();
      const {
        createMessage: { success },
      } = useMessage();
      const formModel = ref({});
      let obj = {};
      const [register, { reload }] = useTable({
        title: '审核管理列表',
        api: drawList,
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
      const [register2] = useForm();

      const [register3, { openModal: openModal2 }] = useModal();
      const [
        register4,
        { appendSchemaByField: appendSchemaByField2, removeSchemaByFiled: removeSchemaByFiled2 },
      ] = useForm();
      async function reviewApplication(record) {
        await openModal1();
        obj = {
          draw_id: record.id,
        };
      }

      async function machineDetail(record) {
        //在这个里面做列表
        await openModal2();
        const data = await drawDetail({
          draw_id: record.id,
        });
        let formObj = {};
        n = data.list.length;

        const newData = data.list;
        console.log(n);
        console.log(newData);
        for (let i = 1; i < n; i++) {
          appendSchemaByField2(
            {
              label: '商户名称',
              field: 'business_id' + i,
              component: 'ApiSelect',
              componentProps: {
                disabled: true,
                api: businessList,
                params: {
                  page: 1,
                  pageSize: 1000,
                  keyword: '',
                },
                resultField: 'list',
                labelField: 'business_name',
                valueField: 'business_id',
              },
            },
            '',
          );
          appendSchemaByField2(
            {
              label: '提现月份',
              field: 'draw_month' + i,
              component: 'Input',
              componentProps: {
                placeholder: '请输入您的提现月份',
                disabled: true,
              },
            },
            '',
          );
          appendSchemaByField2(
            {
              label: '提现单号',
              field: 'draw_no' + i,
              component: 'Input',
              componentProps: {
                placeholder: '请输入您的提现单号',
                disabled: true,
              },
            },
            '',
          );
          appendSchemaByField2(
            {
              label: 'openid',
              field: 'open_id' + i,
              component: 'Input',
              componentProps: {
                placeholder: '请输入您的openid',
                disabled: true,
              },
            },
            '',
          );
          appendSchemaByField2(
            {
              label: '微信支付单号',
              field: 'payment_no' + i,
              component: 'Input',
              componentProps: {
                placeholder: '请输入您的微信支付单号',
                disabled: true,
              },
            },
            '',
          );
          appendSchemaByField2(
            {
              label: '打款时间',
              field: 'payment_time' + i,
              component: 'Input',
              componentProps: {
                placeholder: '请输入您的打款时间',
                disabled: true,
              },
            },
            '',
          );
          appendSchemaByField2(
            {
              label: '打款金额(元)',
              field: 'real_total' + i,
              component: 'Input',
              componentProps: {
                placeholder: '请输入您的打款金额',
                disabled: true,
              },
            },
            '',
          );
          appendSchemaByField2(
            {
              label: '状态',
              field: 'status' + i,
              component: 'Select',
              componentProps: {
                options: [
                  {
                    label: '正常',
                    value: 1,
                  },
                  {
                    label: '删除',
                    value: -1,
                  },
                ],
                disabled: true,
              },
            },
            '',
          );
          appendSchemaByField2(
            {
              label: '提现记录收入(元)',
              field: 'total' + i,
              component: 'Input',
              componentProps: {
                placeholder: '请输入您的提现记录收入',
                disabled: true,
              },
            },
            '',
          );
        }
        for (let i = 0; i < n; i++) {
          let bus = 'business_id' + i;
          let draw_month = 'draw_month' + i;
          let draw_no = 'draw_no' + i;
          let open_id = 'open_id' + i;
          let payment_no = 'payment_no' + i;
          let payment_time = 'payment_time' + i;
          let real_total = 'real_total' + i;
          let status = 'status' + i;
          let total = 'total' + i;
          formObj[bus] = newData[i].business;
          formObj[draw_month] = newData[i].draw_month;
          formObj[draw_no] = newData[i].draw_no;
          formObj[open_id] = newData[i].open_id;
          formObj[payment_no] = newData[i].payment_no;
          formObj[payment_time] = newData[i].payment_time;
          formObj[real_total] = parseInt(newData[i].real_total) / 100;
          formObj[status] = newData[i].status;
          formObj[total] = parseInt(newData[i].total) / 100;
        }
        // const newData = data.list[0];
        // newData.real_total = parseInt(newData.real_total)/100;
        // newData.total = parseInt(newData.total)/100;
        setTimeout(() => {
          formModel.value = formObj;
        }, 0);
      }
      async function agreeOk() {
        await approveDraw(obj);
        openModal1(false);
        reload();
        success('发起申请成功');
      }
      function createAxios(record) {
        return [
          {
            label: '审核提现申请',
            onClick: reviewApplication.bind(null, record),
            auth: [
              RoleEnum.superMaster,
              RoleEnum.master,
              RoleEnum.firstAgent,
              RoleEnum.secondAgent,
            ],
          },
          {
            label: '提现详情',
            onClick: machineDetail.bind(null, record),
          },
        ];
      }

      function cancelBtn() {
        for (let i = 1; i < n; i++) {
          removeSchemaByFiled2([
            `business_id${i}`,
            `draw_month${i}`,
            `draw_no${i}`,
            `open_id${i}`,
            `payment_no${i}`,
            `payment_time${i}`,
            `real_total${i}`,
            `status${i}`,
            `total${i}`,
          ]);
        }
        n = 1;
      }
      return {
        hasPermission,
        register,
        register1,
        register2,
        register3,
        register4,
        schemas1,
        formModel,
        agreeOk,
        RoleEnum,
        createAxios,
        cancelBtn,
      };
    },
  });
</script>

<style scoped></style>
