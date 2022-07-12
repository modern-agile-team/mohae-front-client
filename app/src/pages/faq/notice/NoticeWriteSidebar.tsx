import React from "react";
import { css, cx } from "@emotion/css";

function sideBar() {
  return (
    <div className={cx(consumerSupport)}>
      <div className={cx(notice)}>
        <div className={cx(noticeText)}>공지사항</div>
      </div>
      <div className={cx(faq)}>
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
const faq = css`
  display: flex;
  width: 168px;
  height: 53px;
  justify-content: center;
  margin: 0;
  cursor: pointer;
`;
const faqText = css`
  display: flex;
  align-items: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 170%;
  text-align: center;
  color: #4f4e5c;
`;
const notice = css`
  display: flex;
  justify-content: center;
  left: 236px;
  top: 252px;
  width: 168px;
  height: 53px;
  background-color: #ff445e;
  border-radius: 6px 6px 0 0;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
  align-items: center;
  cursor: pointer;
`;
const noticeText = css`
  display: flex;
  justify-content: center;
  font-family: "Noto Sans KR";
  font-style: normal;
  width: 168px;
  height: 21px;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
  align-items: center;
  color: #fff;
`;
