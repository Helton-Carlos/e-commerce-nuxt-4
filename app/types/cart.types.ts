import type { Category } from './card.types';

export interface CartItem {
  id?: number;
  title: string;
  price: number;
  unit: number;
  category: Category
  images: string[]
}