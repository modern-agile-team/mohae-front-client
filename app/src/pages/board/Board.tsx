import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, Category, Img, Input, Search } from '../../components';
import { color, font, radius } from '../../styles';
import { Link } from 'react-router-dom';
import Categories from '../../components/category/Categories';

function Board() {
  const dummy = {
    response: {
      allBoardNum: 9,
      boards: [
        {
          decimalDay: 6,
          no: 10,
          title: '123-6',
          isDeadline: 0,
          price: 1000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: 'hneeddjsjde',
        },
        {
          decimalDay: 6,
          no: 10,
          title: '123-6',
          isDeadline: 0,
          price: 1000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: 'hneeddjsjde',
        },
        {
          decimalDay: 6,
          no: 10,
          title: '123-6',
          isDeadline: 0,
          price: 1000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: 'hneeddjsjde',
        },
        {
          decimalDay: 6,
          no: 10,
          title: '123-6',
          isDeadline: 0,
          price: 1000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: 'hneeddjsjde',
        },
        {
          decimalDay: 6,
          no: 10,
          title: '123-6',
          isDeadline: 0,
          price: 1000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: 'hneeddjsjde',
        },
        {
          decimalDay: 6,
          no: 10,
          title: '123-6',
          isDeadline: 0,
          price: 1000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: 'hneeddjsjde',
        },
        {
          decimalDay: 6,
          no: 10,
          title: '123-6',
          isDeadline: 0,
          price: 1000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: 'hneeddjsjde',
        },
        {
          decimalDay: 6,
          no: 10,
          title: '123-6',
          isDeadline: 0,
          price: 1000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: 'hneeddjsjde',
        },
        {
          decimalDay: 6,
          no: 10,
          title: '123-6',
          isDeadline: 0,
          price: 1000,
          target: 1,
          areaNo: 1,
          areaName: '서울특별시',
          userNickname: 'hneeddjsjde',
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
    const dummyStyle = (i: number) => css`
      background-color: ${color.main};
      width: 264px;
      height: 208px;
      ${radius[6]}
      margin-top: 24px;
      margin-right: ${i % 4 && '24px'};
    `;
    return dummy.response.boards.map((el, i) => (
      <div className={cx(dummyStyle(i + 1))} key={i}>
        {i + 1}
      </div>
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
