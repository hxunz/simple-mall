import styled from '@emotion/styled';
import { Box, CardActionArea, CardContent, Typography, Checkbox, ButtonGroup, Button } from '@mui/material';
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
      setTotalPrice(0)
    }
  }

  return (
    <CardWrapper>
      <Checkbox checked={checked} onClick={handleClickAddPay} />
      <Box>
        <CardActionArea>
          <Image
            width={400}
            height={400}
            src={detail_image_url}
            alt={item_name}
          />
          <CardContent>
            <Typography>
              {item_name}
            </Typography>
            <CardText>
              {price}
            </CardText>
          </CardContent>
        </CardActionArea>
      </Box>
      <ButtonGroup variant='outlined'>
        <Button onClick={quantity === 1 ? undefined : handleClickDecreaseQuantity}>-</Button>
        <Button>{quantity}</Button>
        <Button onClick={handleClickIncreaseQuantity}>+</Button>
      </ButtonGroup>
    </CardWrapper>
  )
};

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;
  margin-top: 2rem;
`;

const CardText = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 14;
  overflow: hidden;
`;

export default CartItem;
