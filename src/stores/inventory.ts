import { ref } from 'vue'
import { defineStore } from 'pinia';
import type { IInventoryItem } from '@/types';

export const useInventoryStore = defineStore('inventory', () => {
  const list = ref<IInventoryItem[] | undefined>([
    { 
      type: 'green',
      amount: 4,
      curRow: 0,
      curCol: 0,
      image: 'ItemImageGreen'
    },
    { 
      type: 'yellow',
      amount: 2,
      curRow: 0,
      curCol: 1,
      image: 'ItemImageYellow',
    },
    { 
      type: 'blue',
      amount: 3,
      curRow: 0,
      curCol: 2,
      image: 'ItemImageBlue',
    },
  ]);
  const clickedItem = ref<IInventoryItem | undefined>(undefined);

  const setClickedItem = (item: IInventoryItem) => {
    clickedItem.value = item;
  };

  const decreaseItemAmount = (amount: number) => {
    if (clickedItem.value) {
      clickedItem.value.amount -= amount;
      if (clickedItem.value.amount <= 0) {
        deleteItem(clickedItem.value.type);
        clickedItem.value = undefined;   
      }
    }
  };

  const deleteItem = (type: string) => {
    if (!list.value) return;
    const filteredList = list.value.filter(item => item.type !== type);
    list.value = filteredList;
  };

  return { 
    list, 
    clickedItem, 
    setClickedItem,
    decreaseItemAmount,
    deleteItem, 
  };
})
