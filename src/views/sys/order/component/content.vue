<template>
  <div>
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '订单详情',
              onClick: handleDetail.bind(null, record),
            },
            {
              label: '退款',
              onClick: handleRefund.bind(null, record),
              auth: [
                RoleEnum.superMaster,
                RoleEnum.master,
                RoleEnum.firstAgent,
                RoleEnum.secondAgent,
              ],
            },
          ]"
        />
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      :showCancelBtn="false"
      :showOkBtn="false"
      title="订单详情"
      @register="register1"
    >
      <BasicForm
        :labelWidth="120"
        :schemas="schemas"
        :model="formModel"
        :showActionButtonGroup="false"
        @register="register2"
      />
    </BasicModal>

    <BasicModal
      v-bind="$attrs"
      :canFullscreen="false"
      title="退款"
      @register="register3"
      okText="确认"
      @ok="handleRefundOk"
    >
      <BasicForm
        :labelWidth="120"
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
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, getFormConfig, schemas, schemas1 } from './data';
  import { getOrderList, getOrderDetail, rentMoneyFund } from '/@/api/order';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { RoleEnum } from '/@/enums/roleEnum';

  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicTable,
      TableAction,
      BasicModal,
      BasicForm,
    },
    setup() {
      const {
        createMessage: { success },
      } = useMessage();
      const formModel = ref({});
      const formModel1 = ref({});
      const [register, { reload }] = useTable({
        title: '订单查询列表',
        api: getOrderList,
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
      const [register4, { getFieldsValue, validateFields }] = useForm();
      async function handleDetail(record) {
        const params = {};
        params.rent_no = record.rent_no;
        params.rent_detail_id = record.rent_detail_id;
        //  const data = await getOrderDetail();
        //  console.log(data)
        const result = await getOrderDetail(params);
        const formData = result.data;
        await openModal1(true);
        formModel.value = {
          brand_id: formData.brand_id,
          brand_name: formData.brand_name,
          business_id: formData.business_id,
          content: formData.content,
          expiration_date: formData.expiration_date,
          expiration_date_unit: formData.expiration_date_unit,
          is_expiration_date: formData.is_expiration_date,
          is_pay: formData.is_pay,
          machine_no: formData.machine_no,
          original_price: formData.original_price,
          phone: formData.phone,
          place_id: formData.place_id,
          place_name: formData.place_name,
          price: formData.price,
          production_id: formData.production_id,
          production_name: formData.production_name,
          production_type_id: formData.production_type_id,
          production_type_name: formData.production_type_name,
          refund_count: formData.refund_count,
          refund_total: formData.refund_total,
          rent_count: formData.rent_count,
          rent_detail_id: formData.rent_detail_id,
          rent_no: formData.rent_no,
          status: formData.status,
          summary: formData.summary,
          tags: formData.tags,
          title: formData.title,
          total: formData.total,
          user_id: formData.user_id,
          weight: formData.weight,
          weight_error: formData.weight_error,
          weight_unit: formData.weight_unit,
        };
      }
      async function handleRefund(record) {
        await openModal2(true);
        formModel1.value = {
          rent_no: record.rent_no,
          rent_detail_id: record.rent_detail_id,
          refund_count: record.rent_count,
        };
      }
      async function handleRefundOk() {
        await validateFields();
        const params = getFieldsValue();
        (params.action_pwd = 'xxzn666'), await rentMoneyFund(params);
        success('退款成功');
        reload();
        openModal2(false);
      }
      return {
        register,
        register1,
        register2,
        register3,
        register4,
        handleDetail,
        handleRefund,
        handleRefundOk,
        schemas,
        schemas1,
        formModel,
        formModel1,
        RoleEnum,
      };
    },
  });
</script>

<style></style>
