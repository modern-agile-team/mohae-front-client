import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { PostIt, Btn, ReportModal } from '../../components';
import PostBody from '../../components/pagecomp/PostBody';
import PostImgs from '../../components/pagecomp/PostImgs';
import PostInfo from './PostInfo';
import PostWriter from './PostWriter';
import QuickMenu from './QuickMenu';
import useScroll from '../../customhook/useScroll';

interface Props {
  data: {
    no: 71;
    boardPhotoUrls: string;
    // 'board/1655861801994_dsn.jpg, board/1655861801994_dsn.jpg, board/1655861801994_dsn.jpg, '
    decimalDay: null | number;
    title: string;
    description: string;
    isDeadline: number;
    hit: number;
    price: number;
    summary: string;
    target: number;
    areaNo: number;
    area: string;
    categoryNo: number;
    category: string;
    userPhotoUrl: string;
    userNo: number;
    nickname: string;
    school: string;
    major: string;
    likeCount: null | number;
  };
}

function Presenter({ data }: Props) {
  console.log('data :>> ', data);
  const [report, setReport] = useState(false);

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
        <div className='topflexWrap'>
          <PostImgs view data={data} />
          <div className='sectionWrap'>
            <PostInfo data={data} />
            <PostWriter data={data} close={() => setReport(!report)} />
            <div className='postIt'>
              <PostIt small>{data.summary}</PostIt>
            </div>
          </div>
        </div>
        <PostBody view data={data} />
        <div className='cancelCloseBtn'>
          <Btn main>{data.isDeadline ? '마감 취소' : '마감 하기'}</Btn>
        </div>
        {useScroll().scrollY > 490 && (
          <div className='quickMenu'>
            <QuickMenu data={data} close={() => setReport(!report)} />
          </div>
        )}
      </div>
    </>
  );
}

export default Presenter;
