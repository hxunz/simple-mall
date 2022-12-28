import { FC } from 'react';

import styled from '@emotion/styled';
import { AddShoppingCart } from '@mui/icons-material';
import { Box, Button, CardContent, IconButton, Typography } from '@mui/material';

import Image from 'next/image';

import { useAppDispatch, useAppSelector } from 'hooks';
import { Product, addCart } from 'redux/productsSlice';

type Props = Product & {
  onOpenAlert: (message: string) => void;
};

const Product: FC<Props> = ({ detail_image_url, item_name, price, availableCoupon, item_no, onOpenAlert }) => {
  const { cartProducts } = useAppSelector(store => store.products);

  const dispatch = useAppDispatch();

  const handleClickAddCart = () => {
    if (!cartProducts.includes(item_no) && cartProducts.length < 3) {
      dispatch(addCart(item_no));
      onOpenAlert('장바구니에 상품이 담겼습니다.');
    } else if (cartProducts.includes(item_no)) {
      onOpenAlert('이미 추가된 상품입니다.');
    }
    else {
      onOpenAlert('더 이상 장바구니에 추가할 수 없습니다.');
    }
  };

  return (
    <CardWrapper>
      <Box sx={{ height: 600 }}>
        <div>
          <Image
            width={400}
            height={400}
            src={detail_image_url}
            alt={item_name}
          />
          <ContentWrapper>
            <CardText>
              {item_name}
            </CardText>
            <CardText>
              {price}원
            </CardText>
            {availableCoupon !== false && <CardText style={{ color: '#ff4800', fontSize: '14px', lineHeight: '16px' }}>
              쿠폰 사용 가능
            </CardText>}
          </ContentWrapper>
          <CustomIconButton
            onClick={handleClickAddCart}
          >
            <AddShoppingCart />
          </CustomIconButton>
        </div>
      </Box>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  padding: 1rem;
  margin-top: 2rem;
`;

const CardText = styled(Typography)`
  font-size: 14;
`;

const ContentWrapper = styled(CardContent)`
  width: 22rem;

  & :not(:first-child){
  margin-top: 1rem;
  }
`;

const CustomIconButton = styled(IconButton)`
  margin-left: .5rem;
`;

export default Product;
