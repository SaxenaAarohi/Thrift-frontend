export enum FilterType {
  ALL = "All",
  TOPS = "Tops",
  BOTTOMS = "Bottoms",
  OUTERWEAR = "Outerwear",
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  img_url : string
  category: FilterType;
  size: string;
  tags: string[];
    condition:string,
    brand: string
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ThriftItem {
  id: string;
  title: string;
  description: string;
  price: number;
  sold:boolean
  category: string;
  condition: ItemCondition;
  img_url: string;
  status: 'active' | 'sold' | 'draft';
  createdAt: string;
}

export enum ItemCondition {
  NEW = 'Brand New',
  LIKE_NEW = 'Like New',
  GOOD = 'Good',
  FAIR = 'Fair',
  POOR = 'Poor'
}

export type ViewType = 'dashboard' | 'add-item' | 'inventory';

// export interface CartItem {
//   id: string;
//   name?: string;
//   price?: number;
//   quantity: number;
// }

export interface CartStore {
  cart: CartItem[];

  setCart: (newcart: CartItem[]) => void;
  clearcart: () => void;

  addToCart: (item: Omit<CartItem, "quantity">) => CartItem[] | void;
  decrement: (item: CartItem) => CartItem[];
  removeitem: (item: CartItem) => CartItem[];
}
