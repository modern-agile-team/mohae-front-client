import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { PostIt, Btn } from '../../components';
import PostBody from './pagecomp/PostBody';
import PostImgs from './pagecomp/PostImgs';
import PostInfo from './pagecomp/PostInfo';
import PostWriter from './pagecomp/PostWriter';
import { Props } from '../../components/button';

function Post(props: Props) {
  const [state, setState] = useState('');

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

  const wrap = css`
    margin-top: 40px;

    .topflexWrap {
      display: flex;
      justify-content: space-between;
    }

    .postIt {
      margin-top: 24px;
    }

    .cancelCloseBtn {
      margin: 16px;
      width: 100px;
      height: 43px;
      margin-left: 1028px;
      margin-bottom: 64px;
    }
  `;

  return (
    <div className={cx(wrap)}>
      <div className='topflexWrap'>
        <PostImgs />
        <div className='sectionWrap'>
          <PostInfo />
          <PostWriter />
          <div className='postIt'>
            <PostIt small />
          </div>
        </div>
      </div>
      <PostBody view />
      <div className='cancelCloseBtn'>
        <Btn main>마감 취소</Btn>
      </div>
    </div>
  );
}

export default Post;
