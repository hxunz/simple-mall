import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAppSelector } from 'hooks';
import { productItems } from 'productItem';
import { useState } from 'react';
import CartItem from './cartItem';

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const { cartProducts, coupons } = useAppSelector(store => store.products);

  const cartList = productItems.filter(product => cartProducts.includes(product.item_no));

  const handleChangeCoupon = () => {
    // if (title === '10% 할인 쿠폰')
    // console.log('hi');
  }

  const titles = coupons.map((it) => it.title);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple-table'>
          <TableHead>
            <TableRow>
              <TableCell>체크</TableCell>
              <TableCell>상품 정보</TableCell>
              <TableCell>수량</TableCell>
              <TableCell>주문 금액</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
          </TableBody>
        </Table>
      </TableContainer>
      <p>쿠폰 적용</p>
      <FormControl fullWidth>
        <InputLabel id='select-label'>쿠폰</InputLabel>
        <Select
          labelId='select-label'
          id='select'
          label='Coupons'
          value={titles}
          onChange={handleChangeCoupon}
        >
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
      <p>{totalPrice}</p>
    </>
  )
}

export default Cart;
