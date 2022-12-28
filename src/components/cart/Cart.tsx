import { useState } from 'react';

import styled from '@emotion/styled';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import { useAppSelector } from 'hooks';
import { productItems } from 'productItem';

import CartItem from './cartItem';

const Cart = () => {
  const [couponTitle, setCouponTitle] = useState('');

  const { cartProducts, coupons, payList } = useAppSelector(store => store.products);

  const cartList = productItems.filter(product => cartProducts.includes(product.item_no));

  const selectCoupon = coupons.find(coupon => coupon.title === couponTitle);

  const totalPriceNoCoupon = payList.reduce((acc, cur) => {
    if (cur.availableCoupon === false) {
      return acc + cur.priceWithQuantity;
    }
    return acc;
  }, 0);

  const totalPriceWithCoupon = payList.reduce((acc, cur) => {
    if (cur.availableCoupon !== false) {
      return acc + cur.priceWithQuantity;
    }
    return acc;
  }, 0);

  const totalPrice = () => {
    if (totalPriceWithCoupon !== 0) {
      if (selectCoupon?.discountAmount) {
        if (totalPriceWithCoupon < selectCoupon.discountAmount) {
          return 0;
        }
        return totalPriceWithCoupon - selectCoupon.discountAmount;
      }
      if (selectCoupon?.discountRate) {
        return Math.floor(totalPriceWithCoupon - (totalPriceWithCoupon * selectCoupon.discountRate / 100));
      }
    }
    return totalPriceWithCoupon;
  };

  const handleChangeCoupon = (e: SelectChangeEvent<string>) => {
    setCouponTitle(e.target.value as string);
  };

  return (
    <>
      <TableContainer>
        <CustomTable>
          <CustomTableHead>
            <TableRow>
              <CustomTableCell />
              <CustomTableCell>상품 정보</CustomTableCell>
              <CustomTableCell>수량</CustomTableCell>
              <CustomTableCell>주문 금액</CustomTableCell>
            </TableRow>
          </CustomTableHead>
          <TableBody>
            {cartList.map(({
              item_no,
              item_name,
              detail_image_url,
              price,
              availableCoupon
            }) => (
              <CartItem
                key={item_no}
                item_name={item_name}
                detail_image_url={detail_image_url}
                price={price}
                availableCoupon={availableCoupon}
                item_no={item_no}
              />
            ))}
          </TableBody>
        </CustomTable>
      </TableContainer>
      <p>쿠폰 적용</p>
      <FormControl fullWidth>
        <InputLabel>쿠폰</InputLabel>
        <Select
          value={couponTitle}
          onChange={handleChangeCoupon}
        >
          <MenuItem value='선택 안함'>선택 안함</MenuItem>
          {coupons.map(({
            title
          }) => (
            <MenuItem key={title} value={title}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p>총 결제 금액</p>
      <p>{totalPriceNoCoupon + totalPrice()}</p>
    </>
  );
};

const CustomTable = styled(Table)`
  min-width: 650;
`;

const CustomTableHead = styled(TableHead)`
  border-top: 2px solid;
`;

const CustomTableCell = styled(TableCell)`
  height: 74px;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: rgb(0, 0, 0);
  vertical-align: middle;
  text-align: center;
`;

export default Cart;
