import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, Img, Poster, Search } from '../../components';
import { color, font } from '../../styles';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Categories from '../../components/category/Categories';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { setCategoryName, setCategorys } from '../../redux/board/reducer';

interface PostData {
  decimalDay: number | null;
  no: number;
  title: string;
  isDeadline: number;
  boardPhoto: string | null;
  price: number | null;
  target: number;
  areaNo: number;
  areaName: string;
  userNickname: string;
}

export interface Data {
  category: { boards: PostData[] };
  categoryName: string;
}

//===========게시판 페이지==========
function Presenter() {
  const reduxData = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const { no } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const getData = () => {
    axios
      .get(
        // location.search
        `https://mo-hae.site/boards/category/${no}?take=12&page=1`
        // : `https://mo-hae.site/boards/filter?categoryNo=${no}&take=12&page=1&title=${searchParams.get(
        //     'title'
        //   )}`
      )
      .then(res => {
        console.log('res.data.response :>> ', res.data.response);
        dispatch(setCategoryName(res.data.response.categoryName));
        dispatch(setCategorys(res.data.response.category));
      })
      .catch(err => console.log('err', err));
  };

  useEffect(() => {
    getData();
  }, [no]);

  const createPost = () => {
    const gap = (i: number) => css`
      margin-top: 24px;
      margin-right: ${i % 4 && '16px'};
    `;
    return reduxData.category.boards.map((el: any, i: any) => (
      <Link key={i} className={cx(gap(i + 1))} to={`/post/${el.no}`}>
        <Poster data={reduxData.category.boards[i]} />
      </Link>
    ));
  };

  return (
    <>
      <div className={cx(title)}>{reduxData.categoryName}</div>
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
      <div className={cx(style.wrap(2))}>
        <div className={cx(style.wrap(1))}>
          총&nbsp;<p>{reduxData.category.boards.length}</p>
          &nbsp;건의 게시물
        </div>
        {createPost()}
      </div>
    </>
  );
}

export default Presenter;

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
        margin: 64px auto 0px;
      `,
      css`
        ${common}
        width: 100%;
        padding-top: 32px;
        color: ${color.dark1};
        p {
          color: ${color.main};
        }
      `,
      css`
        ${common}
        overflow: hidden;
        width: 1128px;
        flex-wrap: wrap;
        margin-bottom: 64px;
        padding-left: 8px;
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
