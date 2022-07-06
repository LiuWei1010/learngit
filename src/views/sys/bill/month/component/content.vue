<template>
  <div>
    <BasicTable @register="register">
      <!-- <template #tableTitle>
        <Button type="primary" preIcon="ant-design:plus-outlined" @click="getRows">申请提现</Button>
      </template> -->
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
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, getFormConfig, schemas, schemas1 } from './data';
  import { monthBill, applyDraw } from '/@/api/bill';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { RoleEnum } from '/@/enums/roleEnum';
  // import { Button } from '/@/components/Button';

  export default defineComponent({
    name: 'ListContent',
    components: {
      BasicTable,
      BasicModal,
      // Button,
    },
    setup() {
      const {
        createMessage: { success },
      } = useMessage();
      const formModel = ref({});
      const [register, { reload, getSelectRows }] = useTable({
        title: '月账单查询列表',
        api: monthBill,
        columns,
        bordered: true,
        immediate: true,
        useSearchForm: true,
        // rowKey: 'business_id',
        formConfig: getFormConfig(),
      });
      const [register1, { openModal: openModal1 }] = useModal();
      const [register2] = useForm();

      async function getRows() {
        await openModal1();
      }
      async function agreeOk() {
        const formData = getSelectRows();
        const dataList = [];
        for (let key of formData) {
          let obj = {};
          obj.business_id = key.business_id;
          obj.month = key.rent_month;
          dataList.push(obj);
        }
        await applyDraw({
          draw_data: dataList,
        });
        openModal1(false);
        reload();
        success('发起申请成功');
      }

      return {
        register,
        register1,
        register2,
        schemas,
        schemas1,
        formModel,
        getRows,
        agreeOk,
        RoleEnum,
      };
    },
  });
</script>

<style scoped></style>
