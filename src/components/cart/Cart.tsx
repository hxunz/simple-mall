import styled from '@emotion/styled';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useAppSelector } from 'hooks';
import { productItems } from 'productItem';
import { useState } from 'react';
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
      <p>쿠폰 적용</p>
      <FormControl fullWidth>
        <InputLabel>쿠폰</InputLabel>
        <Select
          value={coupons}
          label="coupon"
        >
          {coupons.map(({
            title
          }) => (
            <MenuItem key={title}>{title}</MenuItem>
          ))}
        </Select>
      </FormControl>
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
