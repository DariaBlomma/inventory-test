<template>
  <div class="block field">
    <div
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="field__row"
    >
      <div
          v-for="(column, colIndex) in columns"
          :key="colIndex"
          class="field__cell"
          :class="{
          'field__cell--isDraggedOver': 
          inventoryStore.dragOverParams?.colId === colIndex &&
          inventoryStore.dragOverParams?.rowId === rowIndex
        }"
          :data-row-id="rowIndex"
          :data-col-id="colIndex"
          :data-is-busy="false"
          @dragover.prevent="inventoryStore.onDragOverCell"
          @drop="inventoryStore.onDropItem"
      >
        <div
          v-for="item in inventoryStore.slotsList"
          :key="item.type"
        >
          <InventoryItem
            class="item-in-slot"
            v-if="item.curRow === rowIndex &&
              item.curCol === colIndex"
            :inner="{item}"
            @click="inventoryItemClickHandler({ item })"
            draggable="true"
            @dragstart="inventoryStore.onDragItemStart({ event: $event, item })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IInventoryItem} from '@/types';
import InventoryItem from './InventoryItem.vue';
import {useInventoryStore, useModalStore} from '@/stores';

const rows: number = 5;
const columns: number = 5;
const modalStore = useModalStore();
const inventoryStore = useInventoryStore();

interface IParams {
  item: IInventoryItem,
}

const inventoryItemClickHandler = ({item}: IParams) => {
  inventoryStore.setClickedItem(item);
  modalStore.open();
};
</script>

<style scoped lang="scss">
@import '@/styles';

.field {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  width: max-content;
  height: 100%;
  overflow: hidden; //hide corners of cells

  &__row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
  }

  &__cell {
    position: relative;
    min-width: 105px;
    min-height: 98px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
    border: 1px solid $black_600;

    &:hover {
      background-color: $black_700;
    }

    &--isDraggedOver {
      background-color: $black_700;
    }
  }
}

.item-in-slot {
  position: static;
}
</style>