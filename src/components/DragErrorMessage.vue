<template>
  <span class="msg">{{ inventoryStore.dragError }}</span>
</template>

<script setup lang="ts">
import { useInventoryStore } from '@/stores';
const inventoryStore = useInventoryStore();

</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.msg {
  color: $red;
  grid-area: error;
}
</style>