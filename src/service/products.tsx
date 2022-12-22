import { productItems } from 'productItem';
import { Product } from 'redux/productsSlice';

export const getProducts = async () => {
  try {
    return new Promise<Product[]>((resolve) => resolve(productItems));
  } catch (error) {
    console.error(error);
  }
};