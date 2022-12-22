import styled from '@emotion/styled';
import { Box, Card, CardActionArea, CardContent, Pagination, Typography } from '@mui/material';
import { useAppSelector } from 'hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  page: number;
}

const Products: FC<Props> = ({ page }) => {
  const router = useRouter();

  const { products } = useAppSelector(store => store.products);

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/products?page=${page}`)
  };

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
            <Card>
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
            </Card>
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