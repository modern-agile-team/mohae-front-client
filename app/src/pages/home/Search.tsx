/** @format */

import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, font, radius, shadow } from '../../styles';
import { Img } from '../../components';
import { Link } from 'react-router-dom';

interface Props {
  [key: string]: any;
}
// 리덕스로 바꾸게 되면 서로 연결 되야 하는 데이터나 코드가 리덕스에 저장이 되어야 함
export default function MainSearch({ placeholder }: Props) {
  const text: any = {
    enterWord: '검색어를 입력해 주세요.',
    lastSearchWord: '최근 검색어',
    removeAll: '전체 삭제',
    popularCategory: '인기 카테고리',
  };

  const clickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <form className={style} onSubmit={clickSearch}>
      <input placeholder={text.enterWord} />
      <button onClick={clickSearch} />
      <div>
        <div className={'part words'}>
          <div>
            <div className={'title'}>{text.lastSearchWord}</div>
            <button>{text.removeAll}</button>
          </div>
          <ul>
            <li>
              1<button />
            </li>

            <li>
              2<button />
            </li>

            <li>
              3<button />
            </li>

            <li>
              4<button />
            </li>

            <li>
              5<button />
            </li>
          </ul>
        </div>
        <div className={'part popular'}>
          <div>
            <div className={'title'}>{text.popularCategory}</div>
          </div>
          <ul>
            <li>
              <span>1</span>
              <Link to={'/'}>{'CATEGORY 1'}</Link>
            </li>
            <li>
              <span>2</span>
              <Link to={'/'}>{'CATEGORY 2'}</Link>
            </li>
            <li>
              <span>3</span>
              <Link to={'/'}>{'CATEGORY 3'}</Link>
            </li>
            <li>
              <span>4</span>
              <Link to={'/'}>{'CATEGORY 4'}</Link>
            </li>
            <li>
              <span>5</span>
              <Link to={'/'}>{'CATEGORY 5'}</Link>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}

const style = css`
  padding: 16px 24px;
  border-radius: 6px;
  ${shadow.normal};
  background-color: white;
  width: 100%;
  height: 63px;
  position: absolute;
  overflow: hidden;
  transition: 0.3s all ease-in-out;
  :focus-within {
    height: 302px;
  }

  > input {
    width: 545px;
    height: 31px;
    color: ${color.dark2};
    font-size: 24px;
    line-height: 31px;
    margin-bottom: 32px;
  }

  > button {
    position: absolute;
    z-index: 2;
    top: 16px;
    right: 24px;
    width: 31px;
    height: 31px;
    :hover {
      cursor: pointer;
    }
    background: url('/img/search.png') no-repeat center/contain;
  }

  > div {
    display: flex;
    justify-content: space-between;
    > .part {
      width: 100%;

      height: fit-content;
      margin-bottom: 8px;
      div {
        > .title {
          display: inline-block;
          width: 117px;
          font-size: 18px;
        }
        > button {
          font-size: 12px;
          margin-left: 112px;
        }
      }

      ul {
        li {
          display: flex;
          align-items: center;
          font-size: 14px;
        }
        > :not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }
    > .words {
      padding-right: 23px;
      border-right: solid ${color.light4} 1px;
      li {
        justify-content: space-between;
        button {
          width: 16px;
          height: 16px;
          background: url('/img/close-dark2.png') no-repeat center/contain;
        }
      }
    }
    > .popular {
      padding-left: 24px;
      span {
        ${font.weight[700]};
        color: ${color.main};
      }
      a {
        margin-left: 12px;
      }
    }
  }
`;
