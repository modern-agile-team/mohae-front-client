import React from 'react';
import { css, cx } from '@emotion/css';

interface Props {
  param?: string;
}

const header = ({ param }: Props) => {
  return (
    <div className={cx(topWrap)}>
      <div className={cx(MainTitle)}>고객지원</div>
      <div className={cx(subTitle)}>
        {param === 'notices' ? '공지사항' : 'FAQ'}
      </div>
    </div>
  );
};
export default header;
const response = 1;

const topWrap = css`
  display: flex;
  align-items: baseline;
  margin-left: 190px;
`;
const MainTitle = css`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 130%;
  color: #4f4e5c;
  margin-right: 16px;
`;
const subTitle = css`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  color: #4f4e5c;
`;
