import React from 'react';
import Input from '../input/searchInput/Input';
import Filter from '../filter/Container';
import DataList from '../dataList/DataList';
import styled from '@emotion/styled';
import { PresenterProps } from '../../types/searchComponent/type';

function Presenter(props: PresenterProps) {
  const {
    style,
    showFilter,
    setShowFilter,
    userSearched,
    setUerSearched,
    value,
    setValue,
    onSubmit,
    onBlur,
    onFocus,
    showDataList,
    resetPageNation,
  } = props;

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
        <Filter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          onSubmit={onSubmit}
        />
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
