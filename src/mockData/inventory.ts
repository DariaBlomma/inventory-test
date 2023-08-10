import type { InventoryDetail } from '@/types';

export const defaultFreeList: InventoryDetail[] = [
  {
    type: 'green',
    amount: 4,
    rowId: null,
    colId: null,
    image: 'ItemImageGreen',
    list: 'free',
  },
  {
    type: 'yellow',
    amount: 2,
    rowId: null,
    colId: null,
    image: 'ItemImageYellow',
    list: 'free',
  },
  {
    type: 'blue',
    amount: 3,
    rowId: null,
    colId: null,
    image: 'ItemImageBlue',
    list: 'free',
  },
];
