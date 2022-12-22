import Products from 'components/products';
import { useAppDispatch } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { loadProducts } from 'redux/productsSlice';

const ProductsPage = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const page = Number(router.query?.page || 1);

  useEffect(() => {
    // fetch product list API
    dispatch(loadProducts());
  }, []);

  return (
    <Products page={page} />
  )
}

export default ProductsPage;
