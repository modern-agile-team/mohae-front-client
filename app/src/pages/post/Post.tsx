import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { PostIt, Btn, ReportModal } from '../../components';
import PostBody from '../../components/pagecomp/PostBody';
import PostImgs from '../../components/pagecomp/PostImgs';
import PostInfo from './PostInfo';
import PostWriter from './PostWriter';
import { Props } from '../../components/button';
import axios from 'axios';
import QuickMenu from './QuickMenu';
import useScroll from '../../customhook/useScroll';
import Comment from '../../components/comment/Comment';

function Post(props: Props) {
  const [report, setReport] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/list`)
      .then(response => console.log('res : ', response.data))
      .catch(err => console.log('err : ', err));
  }, []);

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
    @keyframes fadeInDown {
      0% {
        opacity: 0;
        transform: translate3d(0, -8px, 0);
      }
      100% {
        opacity: 1;
        transform: translateZ(0);
      }
    }

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
    .quickMenu {
      position: fixed;
      top: 59px;
      animation: fadeInDown 1s;
    }
  `;

  return (
    <>
      <ReportModal visible={report} close={() => setReport(!report)} />
      <div className={cx(wrap)}>
        <div className="topflexWrap">
          <PostImgs view />
          <div className="sectionWrap">
            <PostInfo />
            <PostWriter close={() => setReport(!report)} />
            <div className="postIt">
              <PostIt small />
            </div>
          </div>
        </div>
        <PostBody view />
        <Comment />
        <div className="cancelCloseBtn">
          <Btn main>
            {dummy.response.isDeadline ? '마감 취소' : '마감 하기'}
          </Btn>
        </div>
        {useScroll().scrollY > 490 && (
          <div className="quickMenu">
            <QuickMenu close={() => setReport(!report)} />
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
