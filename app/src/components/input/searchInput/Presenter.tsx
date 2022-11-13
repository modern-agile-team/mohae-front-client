import React, { useRef } from 'react';
import Img from '../../img/Img';
import styled from '@emotion/styled';
import { PresenterProps } from '../../../types/searchComponent/searchInput/type';

function Presenter(props: PresenterProps) {
  const {
    showFilter,
    setShowFilter,
    value,
    setValue,
    onSubmit,
    onBlur,
    onFocus,
    used,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e);
    inputRef.current?.blur();
  };

  return (
    <FormContainer
      id="inputWrap"
      used={used}
      value={value}
      showFilter={showFilter}
      onSubmit={handleOnSubmit}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      <StyledInput
        used={used}
        type="text"
        placeholder="검색어를 입력해 주세요."
        onChange={e => setValue(e.target.value)}
        value={value}
        ref={inputRef}
      />
      <DeleteInputValueImg
        value={value}
        used={used}
        onClick={() => setValue('')}
      >
        <Img src="/img/close-dark2.png" alt="search-value-delete" />
      </DeleteInputValueImg>
      <hr />
      <SearchIcon used={used} type="submit">
        <div>
          <Img src="/img/search.png" alt="search-magnifier" />
        </div>
      </SearchIcon>
      {used === 'board' && (
        <FilterIcon
          used={used}
          showFilter={showFilter}
          onClick={() => setShowFilter && setShowFilter(!showFilter)}
        >
          <div>
            <Img src="/img/filter.png" alt="filter-opener" />
          </div>
        </FilterIcon>
      )}
    </FormContainer>
  );
}

export default Presenter;

const FormContainer = styled.form<{
  used: string;
  value: string;
  showFilter?: boolean;
}>`
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  border-radius: ${props => (props.showFilter ? '6px 6px 0px 0px' : '6px')};
  display: flex;
  background-color: white;
  cursor: pointer;
  width: ${props => (props.used === 'board' ? '812px' : '648px')};
  height: ${props => (props.used === 'board' ? '43px' : '63px')};
  &:focus-within {
    border-radius: 6px 6px 0px 0px;
  }
  hr {
    visibility: ${props => (props.value ? 'visible' : 'hidden')};
    margin-top: 7px;
    width: 0;
    height: ${props => (props.used === 'board' ? '28px' : '48px')};
    border-left: 2px solid #ededef;
    margin-bottom: 15px;
  }
`;

const StyledInput = styled.input<{ used: string }>`
  margin: ${props =>
    props.used === 'board' ? '12px 0px 0px 32px' : '16px 0px 0px 24px'};
  font-family: 'Regular';
  font-size: ${props => (props.used === 'board' ? '14px' : '24px')};
  color: #4f4e5c;
  width: ${props => (props.used === 'board' ? '663px' : '545px')};
  height: ${props => (props.used === 'board' ? '19px' : '31px')};
  &::placeholder {
    font-family: 'Regular';
    color: #84838d;
    font-size: ${props => (props.used === 'board' ? '14px' : '24px')};
  }
  &::-ms-clear,
  &::-ms-reveal {
    display: none;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

const DeleteInputValueImg = styled.div<{ value: string; used: string }>`
  visibility: ${props => (props.value ? 'visible' : 'hidden')};
  margin: ${props =>
    props.used === 'board' ? '14px 16px 0px 0px' : '18px 16px 0px 0px'};
  width: ${props => (props.used === 'board' ? '15px' : '28px')};
  height: ${props => (props.used === 'board' ? '15px' : '28px')};
`;

const SearchIcon = styled.button<{ used: string }>`
  width: 47px;
  height: 43px;
  margin: ${props => (props.used === 'main' ? '12px 12px 0px 4px' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 6px;
  div {
    width: ${props => (props.used === 'board' ? '18px' : '31px')};
    height: ${props => (props.used === 'board' ? '18px' : '31px')};
  }
`;
const FilterIcon = styled.div<{ used: string; showFilter?: boolean }>`
  width: 47px;
  height: 43px;
  margin: ${props => (props.used === 'main' ? '12px 12px 0px 4px' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 6px;
  background-color: ${props => props.showFilter && '#FCF3F4'};
  box-shadow: ${props =>
    props.showFilter && 'inset 0px 0px 8px rgba(255, 68, 94, 0.2)'};
  div {
    width: ${props => (props.used === 'board' ? '18px' : '31px')};
    height: ${props => (props.used === 'board' ? '18px' : '31px')};
  }
`;
