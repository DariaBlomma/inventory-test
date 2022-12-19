<template>
  <div class="list">
    <InventoryItem 
      v-for="item in inventoryStore.freeList"
      :key="item.type"
      class="list__item"
      :inner="{item}"
      draggable="true"
      @dragstart="inventoryStore.onDragItemStart({ event: $event, item })"
    />
  </div>
</template>

<script setup lang="ts">
import { useInventoryStore } from '@/stores';
import InventoryItem from './InventoryItem.vue';

const inventoryStore = useInventoryStore();
</script>

<style scoped lang="scss">
.list {
  display: flex;
  gap: 15px;
  grid-area: freeList;

  &__item {
    height: min-content;
  }
}
</style>