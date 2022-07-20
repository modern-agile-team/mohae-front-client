import React from 'react';
import { css, cx } from '@emotion/css';
import { useNavigate } from 'react-router-dom';

interface Props {
  name: string;
}

function sideBar({ name }: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return (
    <div className={cx(consumerSupport)}>
      <div
        className={name === 'notices' ? cx(noticeSelect) : cx(noticeNonSelect)}
        onClick={() => navigate('/support/notices', { replace: true })}
      >
        <div className={cx(noticeText)}>공지사항</div>
      </div>
      <div
        className={name === 'faqs' ? cx(faqSelect) : cx(faqNonSelect)}
        onClick={() => navigate('/support/faqs', { replace: true })}
      >
        <div className={cx(faqText)}>FAQ</div>
      </div>
    </div>
  );
}
export default sideBar;

const consumerSupport = css`
  width: 168px;
  height: 106px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  border-radius: 6px;
`;
const faqNonSelect = css`
  display: flex;
  width: 168px;
  height: 53px;
  justify-content: center;
  background-color: #ffff;
  margin: 0;
  cursor: pointer;
  color: #4f4e5c;
  border-radius: 0px 0px 6px 6px;
`;
const faqSelect = css`
  display: flex;
  width: 168px;
  height: 53px;
  justify-content: center;
  margin: 0;
  background-color: #ff445e;
  color: #ffffff;
  cursor: pointer;
  border-radius: 0px 0px 6px 6px;
`;
const faqText = css`
  display: flex;
  align-items: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 170%;
  text-align: center;
`;
const noticeSelect = css`
  display: flex;
  justify-content: center;
  left: 236px;
  top: 252px;
  width: 168px;
  height: 53px;
  background-color: #ff445e;
  border-radius: 6px 6px 0 0;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
`;
const noticeNonSelect = css`
  display: flex;
  justify-content: center;
  left: 236px;
  top: 252px;
  width: 168px;
  height: 53px;
  background-color: #fff;
  border-radius: 6px 6px 0 0;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
  align-items: center;
  color: #4f4e5c;
  cursor: pointer;
`;
const noticeText = css`
  display: flex;
  justify-content: center;
  font-family: 'Noto Sans KR';
  font-style: normal;
  width: 168px;
  height: 21px;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
  align-items: center;
`;
