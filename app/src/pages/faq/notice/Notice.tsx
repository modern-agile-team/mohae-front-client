import { css, cx } from "@emotion/css";
import SideBar from "../notice/NoticeWriteSidebar";
import ArticleTitle from "../notice/NoticeWriteAriticleTitle";
import HeaderSearch from "../notice/NoticeWriteSearchHeader";
import CommetContainer from "../notice/NoticeCommentWrapper";
import TextArea from "../notice/NoticeWriteTextArea";

const Notice = () => {
  return (
    <div className={cx(wholeStyle)}>
      <HeaderSearch />
      <section className={cx(sectionStyle)}>
        <SideBar />
        <article className={cx(container)}>
          <ArticleTitle />
          <TextArea />
          <CommetContainer />
        </article>
      </section>
    </div>
  );
};
export default Notice;

const wholeStyle = css`
  margin: 0 auto;
  width: 1190px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 1128px;
`;
const container = css`
  width: 936px;
  height: fit-content;
  max-height: 696px;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  border-radius: 6px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-left: 24px;
  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
    position: relative;
    left: 300px;
    top: 50px;
    height: 183px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 68, 94, 1);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(231, 231, 232, 1);
    border-radius: 10px;
  }
`;
const sectionStyle = css`
  display: flex;
  margin-top: 24px;
`;
