import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation, useSearchParams } from 'react-router-dom';
import Img from '../../img/Img';
import { UserSearchedKeysProps } from '../../../types/searchComponent/dataList/type';

function UserSearchedKeys(props: UserSearchedKeysProps) {
  const { onSubmit, onBlur, userSearched, setUerSearched, used, children } =
    props;
  const { search: queryString } = useLocation();
  const [searchParams, __] = useSearchParams();
  const [_, setSearchQuery] = useState<string | null>(
    searchParams.get('title'),
  );

  const deleteAll = () => {
    localStorage.removeItem('currentSearch');
    setUerSearched([]);
  };

  const deleteList = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLocal = userSearched.filter((_, index) => index != i);
    localStorage.setItem('currentSearch', JSON.stringify(newLocal));
    setUerSearched(newLocal);
  };

  const handleSearchHistory = (
    e: React.MouseEvent | React.FormEvent<HTMLFormElement>,
    searchValue: string,
  ) => {
    setSearchQuery(prev => {
      if (prev === searchValue) {
        return prev;
      } else {
        onSubmit(e, searchValue);
        onBlur();
        return searchValue;
      }
    });
  };

  const searchList = useCallback(() => {
    if (userSearched.length === 0) {
      return (
        <SearchKeysContents used={used} hover={false}>
          <div id="list">최근 검색 내역이 없습니다.</div>
        </SearchKeysContents>
      );
    } else {
      return userSearched.map((el, i) => {
        return (
          i < 5 && (
            <SearchKeysContents
              used={used}
              hover={true}
              key={i}
              onClick={e => handleSearchHistory(e, el)}
            >
              <div id="list">{el}</div>
              <div id="delete" onClick={e => deleteList(i, e)}>
                <Img src="/img/close.png" alt="search-key-delete" />
              </div>
            </SearchKeysContents>
          )
        );
      });
    }
  }, [queryString, userSearched]);

  return (
    <Container used={used}>
      <div id="titleWrap">
        {children}
        <div id="allClear" onClick={deleteAll}>
          전체 삭제
        </div>
      </div>
      {searchList()}
    </Container>
  );
}
export default UserSearchedKeys;

const Container = styled.section<{ used: string }>`
  &,
  #titleWrap {
    width: ${props => (props.used === 'board' ? '376px' : '276px')};
  }
  padding-right: 24px;
  margin-right: ${props => props.used !== 'board' && '16px'};
  #titleWrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0px 8px;
  }
  #allClear {
    width: 56px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    padding: 1px;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Regular';
    color: #84838d;
    :hover {
      background-color: #f9f9f9;
      font-family: 'Bold';
    }
  }
`;

const SearchKeysContents = styled.div<{ used: string; hover: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  cursor: pointer;
  color: #84838d;
  font-size: 14px;
  padding: 0px 8px;
  width: ${props => (props.used === 'board' ? '352px' : '276px')};
  #list {
    height: 32px;
    border-radius: 6px;
    padding-top: 4px;
  }
  #delete {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    padding: 4px;
  }
  &:hover #list {
    font-family: 'Bold';
  }
  #delete:hover {
    background-color: ${props => props.hover && '#e7e7e8'};
  }
`;
