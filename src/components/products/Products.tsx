import styled from '@emotion/styled';
import { LocalMall } from '@mui/icons-material';
import { Box, Pagination } from '@mui/material';
import AlertDialog from 'components/dialog';
import { AlertDialogProps } from 'components/dialog/AlertDialog';
import { useAppSelector } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import Product from './product';

type Props = {
  page: number;
}

const Products: FC<Props> = ({ page }) => {
  const router = useRouter();

  const { products } = useAppSelector(store => store.products);

  const [alertProps, setAlertProps] = useState<AlertDialogProps>({} as AlertDialogProps);

  const productsPerPage = products[page - 1];

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/products?page=${page}`)
  };

  const handleOpenAlert = (message: string) => {
    setAlertProps({
      message: message,
      open: true,
      onClose: handleClose
    })
  }

  const handleClose = () => {
    setAlertProps(prevAlertProps => ({
      ...prevAlertProps,
      open: false
    }))
  }

  return (
    <>
      <LocalMall style={{ float: 'right', margin: '.5rem 1rem 0 0' }} />
      {productsPerPage && <Wrapper>
        {productsPerPage.map(product => (
          <Product
            key={product.item_no}
            onOpenAlert={handleOpenAlert}
            {...product}
          />
        ))}
      </Wrapper>}
      <CustomPagination
        count={products.length}
        onChange={handleChangePage}
      />
      <AlertDialog {...alertProps} />
    </>
  )
};

const Wrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  min-height: 30rem;
`;

const CustomPagination = styled(Pagination)`
  margin: 2rem .5rem;
`;

export default Products;
