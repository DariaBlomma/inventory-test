import { ref } from 'vue'
import { defineStore } from 'pinia';
import type { IInventoryItem } from '@/types';

export const useInventoryStore = defineStore('inventory', () => {
  const clickedItem = ref<IInventoryItem | undefined>(undefined);

  const setClickedItem = (item: IInventoryItem) => {
    clickedItem.value = item;
  };

  return { clickedItem, setClickedItem };
})
