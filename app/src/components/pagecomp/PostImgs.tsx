import React from 'react';
import { css, cx } from '@emotion/css';
import { Box, Carousel, MarkBox, OrderedImg, Btn } from '..';
import { radius } from '../../styles';
import { Props } from '../button';

// 이미지s

function PostImgs(props: Props) {
  const { view, getValue } = props;

  const dummy = {
    statusCode: 200,
    msg: '게시글 상세 조회가 완료되었습니다.',
    response: {
      no: 42,
      decimalDay: '- 8',
      title: '카테고리 조회 테스트',
      description: '생성',
      isDeadline: 1,
      hit: 4,
      likeCount: 0,
      price: 1000,
      summary: 'test',
      target: 1,
      note1: '첫번째',
      note2: '두번째',
      note3: '세번째',
      areaNo: 1,
      areaName: '서울특별시',
      categoryNo: 2,
      categoryName: '디자인',
      userNo: 1,
      userName: '백팀장',
      userNickname: '내가 관리자다',
      userPhotoUrl: 'asdfasdf',
      userSchool: '선택안함',
      userMajor: '선택안함',
    },
  };

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
            shape={dummy.response.target}
            state={dummy.response.isDeadline}
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
