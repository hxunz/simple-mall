import styled from '@emotion/styled';
import { Box, CardActionArea, CardContent, Typography, Checkbox, ButtonGroup, Button } from '@mui/material';
import { useAppSelector } from 'hooks';
import Image from 'next/image';
import { productItems } from 'productItem';
import { useState } from 'react';

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const { cartProducts } = useAppSelector(store => store.products);

  const cartList = productItems.filter(product => cartProducts.includes(product.item_no));

  const handleClickIncreaseQuantity = () => {
    setQuantity(quantity + 1)
  };

  const handleClickDecreaseQuantity = () => {
    setQuantity(quantity - 1)
  };

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
          <CardWrapper key={item_no}>
            <Checkbox />
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
        ))}
      </Wrapper>
      <p>총 결제 금액</p>
    </>
  )
}

const Wrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  min-height: 30rem;
`;

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

export default Cart;
