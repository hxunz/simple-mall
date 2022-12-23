import styled from '@emotion/styled';
import { Box, Button, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, Pagination, Typography } from '@mui/material';
import AlertDialog from 'components/dialog';
import { AlertDialogProps } from 'components/dialog/AlertDialog';
import { useAppDispatch, useAppSelector } from 'hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { addCart } from 'redux/productsSlice';

type Props = {
  page: number;
}

const Products: FC<Props> = ({ page }) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { products, cartProducts } = useAppSelector(store => store.products);

  const [alertProps, setAlertProps] = useState<AlertDialogProps>({} as AlertDialogProps);

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/products?page=${page}`)
  };

  const handleClickOpen = (item_no: number) => {
    const set = new Set(cartProducts);
    const unique = [...set]
    if (unique.length < 3) {
      dispatch(addCart(item_no));
      setAlertProps({
        message: '장바구니에 상품이 담겼습니다.',
        open: true,
        onClose: handleClose
      })
    } else {
      setAlertProps({
        message: '더 이상 장바구니에 추가할 수 없습니다.',
        open: true,
        onClose: handleClose
      })
    }
  }

  const handleClose = () => {
    setAlertProps(prevAlertProps => ({
      ...prevAlertProps,
      open: false
    }))
  }

  const handleMoveCart = () => {
    router.push('/cart');
  }

  return (
    <>
      <div>products list</div>
      <Wrapper>
        {products[page - 1] && products[page - 1].map(({
          item_no,
          item_name,
          detail_image_url,
          price
        }) => (
          <CardWrapper key={item_no}>
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
                <div>
                  <Button
                    onClick={() => handleClickOpen(item_no)}
                  >
                    장바구니
                  </Button>
                </div>
              </CardActionArea>
            </Box>
          </CardWrapper>
        ))}
      </Wrapper>
      <Pagination
        count={products.length}
        onChange={handleChangePage}
      />
      <AlertDialog {...alertProps} />
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

export default Products;