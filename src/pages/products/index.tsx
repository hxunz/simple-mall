import { useEffect } from 'react';

import { useRouter } from 'next/router';

import Products from 'components/products';
import { useAppDispatch } from 'hooks';

import { loadProducts } from 'redux/productsSlice';

const ProductsPage = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const page = Number(router.query?.page || 1);

  useEffect(() => {
    // fetch product list API
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <Products page={page} />
  );
};

export default ProductsPage;
