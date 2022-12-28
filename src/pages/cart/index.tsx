import { useEffect } from 'react';

import Cart from 'components/cart';
import { useAppDispatch } from 'hooks';
import { loadCoupons } from 'redux/productsSlice';

const CartPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // fetch coupon list API
    dispatch(loadCoupons());
  }, []);

  return (
    <Cart />
  );
};

export default CartPage;
