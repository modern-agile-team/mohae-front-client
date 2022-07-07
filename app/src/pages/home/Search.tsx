/** @format */

import React, { useEffect, useState } from 'react';
import { style } from './searchStyle';
import { Link, useNavigate } from 'react-router-dom';

export default function MainSearch() {
  const categorires = [
    { no: 1, name: '전체' },
    { no: 2, name: '디자인' },
    { no: 3, name: 'IT/개발' },
    { no: 4, name: '사진/영상' },
    { no: 5, name: '기획/마케팅' },
    { no: 6, name: '번역/통역' },
    { no: 7, name: '문서작업' },
    { no: 8, name: '컨설팅' },
    { no: 9, name: '법률' },
    { no: 10, name: '과외/레슨' },
    { no: 11, name: '상담/운세' },
    { no: 12, name: '이벤트' },
    { no: 13, name: '핸드메이드' },
    { no: 14, name: '취미' },
    { no: 15, name: '생활서비스' },
    { no: 16, name: '기타' },
  ];
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
    console.log('searchedWords :>> ');
    const isWords = searchedWords && searchedWords !== 'null';
    if (!searchValue) {
      alert('검색어를 입력해주세요!');
      return;
    }
    if (isWords && JSON.parse(searchedWords).length <= 10) {
      localStorage.setItem(
        'lastSearch',
        JSON.stringify([searchValue, ...JSON.parse(searchedWords)])
      );
    } else if (isWords && JSON.parse(searchedWords).length > 10) {
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

  const lastSearchedWords =
    searchedWords &&
    searchedWords !== 'null' &&
    JSON.parse(searchedWords).length > 0 ? (
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

  const popularCategories = [1, 2, 3, 4, 5].map(
    (num: number, index: number) => (
      <li>
        <span>{index + 1}</span>
        <Link to={`/board/${index + 1}`}>{`CATEGORY ${index + 1}`}</Link>
      </li>
    )
  );

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
          <ul>{popularCategories}</ul>
        </div>
      </div>
    </form>
  );
}
