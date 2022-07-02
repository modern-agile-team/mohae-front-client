/** @format */

import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, font, radius, shadow } from '../../styles';
import { Img } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { stringify } from 'querystring';

interface Props {
  [key: string]: any;
}
// 리덕스로 바꾸게 되면 서로 연결 되야 하는 데이터나 코드가 리덕스에 저장이 되어야 함
export default function MainSearch({ placeholder }: Props) {
  const navigate = useNavigate();

  const text: any = {
    enterWord: '검색어를 입력해 주세요.',
    lastSearchWord: '최근 검색어',
    removeAll: '전체 삭제',
    popularCategory: '인기 카테고리',
    noSearchedWord: '최근 검색어 내역이 없습니다.',
  };

  const [searchValue, setSearchValue] = useState<string>(''),
    [searchedWords, setSearchedWords] = useState<string | null>(
      localStorage.getItem('lastSearch')
    );

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setSearchValue(inputValue);
  };

  const clickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!searchValue) {
      alert('검색어를 입력해주세요!');
      return;
    }
    if (searchedWords && JSON.parse(searchedWords).length <= 10) {
      localStorage.setItem(
        'lastSearch',
        JSON.stringify([searchValue, ...JSON.parse(searchedWords)])
      );
    } else if (searchedWords && JSON.parse(searchedWords).length > 10) {
      const cloneWords = [...JSON.parse(searchedWords)];
      cloneWords.pop();
      cloneWords.unshift(searchValue);
      console.log('cloneWords :>> ', cloneWords);
      localStorage.setItem('lastSearch', JSON.stringify(cloneWords));
    } else {
      localStorage.setItem('lastSearch', JSON.stringify([searchValue]));
    }

    setSearchValue('');
    navigate(`/${searchValue}`);
  };

  const deleteWord = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const clickedIndex = e.currentTarget.id;
    const cloneWords = searchedWords && [...JSON.parse(searchedWords)];
    const test =
      cloneWords &&
      cloneWords.filter(
        (word: string, index: number) => index !== Number(clickedIndex)
      );
    localStorage.setItem('lastSearch', JSON.stringify(test));
    setSearchedWords(JSON.stringify(test));
  };

  const lastSearchedWords = searchedWords ? (
    JSON.parse(searchedWords).map(
      (word: string, index: number) =>
        index < 5 && (
          <li key={index}>
            {word}
            <button id={`${index}`} onClick={deleteWord} />
          </li>
        )
    )
  ) : (
    <li>{text.noSearchedWord}</li>
  );

  const removeAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchedWords('');
    localStorage.setItem('lastSearch', JSON.stringify(null));
  };

  return (
    <form className={style} onSubmit={clickSearch}>
      <input
        placeholder={text.enterWord}
        onChange={searchHandler}
        value={searchValue}
      />
      <button onClick={clickSearch} />
      <div>
        <div className={'part words'}>
          <div>
            <div className={'title'}>{text.lastSearchWord}</div>
            <button onClick={removeAll}>{text.removeAll}</button>
          </div>
          <ul>{lastSearchedWords}</ul>
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
    :after {
      content: '검색어는 최대 10개만 기록됩니다.';
      position: absolute;
      top: 50px;
      left: 24px;
      color: ${color.main};
      border-radius: 6px;
      @keyframes fadeout {
        0% {
          opacity: 1;
        }
        60% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      animation: fadeout 3s ease-in-out forwards;
    }
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
      div {
        margin-bottom: 8px;
        > .title {
          display: inline-block;
          width: 117px;
          font-size: 18px;
        }
        > button {
          font-size: 12px;
          margin-left: 112px;
          color: ${color.dark2};
        }
      }

      ul {
        li {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: ${color.dark2};
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
