import React from 'react';
import { css, cx } from '@emotion/css';
import { Img } from '../../../components';

interface Props {
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
  onSubmit: () => void;
}

const articleTitle = ({ form, setForm, onSubmit }: Props) => {
  const dateObject = new Date();
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();

  return (
    <div className={cx(titleWrap)}>
      <div className={cx(left)}>
        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          className={cx(title)}
          onChange={e =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          value={form.title}
        />
        <div className={cx(uploadDate)}>{`${year}년 ${month}월 ${date}일`}</div>
      </div>
      <button className={cx(rightWriteButton)} onClick={() => onSubmit()}>
        <div className={cx(writeButtonText)}>
          {form.editForm ? '수정' : '작성'}
        </div>
        <div
          className={cx(css`
            width: 20px;
            height: 20px;
            padding-left: 8px;
          `)}
        >
          <Img src="/img/write.png" alt="write" />
        </div>
      </button>
    </div>
  );
};
export default articleTitle;

const titleWrap = css`
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
`;
const title = css`
  width: 508px;
  height: 26px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 170%;
  color: #4f4e5c;
  outline: none;
  border: 0px;
`;
const rightWriteButton = css`
  display: flex;
  width: 100px;
  height: 43px;
  align-items: center;
  background-color: #ff445e;
  border: none;
  border-radius: 6px;
  justify-content: center;
  cursor: pointer;
`;
const uploadDate = css`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 170%;
  color: #84838d;
`;
const left = css`
  display: flex;
  flex-direction: column;
`;
const writeButtonText = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 23.8px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`;
