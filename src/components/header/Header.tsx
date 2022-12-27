import { AppBar, Box, Toolbar, IconButton, Container, Button } from '@mui/material';
import { LocalMall } from '@mui/icons-material';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const Header = () => {
  const router = useRouter();

  const handleClickRouteProductsPage = () => {
    router.push('/products')
  }

  const handleClickRouteCartPage = () => {
    router.push('/cart')
  }

  return (
    <CustomAppBar position='sticky'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CustomImg src='/images/logo.png' />
          <CustomBox>
            <CustomButton onClick={handleClickRouteProductsPage}>
              BEST
            </CustomButton>
          </CustomBox>

          <IconButton onClick={handleClickRouteCartPage}>
            <CustomLocalMall />
          </IconButton>
        </Toolbar>
      </Container>
    </CustomAppBar>
  );
}

const CustomAppBar = styled(AppBar)`
  background-color: white;
  border-bottom: 1px solid;
  border-bottom-color: rgb(212, 212, 212);
  box-shadow: none;
`

const CustomImg = styled.img`
  width: 56px;
  height: 56px;
`

const CustomBox = styled(Box)`
  flex-grow: 1;
`

const CustomButton = styled(Button)`
  border-bottom: 4px solid transparent;
  padding: 20px 20px 0;
  font-size: 16px;
  font-weight: 600;
  color: black;
  cursor: pointer;
`

const CustomLocalMall = styled(LocalMall)`
  color: black;
`

export default Header;
