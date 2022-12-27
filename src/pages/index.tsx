import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleClickRouteProductsPage = () => {
    router.push('/products')
  }

  return (
    <Button onClick={handleClickRouteProductsPage}>
      BEST
    </Button>
  )
}

export default Home;
