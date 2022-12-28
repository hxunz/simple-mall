import { createSlice } from '@reduxjs/toolkit';

import { getCoupons } from 'service/coupons';
import { getProducts } from 'service/products';
import { getPartition } from 'utils/partition';

import { getProductSort } from 'utils/sort';

import { AppDispatch } from './store';

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

export interface Pay {
  availableCoupon?: boolean;
  priceWithQuantity: number;
  item_no: number;
}

export interface productsState {
  products: Product[][];
  cartProducts: number[];
  coupons: Coupon[];
  payList: Pay[];
}

export const initialState: productsState = {
  products: [],
  cartProducts: [],
  coupons: [],
  payList: [],
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
    }),
    addPayList: (state, { payload: newPay }: { payload: Pay }) => ({
      ...state,
      payList: [
        ...state.payList,
        newPay
      ]
    }),
    updatePayList: (state, { payload: newPay }: { payload: Pay }) => ({
      ...state,
      payList: state.payList.map(pay => pay.item_no === newPay.item_no ? newPay : pay)
    }),
    removePayList: (state, { payload: itemNo }) => ({
      ...state,
      payList: [
        ...state.payList.filter((pay) => pay.item_no !== itemNo)
      ]
    }),
    resetPayList: (state) => ({
      ...state,
      payList: []
    }),
  }
});

export const {
  setProducts,
  addCart,
  setCoupons,
  removeCart,
  addPayList,
  updatePayList,
  removePayList,
  resetPayList
} = actions;

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
  };
};

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
  };
};

export default reducer;
