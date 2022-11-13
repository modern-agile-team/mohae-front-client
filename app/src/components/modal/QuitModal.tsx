import { css, cx } from '@emotion/css';
import Img from '../img/Img';
import BasicModal from './BasicModal';

interface Props {
  isOpen: boolean;
  userName: string;
}
export default function QuitModal({ isOpen, userName }: Props) {
  const wrap = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .imgContainer {
      width: 66.4px;
      height: 50px;
      margin-bottom: 12px;
    }
    .title {
      width: 94px;
      height: 31px;
      color: #ff445e;
      margin-top: 12px;
      margin-bottom: 8px;
      font-weight: 700;
      font-size: 24px;
      line-height: 130%;
    }
    .guide {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 58px;
      margin-top: 8px;
      font-weight: 700;
      font-size: 20px;
      line-height: 29px;
      .userName {
        color: #ff445e;
      }
    }
    .warning {
      width: 456px;
      height: 20px;
      margin-top: 8px;
      margin-bottom: 20px;
      * {
        font-weight: 400;
        font-size: 14px;
        line-height: 170%;
      }
      .quit {
        color: #ff445e;
      }
      .quitGuide {
        color: #a7a7ad;
      }
    }
    .pwForm {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .pw {
        width: 97px;
        height: 23px;
        font-weight: 400;
        font-size: 16px;
        line-height: 170%;
        margin-right: 16px;
      }
      .input {
        width: 383px;
        height: 52px;
        left: 657px;
        top: 510px;
        background: #ffffff;
        box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);
        border-radius: 6px;
        padding: 10px;
      }
    }
    .btnContainer {
      margin-top: 20px;
      .quitBtn {
        width: 74px;
        height: 43px;
        left: 722px;
        top: 602px;
        background: #e7e7e8;
        box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
        border-radius: 6px;
        margin-right: 4px;
      }
      .cancelBtn {
        width: 74px;
        height: 43px;
        left: 804px;
        top: 602px;
        background: #ff445e;
        box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
        border-radius: 6px;
        margin-left: 4px;
      }
    }
  `;

  return (
    <BasicModal visible={isOpen}>
      <div className={cx(wrap)}>
        <div className="imgContainer">
          <Img src={'/img/logo.png'} alt="mo-hae-logo" />
        </div>
        <span className="title">회원 탈퇴</span>
        <div className="guide">
          <div>
            <span className="userName">{userName}</span>
            <span> 님의 안전한 회원탈퇴를 위해,</span>
          </div>
          <span>비밀번호를 입력해 주세요.</span>
        </div>
        <div className="warning">
          <span className="quit">회원 탈퇴</span>
          <span className="quitGuide">
            시 모든 정보가 삭제되며, 복구되지않습니다. 신중하게 선택해 주세요.
          </span>
        </div>
        <div className="pwForm">
          <span className="pw">비밀번호</span>
          <input
            className="input"
            type="text"
            id="input"
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
        <div className="btnContainer">
          <button className="quitBtn">탈퇴</button>
          <button className="cancelBtn">취소</button>
        </div>
      </div>
    </BasicModal>
  );
}
