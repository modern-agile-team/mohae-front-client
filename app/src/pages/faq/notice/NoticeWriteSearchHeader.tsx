import React from 'react';
import { css, cx } from '@emotion/css';
import Search from './NoticeWriteSearch';
import Header from './NoticeWriteheader';
import { EditorState } from 'draft-js';

export interface SearchProps {
  setIsWrite: React.Dispatch<React.SetStateAction<boolean>>;
  isWrite: boolean;
  form: {
    title: string;
    description: string;
    postNo: number;
    editForm: boolean;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      postNo: number;
      editForm: boolean;
    }>
  >;
  param?: string;
  onSearch: (searchBy: string) => void;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const serchHeader = ({
  setIsWrite,
  isWrite,
  form,
  setForm,
  param,
  onSearch,
  setEditorState,
}: SearchProps) => {
  return (
    <div className={cx(wholeStyle)}>
      <Header param={param} />
      <div className={cx(searchStyle)}>
        <Search
          setIsWrite={setIsWrite}
          isWrite={isWrite}
          form={form}
          setForm={setForm}
          onSearch={onSearch}
          setEditorState={setEditorState}
        />
      </div>
    </div>
  );
};
export default serchHeader;

const searchStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: right;
`;
const wholeStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;
