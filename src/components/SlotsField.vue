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
      >
        <template
          v-for="item in inventoryStore.list"
          :key="item.type"
        >
          <div
            v-if="item.curRow === rowIndex &&
              item.curCol === colIndex"
            @click="inventoryItemClickHandler({ item })"
          >
            <img 
              :src="`/inventoryImages/${item.image}.png`" 
              class="inventory__image"
            >
            <div class="inventory__amount">
              <span class="inventory__amount--text">{{ item.amount }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore, useInventoryStore } from '@/stores';
import type { IInventoryItem } from '@/types';

const rows: number = 5;
const columns: number = 5;
const modalStore = useModalStore();
const inventoryStore = useInventoryStore();

interface IParama {
  item: IInventoryItem,
}

const inventoryItemClickHandler = ({ item } : IParama) => {
  inventoryStore.setClickedItem(item);
  modalStore.open();
}
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
  }
}

.inventory {
  &__amount {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $black_600;
    border-top-left-radius: 6px;


    &--text {
      color: white;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      opacity: 0.4;
    }
  }
}

</style>