import styled from '@emotion/styled';
import { Box, Button, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, Pagination, Typography } from '@mui/material';
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

  const { products } = useAppSelector(store => store.products);

  const [open, setOpen] = useState(false);

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/products?page=${page}`)
  };

  const handleClickOpen = (item_no: number) => {
    setOpen(true);
    dispatch(addCart(item_no));
  }

  const handleClose = () => {
    setOpen(false);
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
                    <Dialog
                      open={open}
                      onClose={handleClose}
                    >
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          장바구니에 상품이 담겼습니다.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleMoveCart}>장바구니 바로가기</Button>
                      </DialogActions>
                    </Dialog>
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