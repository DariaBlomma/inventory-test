import { LOCAL_STORAGE } from '@/constants';
import type {
  CellParams,
  InventoryDetail,
} from '@/types';


export const LocalStorageHelper = {
  getItem(name: string): string | null {
    return window.localStorage.getItem(name);
  },
  
  setItem(name: string, value: string) {
    window.localStorage.setItem(name, value);
  },
  
  removeItem(name: string) {
    window.localStorage.removeItem(name);
  },
  
  getFreeList(): InventoryDetail[] | undefined {
    const data = this.getItem(LOCAL_STORAGE.FREE_LIST);
    return data ? JSON.parse(data) : undefined;
  },
  
  getSlotsList(): InventoryDetail[] | undefined {
    const data = this.getItem(LOCAL_STORAGE.SLOTS_LIST);
    return data ? JSON.parse(data) : undefined;
  },
  
  getBusyCells(): CellParams[] | undefined {
    const data = this.getItem(LOCAL_STORAGE.BUSY_CELLS);
    return data ? JSON.parse(data) : undefined;
  },
  
  setFreeList(list: InventoryDetail[]) {
    this.setItem(LOCAL_STORAGE.FREE_LIST, JSON.stringify(list));
  },
  
  setSlotsList(list: InventoryDetail[]) {
    this.setItem(LOCAL_STORAGE.SLOTS_LIST, JSON.stringify(list));
  },
  
  setBusyCells(cells: CellParams[]) {
    this.setItem(LOCAL_STORAGE.BUSY_CELLS, JSON.stringify(cells));
  },
  
  removeFreeList() {
    this.removeItem(LOCAL_STORAGE.FREE_LIST);
  },
  
  removeSlotsList() {
    this.removeItem(LOCAL_STORAGE.FREE_LIST);
  },
};
