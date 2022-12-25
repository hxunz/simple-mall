import { coupons } from 'coupons';
import { Coupon } from 'redux/productsSlice';

export const getCoupons = async () => {
  try {
    return new Promise<Coupon[]>((resolve) => resolve(coupons));
  } catch (error) {
    console.error(error);
  }
};
