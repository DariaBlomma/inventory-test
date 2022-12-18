<script setup lang="ts">
  import LeftSidebar from './components/LeftSidebar.vue';
  import BottomSidebar from './components/BottomSidebar.vue';
  import SlotsFeild from './components/SlotsField.vue';
  import InventoryDetailModal from './components/InventoryDetailModal.vue';
</script>

<template>
  <div class="game-area">
    <LeftSidebar />
    <div class="slots">
      <SlotsFeild />
      <InventoryDetailModal />
    </div>
    <BottomSidebar />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles';

.game-area {
  padding: 32px;
  display: grid;
  grid-template-areas: 
    'leftSidebar slots' 
    'bottomSidebar bottomSidebar';
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 500px 72px;
  grid-gap: 24px;
}

.slots {
  grid-area: slots;
  position: relative;
}

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
