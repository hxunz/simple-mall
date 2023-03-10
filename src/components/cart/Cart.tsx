import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'hooks';
import { productItems } from 'productItem';

import { resetPayList } from 'redux/productsSlice';

import CartItem from './cartItem';

const Cart = () => {
  const dispatch = useAppDispatch();

  const [couponTitle, setCouponTitle] = useState('');

  const { cartProducts, coupons, payList } = useAppSelector(store => store.products);

  const cartList = productItems.filter(product => cartProducts.includes(product.item_no));

  const selectCoupon = coupons.find(coupon => coupon.title === couponTitle);

  useEffect(() => {
    dispatch(resetPayList());
  }, [dispatch]);

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

  const totalPriceUseCoupon = () => {
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

  const totalPrice = (totalPriceNoCoupon + totalPriceUseCoupon()).toLocaleString();

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
              <CustomTableCell>?????? ??????</CustomTableCell>
              <CustomTableCell>??????</CustomTableCell>
              <CustomTableCell>?????? ??????</CustomTableCell>
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

      <p>?????? ??????</p>
      <FormControl fullWidth>
        <InputLabel>
          ??????
        </InputLabel>

        <Select
          value={couponTitle}
          onChange={handleChangeCoupon}
        >
          <MenuItem value='?????? ??????'>?????? ??????</MenuItem>
          {coupons.map(({
            title
          }) => (
            <MenuItem key={title} value={title}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <PayWrapper>
        <PayText>
          ??? ?????? ??????
        </PayText>
        <Pay>
          {totalPrice}???
        </Pay>
      </PayWrapper>
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

const PayWrapper = styled.div`
  border-bottom: 1px solid;
  margin: 7% auto;
`;

const PayText = styled.p`
  border-top: 4px solid;
  border-bottom: 1px solid rgb(228, 228, 228);
  width: 100%;
  padding: 3% 0;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`;

const Pay = styled.p`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  vertical-align: -4px;
`;

export default Cart;
