import type { UnwrapRef } from 'vue';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import type {
  CellParams,
  DragOverDataset,
  InventoryDetail,
  ListType,
} from '@/types';
import { LocalStorageHelper } from '@/helpers';
import { defaultFreeList } from '@/mockData';
import { useDragAndDrop } from '@/composables';

interface CellDataset extends DragOverDataset {
  rowId: string,
  colId: string,
}

interface DragStartParams {
  event: DragEvent,
  item: UnwrapRef<InventoryDetail>,
}

export const useInventoryStore = defineStore('inventory', () => {
  const busyCells = ref<CellParams[]>([]);
  const freeList = ref<InventoryDetail[]>(defaultFreeList);
  const slotsList = ref<InventoryDetail[]>([]);
  const clickedItem = ref<InventoryDetail | undefined>(undefined);
  
  const moveItem = () => {
    if (!dragAndDrop.draggedItem.value) return;
    const type = dragAndDrop.draggedItem.value.type;
    const list = dragAndDrop.draggedItem.value.list;
    deleteItem(type, list);
    addItem(dragAndDrop.draggedItem.value);
    
    dragAndDrop.draggedItem.value.list = 'slots';
  };
  
  function parseDragDataset(dataset: CellDataset): CellParams {
    const toRowIndex = Number(dataset.rowId);
    const toColId = Number(dataset.colId);
    return {
      colId: toColId,
      rowId: toRowIndex,
    };
  }
  
  const dragAndDrop = useDragAndDrop<InventoryDetail, CellDataset, CellParams>(parseDragDataset, moveItem);
  
  const markCellsBusy = () => {
    const elems = document.querySelectorAll('.field__cell');
    
    const indexedCells: { [key: string]: HTMLElement } | {} = {};
    elems.forEach(item => {
      const dataset = item.dataset as CellDataset;
      const cellId = `${dataset.rowId}-${dataset.colId}`;
      indexedCells[cellId] = item;
    });
    
    busyCells.value.forEach((busyCell) => {
      const busyCellId = `${busyCell.rowId}-${busyCell.colId}`;
      (indexedCells[busyCellId].dataset as CellDataset).isBusy = 'true';
    });
  };
  
  const addToBusyCells = (item: UnwrapRef<InventoryDetail>) => {
    if (item.rowId === null || item.colId === null) {
      throw Error('addToBusyCells: unexpected null in coords');
      return;
    }
    busyCells.value.push({
      colId: item.colId,
      rowId: item.rowId,
    });
  };
  
  const removeFromBusyCells = (item: UnwrapRef<InventoryDetail>) => {
    busyCells.value = busyCells.value.filter((cell) => {
      return cell.rowId !== item.rowId && cell.colId !== item.colId;
    });
  };
  
  const getLists = () => {
    const savedFreeList = LocalStorageHelper.getFreeList();
    const savedSlotsList = LocalStorageHelper.getSlotsList();
    const savedBusyCells = LocalStorageHelper.getBusyCells();
    //* first load of the app
    if (!savedFreeList || !savedSlotsList || !savedBusyCells) return;
    freeList.value = savedFreeList;
    slotsList.value = savedSlotsList;
    busyCells.value = savedBusyCells;
  };
  
  const setClickedItem = (item: InventoryDetail) => {
    clickedItem.value = item;
  };
  
  const decreaseItemAmount = (amount: number) => {
    if (clickedItem.value) {
      clickedItem.value.amount -= amount;
      if (clickedItem.value.amount <= 0) {
        deleteItem(clickedItem.value.type, 'slots');
        clickedItem.value = undefined;
      }
      LocalStorageHelper.setSlotsList(slotsList.value);
    }
  };
  
  const deleteItem = (type: string, list: ListType) => {
    if (list === 'free') {
      freeList.value = freeList.value.filter(item => item.type !== type);
    } else {
      slotsList.value = slotsList.value.filter(item => item.type !== type);
    }
  };
  
  const addItem = (item: InventoryDetail) => {
    slotsList.value.push(item);
  };
  
  const onDragItemStart = ({event, item}: DragStartParams) => {
    dragAndDrop.onDragStart({event, item, fromElemSelector: '.field__cell'});
  };
  
  const onDropItem = (event: DragEvent) => {
    const draggedItem = dragAndDrop.draggedItem.value;
    if (!draggedItem) return;
    removeFromBusyCells(draggedItem);
    dragAndDrop.onDrop(event);
    addToBusyCells(draggedItem);
    saveSessionData();
  };
  
  /**
   * To indicate with styles the cell
   */
  const onDragOverCell = (event: DragEvent) => {
    dragAndDrop.onDragOver(event);
  };
  
  const saveSessionData = () => {
    LocalStorageHelper.setFreeList(freeList.value);
    LocalStorageHelper.setSlotsList(slotsList.value);
    LocalStorageHelper.setBusyCells(busyCells.value);
  };
  
  return {
    dragError: dragAndDrop.dragError,
    freeList,
    slotsList,
    clickedItem,
    draggedOverCell: dragAndDrop.draggedOverParams,
    getLists,
    setClickedItem,
    decreaseItemAmount,
    deleteItem,
    addItem,
    onDragItemStart,
    onDropItem,
    onDragOverCell,
    markCellsBusy,
  };
});
