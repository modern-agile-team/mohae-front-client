import React from 'react';
import styled from '@emotion/styled';
import HotCategories from './Contents/HotCategories';
import UserSearchedKeys from './Contents/UserSearchedKeys';
import { DataListProps } from '../../types/searchComponent/dataList/type';

function DataList(props: DataListProps) {
  const {
    style,
    showFilter,
    userSearched,
    setUerSearched,
    onSubmit,
    onBlur,
    showDataList,
    resetPageNation,
  } = props;

  return (
    <Container showFilter={showFilter} showDataList={showDataList} used={style}>
      <div id="dataListWrap">
        <UserSearchedKeys
          userSearched={userSearched}
          setUerSearched={setUerSearched}
          onSubmit={onSubmit}
          onBlur={onBlur}
          style={style}
        >
          <TitleContainer>최근 검색어</TitleContainer>
        </UserSearchedKeys>
        <HotCategories resetPageNation={resetPageNation} onBlur={onBlur}>
          <TitleContainer>인기 카테고리</TitleContainer>
        </HotCategories>
      </div>
    </Container>
  );
}

export default DataList;

const Container = styled.div<{
  showFilter: boolean;
  showDataList: boolean;
  used: string;
}>`
  width: fit-content;
  height: fit-content;
  position: relative;
  z-index: 4;
  #dataListWrap {
    ${props =>
      !props.showFilter && 'box-shadow: 0px 8px 8px rgba(132, 131, 141, 0.5)'};
    position: absolute;
    background-color: white;
    border-radius: 0px 0px 6px 6px;
    display: flex;
    padding: 12px 0px 32px 24px;
    visibility: ${props => (props.showDataList ? 'visible' : 'hidden')};
    :hover {
      visibility: visible;
    }
    width: ${props => (props.used === 'board' ? '812px' : '648px')};
    height: ${props => (props.used === 'board' ? '240px' : '239px')};
    top: ${props => (props.used === 'board' ? '-4px' : '')};
  }
  &:focus-within {
    border-radius: 6px 6px 0px;
  }
`;

const TitleContainer = styled.p`
  font-size: 18px;
  font-family: 'Regular';
  color: #4f4e5c;
`;
