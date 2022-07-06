<template>
  <div class="m-4 order-list bg-hex-f5f5f5">
    <ListContent />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ListContent from './component/content.vue';
  export default defineComponent({
    name: 'PlaceIndex',
    components: {
      ListContent,
    },
  });
</script>
