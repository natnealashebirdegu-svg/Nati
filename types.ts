
export interface Product {
  name: string;
  amharicName: string;
  code: string;
}

export interface InventoryItem {
  productCode: string;
  dozen: number;
}

export interface DispatchedItem {
  id: string;
  productCode: string;
  dozen: number;
  dispatchedBy: string;
  date: string; // ISO string
}

export interface RawHide {
  id: string;
  type: string;
  squareFeet: number;
  quantity: number;
  meter: number;
  date: string;
}

export interface PurchasedGood {
  id: string;
  name: string;
  type: string;
  quantity: number;
  date: string;
}

export interface SentMaterial {
    id: string;
    name: string;
    quantity: number;
    roll: number;
    meter: number;
    date: string;
}


export enum View {
  Category1 = 'category1',
  Category2 = 'category2',
  Category3 = 'category3',
  Category4 = 'category4',
  Category5 = 'category5',
  Category6 = 'category6',
  Settings = 'settings',
}

export type Language = 'en' | 'am';
