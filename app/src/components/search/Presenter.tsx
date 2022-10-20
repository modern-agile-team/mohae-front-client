import React, { useState } from 'react';
import Input from '../input/searchInput/Input';
import Filter from '../filter/Container';
import DataList from '../dataList/DataList';
import styled from '@emotion/styled';
import { PresenterProps } from '../../types/searchComponent/type';

function Presenter(props: PresenterProps) {
  const {
    style,
    userSearched,
    setUerSearched,
    value,
    setValue,
    onSubmit,
    resetPageNation,
  } = props;

  const [showFilter, setShowFilter] = useState(false);
  const [showDataList, setShowDataList] = useState(false);
  const onBlur = () => {
    setShowDataList(false);
  };

  const onFocus = () => {
    if (showFilter) {
      return;
    } else {
      setShowDataList(true);
    }
  };

  return (
    <Wrapper>
      <Input
        value={value}
        setValue={setValue}
        style={style}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        onSubmit={onSubmit}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <DataList
        style={style}
        showFilter={showFilter}
        userSearched={userSearched}
        setUerSearched={setUerSearched}
        onSubmit={onSubmit}
        onBlur={onBlur}
        showDataList={showDataList}
        resetPageNation={resetPageNation}
      />
      {showFilter && (
        <Filter setShowFilter={setShowFilter} onSubmit={onSubmit} />
      )}
    </Wrapper>
  );
}

export default Presenter;

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  z-index: 4;
  &:focus-within #inputWrap {
    border-radius: 6px 6px 0px 0px;
  }
`;
