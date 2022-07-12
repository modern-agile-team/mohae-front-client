import { css, cx } from "@emotion/css";

const TextArea = () => {
  return (
    <div className={cx(wrap)}>
      <textarea
        placeholder="본문을 입력해 주세요. (최대 100자)"
        className={cx(TextOfArticle)}
      />
    </div>
  );
};
export default TextArea;

const wrap = css`
  display: flex;
  justify-content: center;
  width: 936px;
  height: 397px;
  align-items: center;
  background: #ffffff;
  box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);
`;
const TextOfArticle = css`
  width: 888px;
  height: 365px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 170%;
  color: #84838d;
  word-break: normal;
  outline: none;
  border: 0px;
  resize: none;
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
