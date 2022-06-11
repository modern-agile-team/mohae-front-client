import React from 'react';
import { css, cx } from '@emotion/css';
import { Props } from '../../components/button';
import { color, font, radius } from '../../styles';

// target, 카테고리, 제목, d-day, 지역, 작성자여부, 좋아요, 조회수, 가격

function PostInfo(props: Props) {
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
      price: 999999,
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

  // const showDDAY = () => {
  //     //         isDeadline === 1 && 마감
  //     // isDeadline === 0 && 게시중
  //     // (!isDeadline && decimalDay) === null && 상시
  //     // decimalDay !== null 기간
  //   };

  const wrap = css`
    border-bottom: 1px solid ${color.light4};
    width: 736px;
    display: flex;
    justify-content: space-between;
    color: ${color.dark1};
    ${font.weight[400]}

    .sectionWrap1 {
      height: 154px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .title {
        ${font.weight[700]}
        ${font.size[24]}
      display: flex;
        align-items: center;

        :after {
          content: 'D ${dummy.response.decimalDay}';
          width: 47px;
          height: 24px;
          background-color: ${color.main};
          color: white;
          ${font.size[14]}
          ${font.weight[400]}
        text-align: center;
          padding-top: 2px;
          margin: 2px 0px 0px 16px;
        }
      }

      .price {
        margin-bottom: 16px;
        ${font.size[22]}
        ${font.weight[700]}
      }
    }

    .sectionWrap2 {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      ${font.size[12]}

      div:nth-child(1) {
        display: flex;
        justify-content: end;
        margin-top: 4px;
        p:nth-child(1) {
          margin-right: 8px;
          padding-right: 8px;
          border-right: 1px solid ${color.light4};
        }
      }
      div:nth-child(2) {
        display: flex;
        p:nth-child(1) {
          margin-right: 16px;
        }
      }
    }
  `;

  return (
    <div className={cx(wrap)}>
      <div className='sectionWrap1'>
        <div>
          <p className='coordinates'>
            {dummy.response.target ? '구할래요' : '해줄래요'} {'>'} 카테고리{' '}
            {'>'} {dummy.response.categoryName}
          </p>
          <p className='title'>{dummy.response.title}</p>
          <p className='area'>{dummy.response.areaName}</p>
        </div>
        <p className='price'>
          {dummy.response.price
            ? dummy.response.price.toLocaleString() + '원'
            : '무료'}
        </p>
      </div>
      <div className='sectionWrap2'>
        <div className='textBtnWrap'>
          <p>수정하기</p>
          <p>삭제하기</p>
        </div>
        <div className='textBtnWrap'>
          <p>좋아요 {dummy.response.likeCount}개</p>
          <p>조회수 {dummy.response.hit}회</p>
        </div>
      </div>
    </div>
  );
}

export default PostInfo;
