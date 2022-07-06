<template>
  <div class="md:flex">
    <template
      class="py-4 px-4 flex justify-center"
      v-for="(item, index) in growCardList"
      :key="item.title"
    >
      <Card
        size="default"
        :loading="loading"
        class="md:w-1/4 w-full !md:mt-0 !mt-4 blue"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :style="{ backgroundColor: item.color }"
        title="机器信息"
      >
        <div class="py-4 px-4 flex justify-center" :style="{ fontSize: '20px' }">
          <span>{{ item.title }}</span>
        </div>
        <div class="py-4 px-4 flex justify-center">
          <CountTo prefix="$" :startVal="1" :endVal="item.value" class="text-2xl" />
        </div>

        <div class="p-2 px-4 flex justify-center">
          <span class="distance">{{ item.content }}:</span>
          <span>{{ item.count }}笔</span>
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Card } from 'ant-design-vue';
  import { growCardList } from '../data';

  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
<style scoped type="less">
  .distance {
    margin-right: 20px;
  }
</style>
