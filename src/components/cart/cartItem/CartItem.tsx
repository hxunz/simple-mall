import { useState } from 'react';

import styled from '@emotion/styled';
import { HighlightOff } from '@mui/icons-material';
import { Button,
  ButtonGroup,
  Checkbox,
  TableCell,
  TableRow } from '@mui/material';

import ProductImage from 'components/productImage/ProductImage';
import { useAppDispatch } from 'hooks';
import { addPayList,
  removeCart,
  removePayList,
  updatePayList } from 'redux/productsSlice';

type Props = {
  item_name: string;
  detail_image_url: string;
  price: number;
  availableCoupon: boolean | undefined;
  item_no: number;
}

const CartItem: React.FC<Props> = ({ item_name,
  detail_image_url,
  price,
  availableCoupon,
  item_no }) => {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);

  const [checked, setChecked] = useState(false);

  const handleChangeQuantity = (isPlus = false) => () => {
    const changedQuantity = isPlus ? quantity + 1 : quantity - 1;
    setQuantity(changedQuantity);

    if (checked) {
      dispatch(updatePayList({
        priceWithQuantity: price * changedQuantity,
        availableCoupon,
        item_no
      }));
    }
  };

  const handleClickChecked = () => {
    setChecked(!checked);
    if (checked) {
      dispatch(removePayList(item_no));
    }
    else {
      dispatch(addPayList({ priceWithQuantity: price * quantity, availableCoupon, item_no }));
    }
  };

  const handleClickRemoveCartItem = () => {
    dispatch(removeCart(item_no));
    dispatch(removePayList(item_no));
  };

  return (
    <TableRow>
      <TableCell align='center'>
        <div>
          <Checkbox checked={checked} onClick={handleClickChecked} />
        </div>
      </TableCell>

      <CustomTableCell align='center'>
        <ProductImage
          width={150}
          height={150}
          src={detail_image_url}
          alt={item_name}
        />

        <ProductName>
          {item_name}
          {availableCoupon !== false &&
            <CouponUsableText>
              쿠폰 사용 가능
            </CouponUsableText>
          }
        </ProductName>
        <RemoveCartItem onClick={handleClickRemoveCartItem} />
      </CustomTableCell>

      <TableCell align='center'>
        <ButtonGroup variant='outlined'>
          <Button onClick={handleChangeQuantity()} disabled={quantity === 1}>-</Button>
          <Button>{quantity}</Button>
          <Button onClick={handleChangeQuantity(true)}>+</Button>
        </ButtonGroup>
      </TableCell>

      <TableCell align='center'>
        <div>
          <Price>
            {price}원
          </Price>
        </div>
      </TableCell>

    </TableRow>
  );
};

const CustomTableCell = styled(TableCell)`
  display: flex;
  align-items: center;

  & :not(:first-child){
    margin-left: 2rem;
  }
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 550;
`;

const Price = styled.div`
  width: 150px;
  font-size: 18px;
  font-weight: 600;
`;

const CouponUsableText = styled.p`
  color: #ff4800;
  font-size: 14px;
  line-height: 16px;
`;

const RemoveCartItem = styled(HighlightOff)`
  cursor: pointer;
`;

export default CartItem;
