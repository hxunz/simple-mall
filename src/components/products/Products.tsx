import styled from '@emotion/styled';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import { productItems } from 'productItem';

const Wrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  min-height: 30rem;
`;

const CardWrapper = styled('div')`
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

productItems.sort(function (a, b) {
  return a.score - b.score
})

const Products = () => {
  return (
    <>
      <div>products list</div>
      <Wrapper>
        {productItems.map(({
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
    </>
  )
}

export default Products;
