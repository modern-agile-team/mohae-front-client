import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, Img, Poster, Search } from '../../components';
import { color, font, radius } from '../../styles';
import { Link } from 'react-router-dom';
import Categories from '../../components/category/Categories';

function Board() {
  const dummy = {
    response: {
      allBoardNum: 9,
      boards: [
        {
          decimalDay: -6,
          no: 10,
          title: '제목임',
          isDeadline: 0,
          price: 999999,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: '닉네임임자있음',
        },
        {
          decimalDay: null,
          no: 10,
          title: '기이이이이이이이이ㅣ이이이이인제제제목',
          isDeadline: 0,
          price: 1000000,
          target: 0,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: '닉네임자있음',
        },
        {
          decimalDay: -14,
          no: 10,
          title: '그냥 제목임요',
          isDeadline: 0,
          price: null,
          target: 0,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: '왕의 관상 김성제',
        },
        {
          decimalDay: 6,
          no: 10,
          title: '나도 제목인데?',
          isDeadline: 1,
          price: null,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: '관리자_심서현',
        },
        {
          decimalDay: 12,
          no: 10,
          title: '오 나도 제목인데 ㅋㅋㅋ',
          isDeadline: 1,
          price: 300000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: '응애 심서현',
        },
        {
          decimalDay: 0,
          no: 10,
          title: '내가 진짜 제목임요',
          isDeadline: 1,
          price: 37000,
          target: 0,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: '난 응애 김성제',
        },
        {
          decimalDay: 6,
          no: 10,
          title: '아니 뭐이리 제목이 많아',
          isDeadline: 1,
          price: 1000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: '넌 누구얌',
        },
        {
          decimalDay: -111,
          no: 10,
          title: '열네자짜리제목열ㅇㅇㅇㅇㅇ/ㅇ',
          isDeadline: 0,
          price: null,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: '나는 긴 닉네임이야',
        },
        {
          decimalDay: -90,
          no: 10,
          title: '누구...?',
          isDeadline: 0,
          price: 889000,
          target: 0,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: '길다아아란닉네임',
        },
      ],
    },
  };

  const title = css`
    width: 100%;
    height: 36px;
    ${font.size[28]}
    ${font.weight[700]}
    color: ${color.dark1};
    display: flex;
    justify-content: center;
    margin: 40px 0px 48px 0px;
  `;

  const style = {
    wrap: function (num: number) {
      const common = css`
        display: flex;
        align-items: center;
      `;

      const wrap = [
        css`
          ${common}
          justify-content: space-between;
          width: 936px;
          margin: 64px auto 32px;
        `,
        css`
          ${common}
          color: ${color.dark1};
          p {
            color: ${color.main};
          }
        `,
        css`
          ${common}
          width: 100%;
          flex-wrap: wrap;
          margin-bottom: 64px;
        `,
      ];
      return wrap[num];
    },

    btn: css`
      width: 100px;
      height: 43px;
      .imgWrap {
        width: 15px;
        height: 15px;
      }
    `,
  };

  const createPost = () => {
    const gap = (i: number) => css`
      margin-top: 24px;
      margin-right: ${i % 4 && '24px'};
    `;
    return dummy.response.boards.map((el, i) => (
      <Link key={i} className={cx(gap(i + 1))} to='/post'>
        <Poster data={dummy.response.boards[i]} />
      </Link>
    ));
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', e => {
  //     const scrollY = Math.round(window.scrollY);
  //     scrollY / 1250 === 0 && console.log(scrollY);
  //   });
  //   스크롤 정도에 따라 게시물 요청 후 setPost 한 후 createPost()
  // });

  //1250

  const onClick = {
    linkClick: () => {
      console.log('링크클릭 :>> ');
    },
    postClick: () => {
      console.log('게시물클릭 :>> ');
    },
  };

  return (
    <>
      <div className={cx(title)}>전체 게시판</div>
      <Categories num={7} />
      <div className={cx(style.wrap(0))}>
        <Search board />
        <div className={cx(style.btn)}>
          <Link to={'/write'}>
            <Btn main onClick={onClick.linkClick}>
              <p>글쓰기</p>
              <div className='imgWrap'>
                <Img src='/img/write.png' />
              </div>
            </Btn>
          </Link>
        </div>
      </div>
      <div className={cx(style.wrap(1))}>
        총&nbsp;<p>{dummy.response.boards.length.toLocaleString()}</p>&nbsp;건의
        게시물
      </div>
      <div className={cx(style.wrap(2))}>{createPost()}</div>
    </>
  );
}

export default Board;
