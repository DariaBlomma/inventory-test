/**
 * Indicates, to which list belongs item
 */
export type TListType = 'free' | 'slots';

export interface IInventoryItem {
  type: string,
  amount: number,
  curRow: number | null,
  curCol: number | null,
  image: string,
  list: TListType,
}
