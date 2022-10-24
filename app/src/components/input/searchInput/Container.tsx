import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ContainerProps } from '../../../types/searchComponent/searchInput/type';
import Presenter from './Presenter';

function Container(props: ContainerProps) {
  const {
    showFilter,
    setShowFilter,
    userSearched,
    setUerSearched,
    onBlur,
    onFocus,
    used,
  } = props;
  const [value, setValue] = useState<string>('');
  const { no } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (query: string): string | null => {
    return searchParams.get(query);
  };

  const sortQuery = () => {
    if (getParams('popular') !== null) {
      return '&popular=1';
    } else return `&sort=${getParams('sort')}`;
  };

  const saveInputValue = () => {
    localStorage.setItem(
      'currentSearch',
      JSON.stringify([value, ...userSearched]),
    );
    setUerSearched(JSON.parse(localStorage.getItem('currentSearch') || '[]'));
  };

  const onSubmit = (
    e: React.MouseEvent | React.FormEvent<HTMLFormElement> | React.ChangeEvent,
  ) => {
    e.preventDefault();
    setValue('');
    if (value === getParams('title')) return;

    const query = `?categoryNo=${
      no || 1
    }&title=${value}${sortQuery()}&target=${getParams(
      'target',
    )}&date=${getParams('date')}&free=${getParams('free')}&min=${getParams(
      'min',
    )}&max=${getParams('max')}&areaNo=${getParams('areaNo')}`;

    if (value.length > 1) {
      setSearchParams(query);
      if (used === 'main') {
        navigate('boards/categories/1' + query);
      }
      saveInputValue();
      setValue('');
    } else {
      alert('두 글자 이상 검색 가능합니다.');
      setValue('');
    }
  };

  return (
    <Presenter
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      value={value}
      setValue={setValue}
      onSubmit={onSubmit}
      onBlur={onBlur}
      onFocus={onFocus}
      used={used}
    ></Presenter>
  );
}

export default Container;
