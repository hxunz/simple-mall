import { Product } from 'redux/productsSlice';

export const getProductSort = (items: Product[]) =>
  items.sort((a, b) => a.score - b.score);
