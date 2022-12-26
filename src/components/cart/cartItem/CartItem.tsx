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

      <TableCell align='center'>
        <div>
          <Image
            width={400}
            height={400}
            src={detail_image_url}
            alt={item_name}
          />
        </div>
        <div>
          {item_name}
        </div>
      </TableCell>

      <TableCell align='center'>
        <div>
          {price}
        </div>
      </TableCell>

      <TableCell align='center'>
        <div>
          <ButtonGroup variant='outlined'>
            <Button onClick={quantity === 1 ? undefined : handleClickDecreaseQuantity}>-</Button>
            <Button>{quantity}</Button>
            <Button onClick={handleClickIncreaseQuantity}>+</Button>
          </ButtonGroup>
        </div>
      </TableCell>

    </TableRow>
  )
};

export default CartItem;
