/**
 * Indicates, to which list belongs item
 */
export type ListType = 'free' | 'slots';

export interface InventoryDetail {
  type: string,
  amount: number,
  curRow: number | null,
  curCol: number | null,
  image: string,
  list: ListType,
}
