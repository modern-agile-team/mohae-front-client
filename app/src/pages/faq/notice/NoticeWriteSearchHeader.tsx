import React from "react";
import { css, cx } from "@emotion/css";
import Search from "./NoticeWriteSearch";
import Header from "./NoticeWriteheader";

const serchHeader = () => {
  return (
    <div className={cx(wholeStyle)}>
      <Header />
      <div className={cx(searchStyle)}>
        <Search />
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
