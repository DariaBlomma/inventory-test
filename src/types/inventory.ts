/**
 * Indicates, to which list belongs item
 */
export type ListType = 'free' | 'slots';

export interface InventoryDetail {
  type: string,
  amount: number,
  rowId: number | null,
  colId: number | null,
  image: string,
  list: ListType,
}

export interface CellParams {
  colId: number;
  rowId: number;
}
