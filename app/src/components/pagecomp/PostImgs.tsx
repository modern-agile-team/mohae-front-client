import React, { useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { Box, Carousel, MarkBox, OrderedImg, Btn } from '..';
import { radius } from '../../styles';
import { Props } from '../../pages/post/Container';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

interface PostImgsProps {
  data?: Props;
  view?: boolean;
  getValue?: boolean;
}

function PostImgs(props: PostImgsProps) {
  const { view, getValue } = props;
  const reduxDatas = useSelector(
    (state: RootState) => state.post.data.response.board,
  );
  const boardPhotoURL = () => {
    return reduxDatas.boardPhotoUrls !== null &&
      reduxDatas.boardPhotoUrls !== ''
      ? reduxDatas.boardPhotoUrls.split(', ').map(el => {
          return 'https://d2ffbnf2hpheay.cloudfront.net/' + el;
        })
      : ['/img/logo.png'];
  };

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

  return view ? (
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
      <Box className="orderImgBox" size={[360, 72]}>
        <OrderedImg imgs={boardPhotoURL()} inline />
      </Box>
    </div>
  ) : (
    <>
      <Box size={[360, 360]}>
        <Carousel />
      </Box>
      <Box size={[360, 72]}>
        <OrderedImg inline edit />
      </Box>
    </>
  );
}

export default PostImgs;
