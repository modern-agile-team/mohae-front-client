import React from 'react';
import { css, cx } from '@emotion/css';
import { Box, Carousel, MarkBox, OrderedImg, Btn } from '..';
import { radius } from '../../styles';

// 이미지s
interface Props {
  view?: boolean;
  getValue?: boolean;
  data?: {
    date: string;
    msg: string;
    response: {
      authorization: boolean;
      board: {
        areaName: string;
        areaNo: number;
        boardPhotoUrls: string | null;
        categoryName: string;
        categoryNo: number;
        decimalDay: number | null;
        description?: string;
        hit: number;
        isDeadline: number;
        isLike?: number;
        likeCount: number;
        majorName: string;
        nickname: string;
        no: number;
        price: number;
        summary: null | string;
        target: number;
        title: string;
        userNo: number;
        userPhotoUrl: string;
      };
    };
  };
}

function PostImgs(props: Props) {
  const { view, getValue, data } = props;
  const datas = data?.response;
  console.log('datas :>> ', datas);

  const imgs = [
    '/img/camera.png',
    '/img/camera.png',
    '/img/camera.png',
    '/img/camera.png',
    '/img/camera.png',
  ];

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

  // 작성일 때 이미지 캐러셀 props 또는 오더 이미지 props
  // 띄워주는 것 다르게 하는 함수 만들기.

  return view ? (
    <div className={cx(style)}>
      <Box className='carouselBox' size={[360, 360]}>
        <Carousel images={imgs} />
        <div className='markBox'>
          <MarkBox
            shape={datas?.board.target}
            state={datas?.board.isDeadline}
            big
            hover
          />
        </div>
      </Box>
      <Box className='orderImgBox' size={[360, 72]}>
        <OrderedImg imgs={imgs} inline />
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
