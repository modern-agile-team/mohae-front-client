import React, { useState } from 'react';
import Filter from '../filter/Container';
import DataList from '../dataList/DataList';
import styled from '@emotion/styled';
import { PresenterProps } from '../../types/searchComponent/type';
import Container from '../input/searchInput/Container';

function Presenter(props: PresenterProps) {
  const { used, resetPageNation } = props;
  const [showFilter, setShowFilter] = useState(false);
  const [showDataList, setShowDataList] = useState(false);
  const [userSearched, setUerSearched] = useState<string[]>(
    JSON.parse(localStorage.getItem('currentSearch') || '[]'),
  );

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
      <Container
        onBlur={onBlur}
        onFocus={onFocus}
        showFilter={showFilter}
        userSearched={userSearched}
        setUerSearched={setUerSearched}
        setShowFilter={setShowFilter}
        used={used}
      />
      <DataList
        used={used}
        showFilter={showFilter}
        userSearched={userSearched}
        setUerSearched={setUerSearched}
        onBlur={onBlur}
        showDataList={showDataList}
        resetPageNation={resetPageNation}
      />
      {showFilter && <Filter setShowFilter={setShowFilter} />}
    </Wrapper>
  );
}

export default React.memo(Presenter);

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  z-index: 4;
  &:focus-within #inputWrap {
    border-radius: 6px 6px 0px 0px;
  }
`;
