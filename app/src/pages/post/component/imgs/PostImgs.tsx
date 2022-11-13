import React, { useState } from 'react';
import { Box, Carousel, MarkBox, ImageInput } from '../../../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root';
import styled from '@emotion/styled';

function PostImgs() {
  const [targetingImgIndex, setTargetingImgIndex] = useState(0);
  const loading = useSelector((state: RootState) => state.post.loading);
  const { boardPhotoUrls, target, isDeadline } = useSelector(
    (state: RootState) => state.post.data.response.board,
  );

  const boardPhotoURL = () => {
    if (boardPhotoUrls !== null && !loading) {
      return boardPhotoUrls.split(', ').map(el => {
        return 'https://d2ffbnf2hpheay.cloudfront.net/' + el;
      });
    } else {
      return ['/img/logo.png'];
    }
  };

  const loadingGetImg = () => {
    return (
      <Box className="orderImgBox" size={[360, 72]}>
        {!loading && (
          <ImageInput
            imgs={boardPhotoURL()}
            setImgIndex={setTargetingImgIndex}
            edit={false}
          />
        )}
      </Box>
    );
  };

  return (
    <Container>
      <Box className="carouselBox" size={[360, 360]}>
        <Carousel
          imgs={boardPhotoURL()}
          imgIndex={targetingImgIndex}
          setImgIndex={setTargetingImgIndex}
        />
        <div className="markBox">
          <MarkBox shape={target} state={isDeadline} size={'big'} />
        </div>
      </Box>
      {loadingGetImg()}
    </Container>
  );
}

export default PostImgs;

const Container = styled.section`
  position: relative;
  .carouselBox {
    width: 360px;
    height: 360px;
    border-radius: 6px;
    position: relative;
  }
  .markBox {
    position: absolute;
    top: 16px;
    left: 314px;
  }
  .orderImgBox {
    margin-top: 16px;
  }
`;
