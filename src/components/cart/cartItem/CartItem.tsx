import styled from '@emotion/styled';
import { Checkbox, ButtonGroup, Button, TableRow, TableCell } from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  item_name: string;
  detail_image_url: string;
  price: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
}

const CartItem: React.FC<Props> = ({ item_name, detail_image_url, price, setTotalPrice }) => {
  const [quantity, setQuantity] = useState(1);
  const [checked, setChecked] = useState(false);

  const handleClickIncreaseQuantity = () => {
    setQuantity(quantity + 1)
  };

  const handleClickDecreaseQuantity = () => {
    setQuantity(quantity - 1)
  };

  const handleClickAddPay = () => {
    setChecked(!checked)
    if (checked === false) {
      setTotalPrice(prev => prev + price * quantity)
    } else {
      setTotalPrice(prev => prev - price * quantity)
    }
  }

  return (
    <TableRow>
      <TableCell align='center'>
        <div>
          <Checkbox checked={checked} onClick={handleClickAddPay} />
        </div>
      </TableCell>

      <CustomTableCell align='center'>
        <div>
          <Image
            width={200}
            height={200}
            src={detail_image_url}
            alt={item_name}
          />
        </div>
        <ProductName>
          {item_name}
        </ProductName>
      </CustomTableCell>
      <TableCell align='center'>
        <ButtonGroup variant='outlined'>
          <Button onClick={quantity === 1 ? undefined : handleClickDecreaseQuantity}>-</Button>
          <Button>{quantity}</Button>
          <Button onClick={handleClickIncreaseQuantity}>+</Button>
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
  )
};

const CustomTableCell = styled(TableCell)`
  display: flex;
  align-items: center;

  & :not(:first-child){
  margin-left: 2rem;
  }
`

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 550;
`

const Price = styled.div`
  width: 150px;
  font-size: 18px;
  font-weight: 600;
`

const Buttons = styled(Button)`
  font-size: 18px;
  line-height: 24px;
`

export default CartItem;
