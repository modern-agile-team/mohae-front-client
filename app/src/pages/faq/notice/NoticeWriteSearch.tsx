import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Img } from '../../../components';
import { SearchProps } from './NoticeWriteSearchHeader';
import { EditorState } from 'draft-js';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root';

const search = ({
  setIsWrite,
  isWrite,
  form,
  setForm,
  onSearch,
  setEditorState,
}: SearchProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchItem, setSearchItem] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <div className={cx(container)}>
      <div className={cx(write)} onClick={() => setIsWrite(!isWrite)}>
        {user.manager ? (
          <span
            onClick={() => {
              setForm({
                ...form,
                title: '',
                description: '',
                editForm: false,
                postNo: 0,
              });
              setEditorState(EditorState.createEmpty());
            }}
          >
            {isWrite ? '작성취소' : '작성하기'}
          </span>
        ) : (
          ''
        )}
      </div>
      <form
        className={cx(wrap)}
        onSubmit={e => {
          e.preventDefault();
          onSearch(searchItem);
        }}
      >
        <input
          type="text"
          placeholder="무엇이 궁금한가요?"
          id="placeHolder"
          value={searchItem}
          onChange={e => onChange(e)}
        />
        <div
          className={cx(css`
            width: 16px;
            height: 16px;
          `)}
        >
          <Img src="/img/search.png" alt="search" />
        </div>
      </form>
    </div>
  );
};
export default search;

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: right;
`;
const write = css`
  font-weight: 400;
  font-size: 12px;
  line-height: 20.4px;
  color: #4f4e5c;
  text-align: right;
  margin-bottom: 8px;
  cursor: pointer;
`;
const wrap = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  width: 492px;
  height: 40px;
  background: #ffffff;
  box-shadow: 0px 0px 8px 0px rgba(132, 131, 141, 0.2);
  border-radius: 8px;
  align-items: center;
  color: #84838d;
  #placeHolder {
    width: 428px;
    height: 24px;
    border: 0px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 170%;
  }
  #placeHolder:focus {
    outline: none;
  }
`;
