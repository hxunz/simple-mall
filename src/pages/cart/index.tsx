import Cart from 'components/cart';
import { useAppDispatch } from 'hooks';
import { useEffect } from 'react';
import { loadCoupons } from 'redux/productsSlice';

const CartPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // fetch coupon list API
    dispatch(loadCoupons());
  }, []);

  return (
    <Cart />
  )
}

export default CartPage;
