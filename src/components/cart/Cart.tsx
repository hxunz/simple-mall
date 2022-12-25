import styled from '@emotion/styled';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks';
import { productItems } from 'productItem';
import { useState } from 'react';
import { loadCoupons } from 'redux/productsSlice';
import CartItem from './cartItem';

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const { cartProducts, coupons } = useAppSelector(store => store.products);

  const cartList = productItems.filter(product => cartProducts.includes(product.item_no));

  return (
    <>
      <p>cart</p>
      <Wrapper>
        {cartList.map(({
          item_no,
          item_name,
          detail_image_url,
          price
        }) => (
          <CartItem
            key={item_no}
            item_name={item_name}
            detail_image_url={detail_image_url}
            price={price}
            setTotalPrice={setTotalPrice}
          />
        ))}
      </Wrapper>
      <p>총 결제 금액</p>
      <p>{totalPrice}</p>
    </>
  )
}

const Wrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  min-height: 30rem;
`;



export default Cart;
