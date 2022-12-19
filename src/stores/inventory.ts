import { ref } from 'vue'
import { defineStore } from 'pinia';
import type { IInventoryItem } from '@/types';

interface IDeleteParams {
  type: string;
  list: 'free' | 'slots',
}

interface IAddParams {
  item: IInventoryItem;
}

interface IDragStart {
  event: DragEvent;
  item: IInventoryItem;
}

export const useInventoryStore = defineStore('inventory', () => {
  //boolean

  const isDragValid = ref(true);

  //lists

  /**
   * Items not in store yet
   */
  const freeList = ref<IInventoryItem[] | []>([
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

  const slotsList = ref<IInventoryItem[] | []>([]);

  //items
  const clickedItem = ref<IInventoryItem | undefined>(undefined);
  const draggedItem = ref<IInventoryItem | undefined>(undefined);

  //other data
  const dragError = ref<string>('');

  const setClickedItem = (item: IInventoryItem) => {
    clickedItem.value = item;
  };

  const decreaseItemAmount = (amount: number) => {
    if (clickedItem.value) {
      clickedItem.value.amount -= amount;
      if (clickedItem.value.amount <= 0) {
        deleteItem({ type: clickedItem.value.type, list: 'slots' });
        clickedItem.value = undefined;   
      }
    }
  };

  const deleteItem = ({type, list }: IDeleteParams) => {
    if (list === 'free') {
      freeList.value = freeList.value.filter(item => item.type !== type);
    } else {
      slotsList.value = slotsList.value.filter(item => item.type !== type);
    }
  };

  const addItem = ({ item }: IAddParams) => {
    slotsList.value.push(item);
  };

  //drag and drop
  const onDragItemStart = ({ event, item }: IDragStart) => {
    if (event === null || event.dataTransfer === null) return;
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    draggedItem.value = item;
    console.log('draggedItem.value: ', draggedItem.value);
  };

  const onDropItem = (event: DragEvent) => {
    console.log('e: ', event);
    if (!isDragValid.value) {
      dragError.value = 'Drag is invalid - the field is already busy';
      console.error('Error in onDrop: drag is invalid!');
      return;
    }
    dragError.value = '';
    if (!draggedItem.value) return;
    const target = event.target;
    if (!event ||
        !event.target ||
        !event.target.dataset) return;

    const dataset = event.target.dataset;
    console.log('dataset: ', dataset);
    const toRowIndex = Number(dataset.rowId);
    const toColId = Number(dataset.colId);
    draggedItem.value.curRow = toRowIndex;
    draggedItem.value.curCol = toColId;
    console.log('toRowIndex: ', toRowIndex);
    deleteItem({ type: draggedItem.value.type, list: 'free' });
    addItem({ item: draggedItem.value });
    console.log('slotsList', slotsList.value)
  };

  const checkDragValidity = () => {

  }

  return {
    isDragValid, 
    dragError,
    freeList,
    slotsList,
    clickedItem, 
    setClickedItem,
    decreaseItemAmount,
    deleteItem, 
    addItem,
    onDragItemStart,
    onDropItem,
  };
})
