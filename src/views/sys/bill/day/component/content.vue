<template>
  <div>
    <BasicTable @register="register">
      <template #tableTitle>
        <Button type="primary" preIcon="ant-design:plus-outlined" @click="getRows">申请提现</Button>
      </template>
      <template #toolbar>
        <span class="money">可提现金额(元):{{ money }}</span>
      </template>
      <template #action="{ record }">
        <TableAction :actions="createAxios(record)" />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="申请提现"
      @register="register1"
      @Ok="agreeOk"
    >
      <h1>确定发起提现申请吗?</h1>
    </BasicModal>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      :showCancelBtn="false"
      title="日账单详情"
      @register="register2"
    >
      <BasicForm
        :labelWidth="120"
        :schemas="schemas1"
        :model="formModel"
        :showActionButtonGroup="false"
        @register="register3"
      />
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, getFormConfig, schemas1 } from './data';
  import { dayBill, dayBillDetail, applyDraw, allDrawMoney } from '/@/api/bill';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { useForm, BasicForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { Button } from '/@/components/Button';

  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicTable,
      BasicModal,
      Button,
      TableAction,
      BasicForm,
    },
    setup() {
      let money = ref(0);
      // allDrawMoney()
      //   .then((value) => {
      //     money.value = parseInt(value.all_draw_money) / 100;
      //     return money;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      const {
        createMessage: { success, error },
      } = useMessage();
      const formModel = ref({});
      const [register, { reload, getSelectRows, clearSelectedRowKeys }] = useTable({
        title: '日账单查询列表',
        api: dayBill,
        columns,
        bordered: true,
        immediate: true,
        useSearchForm: true,
        // rowKey: 'business_id',
        rowSelection: {
          type: 'checkbox',
          getCheckboxProps(record: Recordable) {
            // Demo: 第一行（id为0）的选择框禁用
            if (record.draw_status === -2) {
              return { disabled: false };
            } else {
              return { disabled: true };
            }
          },
        },
        formConfig: getFormConfig(),
        actionColumn: {
          width: 250,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        afterFetch(T) {
          //  console.log("查询参数被触发");
          allDrawMoney()
            .then((value) => {
              money.value = parseInt(value.all_draw_money) / 100;
              return money;
            })
            .catch((error) => {
              console.log(error);
            });
          return T;
        },
      });
      const [register1, { openModal: openModal1 }] = useModal();
      const [register2, { openModal: openModal2 }] = useModal();
      const [register3] = useForm();

      async function getRows() {
        await openModal1();
      }
      async function agreeOk() {
        const formData = getSelectRows();
        if (formData.length === 0) {
          error('还未选择提现数据');
        } else {
          const dataList = [];
          for (let key of formData) {
            let obj = {};
            obj.bill_date = key.bill_date;
            dataList.push(obj);
          }
          await applyDraw({
            draw_data: dataList,
          });
          openModal1(false);
          reload();
          success('发起申请成功');
          clearSelectedRowKeys();
        }
      }

      function createAxios(record) {
        return [
          {
            label: '日账单详情',
            onClick: dayBillDetailMessage.bind(null, record),
          },
        ];
      }

      async function dayBillDetailMessage(record) {
        await openModal2(true);
        console.log(record.bill_date);
        const data = await dayBillDetail({
          bill_date: record.bill_date,
        });
        const newData = data.list[0];
        newData.total = parseInt(newData.total) / 100;
        formModel.value = newData;
      }
      return {
        register,
        register1,
        register2,
        register3,
        schemas1,
        formModel,
        getRows,
        agreeOk,
        RoleEnum,
        createAxios,
        money,
      };
    },
  });
</script>

<style scoped>
  .money {
    font-size: 20px;
    color: #eb2403;
  }
</style>
