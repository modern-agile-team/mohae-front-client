import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, Img, Poster, Search } from '../../components';
import { color, font, radius } from '../../styles';
import { Link } from 'react-router-dom';
import Categories from '../../components/category/Categories';

interface PostData {
  decimalDay: number | null;
  no: number;
  title: string;
  isDeadline: number;
  price: number | null;
  target: number;
  areaNo: number;
  areaName: string;
  userNickname: string;
}

interface Props {
  data: {
    boardNum: number;
    boards: PostData[];
    categoryName: string;
  };
}

function Presenter({ data }: Props) {
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
          overflow: hidden;
          width: 100%;
          flex-wrap: wrap;
          margin-bottom: 64px;
          padding-bottom: 16px;
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
    return data.boards.map((el, i) => (
      <Link key={i} className={cx(gap(i + 1))} to={`/post/${el.no}`}>
        <Poster data={data.boards[i]} />
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

  return (
    <>
      <div className={cx(title)}>{data.categoryName}</div>
      <Categories num={7} />
      <div className={cx(style.wrap(0))}>
        <Search board />
        <div className={cx(style.btn)}>
          <Link to={'/write'}>
            <Btn main>
              <p>글쓰기</p>
              <div className='imgWrap'>
                <Img src='/img/write.png' />
              </div>
            </Btn>
          </Link>
        </div>
      </div>
      <div className={cx(style.wrap(1))}>
        총&nbsp;<p>{data.boards.length.toLocaleString()}</p>&nbsp;건의 게시물
      </div>
      <div className={cx(style.wrap(2))}>{createPost()}</div>
    </>
  );
}

export default Presenter;
