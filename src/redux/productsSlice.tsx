import { createSlice } from '@reduxjs/toolkit';
import { getPartition } from 'utils/partition';
import { getProducts } from 'service/products';
import { AppDispatch } from './store';
import { getProductSort } from 'utils/sort';

export interface Pagination {
  totalPage: number,
  page: number,
  perPage: number,
}

export interface Product {
  item_no: number;
  item_name: string;
  detail_image_url: string;
  price: number;
  score: number;
}

export interface productsState {
  products: Product[][];
}

export const initialState: productsState = {
  products: []
};

const { actions, reducer } = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, { payload: products }) => ({
      ...state,
      products
    })
  }
})

export const { setProducts } = actions;

export function loadProducts() {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await getProducts();

      if (data) {
        const sortData = getProductSort(data);
        const partitionData = getPartition(sortData);

        dispatch(setProducts(partitionData));
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default reducer;
