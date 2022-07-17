import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Img } from '../../../components';

interface Props {
  notice: {
    no: number;
    title: string;
    description: string;
    createdAt: string;
  };
  key: number;
}

function subArticle({ notice }: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isView, setIsView] = useState<boolean>(false);

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
          <div className={cx(uploadDate)}>2020년12월12일</div>
        </div>
        <div className={cx(right)}>
          <div className={cx(edit)}>수정</div>
          <div className={cx(d2lete)}>삭제</div>
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
                isView ? `/img/arrow-up-dark3.png` : `/img/arrow-down-dark3.png`
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
        >
          <span>
            안녕하세요 모던 애자일입니다 저희는 개발팀입니다 회장은 누구누구이며
            서비스 개발을 목표로 합니다
          </span>
          <br />
          <span>sdfsrfsdsfsdsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</span>
        </div>
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
`;
