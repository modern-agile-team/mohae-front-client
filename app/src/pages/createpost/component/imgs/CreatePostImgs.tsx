import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Box, Carousel, MarkBox, OrderedImg } from '../../../../components';
import { radius } from '../../../../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root';
import { PostData } from '../../../../types/post/type';

interface PostImgsProps {
  data?: PostData;
  view?: boolean;
  getValue?: boolean;
  type?: string;
}

function PostImgs(props: PostImgsProps) {
  const { view, getValue, type } = props;
  const reduxDatas = useSelector(
    (state: RootState) => state.post.data.response.board,
  );
  const editImgArr = useSelector(
    (state: RootState) => state.createPost.data.imgArr,
  );
  const loading = useSelector((state: RootState) => state.post.loading);
  const [imgIndex, setImgIndex] = useState(0);
  const boardPhotoURL = () => {
    if (reduxDatas.boardPhotoUrls !== null && !loading) {
      return reduxDatas.boardPhotoUrls.split(', ').map(el => {
        return 'https://d2ffbnf2hpheay.cloudfront.net/' + el;
      });
    } else if (reduxDatas.boardPhotoUrls === null) {
      return ['/img/logo.png'];
    }
  };
  const createOrderedImg = () => {
    if (!loading) {
      return (
        <Box className="orderImgBox" size={[360, 72]}>
          <OrderedImg imgs={boardPhotoURL()} inline setImgIndex={setImgIndex} />
        </Box>
      );
    } else {
      return <Box className="orderImgBox" size={[360, 72]}></Box>;
    }
  };

  return view && !type ? (
    <div className={cx(style)}>
      <Box className="carouselBox" size={[360, 360]}>
        <Carousel
          imgs={boardPhotoURL()}
          imgIndex={imgIndex}
          setImgIndex={setImgIndex}
        />
        <div className="markBox">
          <MarkBox
            shape={reduxDatas.target}
            state={reduxDatas.isDeadline}
            size={'big'}
          />
        </div>
      </Box>
      {createOrderedImg()}
    </div>
  ) : (
    <>
      <Box size={[360, 360]}>
        <Carousel postEdit />
      </Box>
      <Box size={[360, 72]}>
        <OrderedImg inline edit imgs={editImgArr} postEdit />
      </Box>
    </>
  );
}

export default PostImgs;

const style = css`
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
