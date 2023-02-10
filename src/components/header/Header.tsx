import styled from '@emotion/styled';
import { LocalMall } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar
} from '@mui/material';
import { useRouter } from 'next/router';

import { useAppSelector } from 'hooks';

const Header = () => {
  const router = useRouter();

  const { cartProducts } = useAppSelector(store => store.products);

  const handleClickRouteHome = () => {
    router.push('/');
  };

  const handleClickRouteProductsPage = () => {
    router.push('/products');
  };

  const handleClickRouteCartPage = () => {
    router.push('/cart');
  };

  return (
    <CustomAppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <CustomImg
            src='/images/ebay.png'
            onClick={handleClickRouteHome}
          />

          <CustomBox>
            <CustomButton onClick={handleClickRouteProductsPage}>
              BEST
            </CustomButton>
          </CustomBox>

          <IconButton onClick={handleClickRouteCartPage}>
            <CustomLocalMall />
            {cartProducts.length > 0 && <CustomSpan>
              {cartProducts.length}
            </CustomSpan>}
          </IconButton>

        </Toolbar>
      </Container>
    </CustomAppBar>
  );
};

const CustomSpan = styled.span`
  position: absolute;
  padding: 0px 3px;
  top: -2px;
  left: 1px;
  min-width: 13px;
  height: 18px;
  background: rgb(255, 72, 0);
  text-align: center;
  font-size: 9px;
  color: rgb(255, 255, 255);
  line-height: 18px;
  border-radius: 13px;
`;

const CustomAppBar = styled(AppBar)`
  background-color: white;
  border-bottom: 1px solid;
  border-bottom-color: rgb(212, 212, 212);
  box-shadow: none;
`;

const CustomImg = styled.img`
  width: 56px;
  height: 56px;
  cursor: pointer;
`;

const CustomBox = styled(Box)`
  flex-grow: 1;
`;

const CustomButton = styled(Button)`
  border-bottom: 4px solid transparent;
  padding: 20px 20px 0;
  font-size: 16px;
  font-weight: 600;
  color: black;
  cursor: pointer;
`;

const CustomLocalMall = styled(LocalMall)`
  color: black;
`;

export default Header;
