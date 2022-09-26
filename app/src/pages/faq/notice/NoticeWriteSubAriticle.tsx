import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Img } from '../../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root';

interface Props {
  notice: {
    no: number;
    title: string;
    description: string;
    createdAt: string;
  };
  key: number;
  onEdit: (no: number, title: string, description: string) => void;
  onDelete: (no: number) => void;
}

function subArticle({ notice, onEdit, onDelete }: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isView, setIsView] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div
      className={cx(
        css`
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #ededef;
          .noncontainer {
            width: 100%;
            padding-left: 24px;
            margin-bottom: 10px;
            display: none;
          }
          .container {
            width: 100%;
            padding-left: 24px;
            margin-bottom: 10px;
            display: flex;
          }
        `,
      )}
    >
      <div className={cx(wrap)}>
        <div className={cx(left)}>
          <div className={cx(title)}>{notice.title}</div>
          <div className={cx(uploadDate)}>{notice.createdAt}</div>
        </div>
        <div className={cx(right)}>
          {user.manager && (
            <div
              className={cx(edit)}
              onClick={() => {
                onEdit(notice.no, notice.title, notice.description);
              }}
            >
              수정
            </div>
          )}
          {user.manager && (
            <div className={cx(d2lete)} onClick={() => onDelete(notice.no)}>
              삭제
            </div>
          )}
          <div
            className={cx(css`
              width: 16px;
              height: 16px;
              cursor: pointer;
            `)}
            onClick={() => setIsView(!isView)}
          >
            <Img
              src={
                !isView
                  ? '/img/arrow-down-dark3.png'
                  : '/img/arrow-up-dark3.png'
              }
            />
          </div>
        </div>
      </div>
      <div
        className={
          isView
            ? 'container'
            : css`
                display: none;
              `
        }
      >
        <div
          className={
            isView
              ? contents
              : css`
                  display: none;
                `
          }
          dangerouslySetInnerHTML={{ __html: notice.description }}
        ></div>
      </div>
    </div>
  );
}
export default subArticle;

const wrap = css`
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
`;
const title = css`
  width: 508px;
  height: 26px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 170%;
  color: #4f4e5c;
  cursor: pointer;
`;
const right = css`
  display: flex;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 170%;
  text-align: right;
  align-items: center;
  color: #84838d;
`;
const edit = css`
  cursor: pointer;
`;
const d2lete = css`
  padding-left: 8px;
  padding-right: 16px;
  cursor: pointer;
`;
const uploadDate = css`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 170%;
  color: #84838d;
  cursor: pointer;
`;
const left = css`
  display: flex;
  flex-direction: column;
`;

const contents = css`
  border-left: 2px solid #ff445e;
  padding-left: 10px;
  width: 90%;
`;
