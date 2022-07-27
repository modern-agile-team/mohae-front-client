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
import EmptySpinner from '../../components/emptySpinner/EmptySpinner';
import { setCategorys } from '../../redux/board/reducer';
import { setInitialState } from '../../redux/post/reducer';

interface PostData {
  decimalDay: number | null;
  no: number;
  title: string;
  isDeadline: number;
  photoUrl: string | null;
  price: number | null;
  target: number;
  areaNo: number;
  areaName: string;
  userNickname: string;
}

export interface Data {
  response: PostData[];
}

function Presenter() {
  const reduxData = useSelector((state: RootState) => state.board.response);
  const dispatch = useDispatch();
  const { no } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const getPrams = (query: string): any => {
    return searchParams.get(query);
  };

  const filteringQuery = () => {
    const queryBase = `&categoryNo=${no}&title=${decodeURIComponent(
      getPrams('title'),
    )}&target=${getPrams('target')}&date=${getPrams('date')}&free=${getPrams(
      'free',
    )}&min=${getPrams('min')}&max=${getPrams('max')}&areaNo=${
      getPrams('areaNo') !== '0' ? getPrams('areaNo') : null
    }`;
    return getPrams('popular') !== null
      ? queryBase + `&popular=${getPrams('popular')}`
      : queryBase + `&sort=${getPrams('sort')}`;
  };

  const getData = () => {
    const filteringBaseURL = `https://mo-hae.site/boards/filter?take=12&page=1`;
    const categoryBaseURL = `https://mo-hae.site/boards/category/${no}?take=12&page=1`;

    axios
      .get(
        location.search ? filteringBaseURL + filteringQuery() : categoryBaseURL,
      )
      .then(res => dispatch(setCategorys(res.data.response)))
      .catch(err => console.log('err', err));
  };

  useEffect(() => {
    getData();
    dispatch(setInitialState());
  }, [location.search, no]);

  const createPost = () => {
    const gap = (i: number) => css`
      margin-top: 24px;
      margin-right: ${i % 4 && '16px'};
    `;
    const showContents = () => {
      if (!reduxData.length && searchParams.get('title')) {
        return <EmptySpinner searchNone text={searchParams.get('title')} />;
      } else if (!reduxData.length) {
        return (
          <EmptySpinner
            boardNone
            text={categories[Number(no) - 1].name + ' 게시판'}
          />
        );
      } else {
        return reduxData.map((el: any, i: any) => (
          <Link key={i} className={cx(gap(i + 1))} to={`/post/${el.no}`}>
            <Poster data={reduxData[i]} />
          </Link>
        ));
      }
    };
    return showContents();
  };

  return (
    <>
      <div className={cx(title)}>
        {categories[Number(no) - 1].name}&nbsp;게시판
      </div>
      <Categories num={7} />
      <div className={cx(style.wrap(0))}>
        <Search board />
        <div className={cx(style.btn)}>
          <Link to={'/write'}>
            <Btn main>
              <p>글쓰기</p>
              <div className="imgWrap">
                <Img src="/img/write.png" />
              </div>
            </Btn>
          </Link>
        </div>
      </div>
      <div className={cx(style.wrap(2))}>
        <div className={cx(style.wrap(1))}>
          총&nbsp;<p>{reduxData.length}</p>
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

const categories = [
  { no: '1', name: '전체' },
  { no: '2', name: '디자인' },
  { no: '3', name: 'IT/개발' },
  { no: '4', name: '사진/영상' },
  { no: '5', name: '기획/마케팅' },
  { no: '6', name: '번역/통역' },
  { no: '7', name: '문서작업' },
  { no: '8', name: '컨설팅' },
  { no: '9', name: '법률' },
  { no: '10', name: '과외/레슨' },
  { no: '11', name: '상담/운세' },
  { no: '12', name: '이벤트' },
  { no: '13', name: '핸드메이드' },
  { no: '14', name: '취미' },
  { no: '15', name: '생활서비스' },
  { no: '16', name: '기타' },
];
