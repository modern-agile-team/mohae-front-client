import React from 'react';
import { css, cx } from '@emotion/css';
import Profile from '../../../components/profile/Profile';
import { Btn, Img, PostIt } from '../../../components';
import { color, font } from '../../../styles';
import { Props } from '../../../components/button';

// 프로필 이미지, 닉네임, 전공, 로그인 상태(버튼 그려줘야 함),

function PostWriter(props: Props) {
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

  const style = css`
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    p {
      color: ${color.dark1};
      &:nth-child(1) {
        ${font.size[14]}
        ${font.weight[700]}
            margin-bottom: 4px;
      }
      &:nth-child(2) {
        ${font.size[14]}
        ${font.weight[400]}
      }
    }
    .btnContainer {
      display: flex;
      justify-content: space-between;
      width: 264px;
    }
    .btnWrap {
      width: 60px;
      height: 60px;
    }
    .imgWrap {
      width: 32px;
      height: 32px;
    }
    .userData {
      display: flex;
      align-items: center;
      > :nth-child(2) {
        margin-left: 16px;
      }
    }
  `;

  const ableImg = [
    '/img/heart-main.png',
    '/img/chatting.png',
    '/img/report-main.png',
    '/img/bookmark-main.png',
  ];

  const onClick = (e: React.MouseEvent) => {
    console.log('e.target :>> ', e.currentTarget);
  };

  const imgEl = (el: string, i: number) => {
    return i !== 1 ? (
      <Btn white onClick={e => onClick(e)}>
        <div className='imgWrap'>
          <Img src={el} />
        </div>
      </Btn>
    ) : (
      <Btn main onClick={e => onClick(e)}>
        <div className='imgWrap'>
          <Img src={el} />
        </div>
      </Btn>
    );
  };

  const btns = (
    <div className='btnContainer'>
      {ableImg.map((el, i) => {
        return (
          <div className='btnWrap' key={i}>
            {imgEl(el, i)}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className={cx(style)}>
        <div className='userData'>
          <Profile img={null} size={60} smallShadow />
          <div>
            <p>{dummy.response.userNickname}</p>
            <p>{dummy.response.userMajor}</p>
          </div>
        </div>
        {btns}
      </div>
    </>
  );
}

export default PostWriter;
