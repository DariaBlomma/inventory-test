import { ref } from 'vue'
import { defineStore } from 'pinia';
import type { IInventoryItem, TListType } from '@/types';
import { LocalStorageHelper} from '@/helpers';

interface IDeleteParams {
  type: string;
  list: TListType,
}

interface IAddParams {
  item: IInventoryItem;
}

interface IDragStart {
  event: DragEvent;
  item: IInventoryItem;
}

interface IDragOverParams {
  colId: number;
  rowId: number;
}

export const useInventoryStore = defineStore('inventory', () => {
  //boolean

  const isDragValid = ref(true);

  //lists

  /**
   * Items not in store yet
   */

  const defaultFreeList: IInventoryItem[] = [
    { 
      type: 'green',
      amount: 4,
      curRow: null,
      curCol: null,
      image: 'ItemImageGreen',
      list: 'free',
    },
    { 
      type: 'yellow',
      amount: 2,
      curRow: null,
      curCol: null,
      image: 'ItemImageYellow',
      list: 'free',
    },
    { 
      type: 'blue',
      amount: 3,
      curRow: null,
      curCol: null,
      image: 'ItemImageBlue',
      list: 'free',
    },
  ];

  const freeList = ref<IInventoryItem[]>(defaultFreeList);

  const slotsList = ref<IInventoryItem[]>([]);

  //items
  const clickedItem = ref<IInventoryItem | undefined>(undefined);
  const draggedItem = ref<IInventoryItem | undefined>(undefined);

  //other data
  const dragError = ref<string>('');
  const dragOverParams = ref<IDragOverParams | undefined>(undefined);
  const draggedFromElem = ref<HTMLDivElement | undefined>(undefined);

  const getLists = () => {
    const savedFreeList = LocalStorageHelper.getFreeList();
    const savedSlotsList = LocalStorageHelper.getSlotsList();
    //* first load of the app
    if (!savedFreeList || !savedSlotsList) return;
    freeList.value = savedFreeList;
    slotsList.value = savedSlotsList;
  };

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
      LocalStorageHelper.setSlotsList(slotsList.value);
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
    const target = getElemFromEvent(event);
    if (!target) return;
    draggedFromElem.value = target;
  };

  const onDropItem = (event: DragEvent) => {
    dragOverParams.value = undefined;

    const isValid = checkIsDragValid(event);
    if (!isValid) return;

    if (!draggedItem.value) return;
    const params = getDataFromEvent(event);
    if (!params) return;

    const { colId, rowId } = params;
    draggedItem.value.curRow = rowId;
    draggedItem.value.curCol = colId;
    deleteItem({ type: draggedItem.value.type, list: draggedItem.value.list });
    addItem({ item: draggedItem.value });

    draggedItem.value.list = 'slots';

    const target = getElemFromEvent(event);
    if (!target) return;
    target.dataset.isBusy = 'true';

    draggedItem.value = undefined;

    if (draggedFromElem.value) {
      // * clear previous place, mark as free
      draggedFromElem.value.dataset.isBusy = 'false';
    }

    LocalStorageHelper.setFreeList(freeList.value);
    LocalStorageHelper.setSlotsList(slotsList.value);
  };

  /** 
   * To indicate with styles the cell
  */
  const onDragOverCell = (event: DragEvent) => {
    const params = getDataFromEvent(event);
    if (!params) return;

    dragOverParams.value = params;
  };

  /**
   * Get field_cell's row and column properties
   * @param event 
   * @returns 
   */
  const getDataFromEvent = (event: DragEvent) : IDragOverParams | void => {
    const target = getElemFromEvent(event);
    if (!target) return;

    const dataset = target.dataset;
    const toRowIndex = Number(dataset.rowId);
    const toColId = Number(dataset.colId);
    return {
      colId: toColId,
      rowId: toRowIndex,
    };
  }

  /** 
   * Check if the place is already busy or not
  */
  const checkIsDragValid = (event: DragEvent) : boolean => {
    const target = getElemFromEvent(event);
    if (!target) return false;

    const condition = target.dataset.isBusy === 'true';
    if (condition) {
      draggedItem.value = undefined;
      isDragValid.value = false;
      dragError.value = 'Drag is invalid - the field is already busy';
      console.error('Error in onDrop: drag is invalid!');
      return false;
    }

    isDragValid.value = true;
    dragError.value = '';

    return true;
  };

  /**
   * Get field__cell from event.target
   * @param event 
   * @returns 
   */
  const getElemFromEvent = (event: DragEvent) : HTMLDivElement | void => {
    //field cells always have dataset with their coords
    if (!event ||
      !event.target
    ) return;
    const target = (event.target as HTMLElement).closest('.field__cell');
    if (!target || !(target as HTMLDivElement).dataset) return;
    return target as HTMLDivElement;
  }

  return {
    isDragValid, 
    dragError,
    freeList,
    slotsList,
    clickedItem, 
    dragOverParams,
    getLists,
    setClickedItem,
    decreaseItemAmount,
    deleteItem, 
    addItem,
    onDragItemStart,
    onDropItem,
    onDragOverCell,
  };
})
