import React, { useState } from 'react';
import {
  Box,
  Carousel,
  MarkBox,
  OrderedImg as ImagesCollection,
} from '../../../../components';
import { radius } from '../../../../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root';
import styled from '@emotion/styled';

function PostImgs() {
  const loading = useSelector((state: RootState) => state.post.loading);
  const { boardPhotoUrls, target, isDeadline } = useSelector(
    (state: RootState) => state.post.data.response.board,
  );
  const [targetingImgIndex, setTargetingImgIndex] = useState(0);

  const boardPhotoURL = () => {
    if (boardPhotoUrls !== null && !loading) {
      return boardPhotoUrls.split(', ').map(el => {
        return 'https://d2ffbnf2hpheay.cloudfront.net/' + el;
      });
    } else if (boardPhotoUrls === null) {
      return ['/img/logo.png'];
    }
  };

  const loadingGetImg = () => {
    return (
      <Box className="orderImgBox" size={[360, 72]}>
        {!loading && (
          <ImagesCollection
            imgs={boardPhotoURL()}
            inline
            setImgIndex={setTargetingImgIndex}
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
          <MarkBox shape={target} state={isDeadline} big hover />
        </div>
      </Box>
      {loadingGetImg()}
    </Container>
  );
}

export default PostImgs;

const Container = styled.section`
  .carouselBox {
    width: 360px;
    height: 360px;
    ${radius[6]}
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
