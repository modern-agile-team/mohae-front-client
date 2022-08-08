import React from 'react';
import { css, cx } from '@emotion/css';
import { Box, Carousel, MarkBox, OrderedImg } from '..';
import { radius } from '../../styles';
import { Props } from '../../pages/post/Container';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

interface PostImgsProps {
  data?: Props;
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
          <OrderedImg imgs={boardPhotoURL()} inline />
        </Box>
      );
    } else {
      return <Box className="orderImgBox" size={[360, 72]}></Box>;
    }
  };

  return view && !type ? (
    <div className={cx(style)}>
      <Box className="carouselBox" size={[360, 360]}>
        <Carousel imgs={boardPhotoURL()} />
        <div className="markBox">
          <MarkBox
            shape={reduxDatas.target}
            state={reduxDatas.isDeadline}
            big
            hover
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
