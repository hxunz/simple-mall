import { createSlice } from '@reduxjs/toolkit';
import { getPartition } from 'utils/partition';
import { getProducts } from 'service/products';
import { AppDispatch } from './store';
import { getProductSort } from 'utils/sort';
import { getCoupons } from 'service/coupons';

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
  availableCoupon?: boolean;
}

export interface Coupon {
  type: string;
  title: string;
  discountRate?: number;
  discountAmount?: number;
}

export interface productsState {
  products: Product[][];
  cartProducts: number[];
  coupons: Coupon[];
}

export const initialState: productsState = {
  products: [],
  cartProducts: [],
  coupons: [],
};

const { actions, reducer } = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, { payload: products }) => ({
      ...state,
      products
    }),
    addCart: (state, { payload: newCartProduct }) => ({
      ...state,
      cartProducts: [
        ...state.cartProducts,
        newCartProduct
      ]
    }),
    setCoupons: (state, { payload: coupons }) => ({
      ...state,
      coupons
    }),
    removeCart: (state, action) => ({
      ...state,
      cartProducts: [
        ...state.cartProducts.filter((it) => it !== action.payload)
      ]
    })
  }
})

export const { setProducts, addCart, setCoupons, removeCart } = actions;

export const loadProducts = () => {
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

export const loadCoupons = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await getCoupons();

      if (data) {
        dispatch(setCoupons(data));
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default reducer;
