import React, { useCallback, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import { PostIt, Btn, ReportModal, Box, Img } from '../../components';
import PostBody from '../../components/pagecomp/PostBody';
import PostImgs from '../../components/pagecomp/PostImgs';
import PostInfo from './PostInfo';
import PostWriter from './PostWriter';
import QuickMenu from './QuickMenu';
import useScroll from '../../customhook/useScroll';
import { color, font, radius, shadow } from '../../styles';

interface Props {
  data: {
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

function Presenter({ data }: Props) {
  const [report, setReport] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);

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
              <PostIt small>{data.response.board.summary}</PostIt>
            </div>
          </div>
        </div>
        <PostBody view data={data} />
        <Box size={[1128]} className='comments-box'>
          <p className='all-comments'>
            댓글 <span>({dummy.response.length})</span>
          </p>
          <div>
            <textarea
              className='text-box'
              ref={textRef}
              placeholder='댓글을 입력해 주세요. (최대 500자)'
              onInput={handleResizeHeight}
            />
            <div className='write-btn'>
              <Btn main>
                <p>작성</p>
                <div className='write-img'>
                  <Img src='/img/write.png' />
                </div>
              </Btn>
            </div>
          </div>
        </Box>
        <div className='cancelCloseBtn'>
          <Btn main>
            {data.response.board.isDeadline ? '마감 취소' : '마감 하기'}
          </Btn>
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
  .comments-box {
    padding: 16px 24px 24px 24px;
    margin-bottom: 16px;
  }
  .all-comments {
    ${font.size[16]}
    ${font.weight[700]}
    padding: 0px 0px 16px 0px;
    border-bottom: 1px solid ${color.light4};
    > span {
      color: ${color.dark3};
      ${font.weight[400]}
    }
  }
  .text-box {
    width: 100%;
    min-height: 84px;
    padding: 16px;
    margin-top: 16px;
    ${radius[6]}
    ${shadow.inputGray}
  }
  .write-btn {
    width: 100px;
    height: 43px;
    margin-left: 980px;
  }
  .write-img {
    width: 15px;
    height: 15px;
  }
`;

const dummy = {
  success: true,
  statusCode: 200,
  msg: '댓글 전체 조회 완료',
  response: [
    {
      commentNo: 8,
      commentContent: '댓글을 수정했습니다.',
      commentCreatedAt: '2022년 06월 17일',
      commenterNo: 2,
      commenterNickname: 'hneeddjsjde',
      commenterPhotoUrl: 'profile/165518423416.jpg',
      isCommenter: 0,
      replies: [
        {
          replyNo: 1,
          replyContent: '가ㄷㅏㅁㅏㅏㅏㅏ',
          replyWriterNo: 1,
          replyWriterPhotoUrl: 'example.com',
          replyCreatedAt: '2022년 06월 17일',
        },
      ],
    },
    {
      commentNo: 8,
      commentContent: '댓글을 수정했습니다.',
      commentCreatedAt: '2022년 06월 17일',
      commenterNo: 2,
      commenterNickname: 'hneeddjsjde',
      commenterPhotoUrl: 'profile/165518423416.jpg',
      isCommenter: 0,
      replies: [
        {
          replyNo: 1,
          replyContent: '가ㄷㅏㅁㅏㅏㅏㅏ',
          replyWriterNo: 1,
          replyWriterPhotoUrl: 'example.com',
          replyCreatedAt: '2022년 06월 17일',
        },
        {
          replyNo: 1,
          replyContent: '가ㄷㅏㅁㅏㅏㅏㅏ',
          replyWriterNo: 1,
          replyWriterPhotoUrl: 'example.com',
          replyCreatedAt: '2022년 06월 17일',
        },
        {
          replyNo: 1,
          replyContent: '가ㄷㅏㅁㅏㅏㅏㅏ',
          replyWriterNo: 1,
          replyWriterPhotoUrl: 'example.com',
          replyCreatedAt: '2022년 06월 17일',
        },
      ],
    },
    {
      commentNo: 8,
      commentContent: '댓글을 수정했습니다.',
      commentCreatedAt: '2022년 06월 17일',
      commenterNo: 2,
      commenterNickname: 'hneeddjsjde',
      commenterPhotoUrl: 'profile/165518423416.jpg',
      isCommenter: 0,
      replies: [
        {
          replyNo: 1,
          replyContent: '가ㄷㅏㅁㅏㅏㅏㅏ',
          replyWriterNo: 1,
          replyWriterPhotoUrl: 'example.com',
          replyCreatedAt: '2022년 06월 17일',
        },
      ],
    },
    {
      commentNo: 8,
      commentContent: '댓글을 수정했습니다.',
      commentCreatedAt: '2022년 06월 17일',
      commenterNo: 2,
      commenterNickname: 'hneeddjsjde',
      commenterPhotoUrl: 'profile/165518423416.jpg',
      isCommenter: 0,
      replies: [
        {
          replyNo: 1,
          replyContent: '가ㄷㅏㅁㅏㅏㅏㅏ',
          replyWriterNo: 1,
          replyWriterPhotoUrl: 'example.com',
          replyCreatedAt: '2022년 06월 17일',
        },
      ],
    },
  ],
};
