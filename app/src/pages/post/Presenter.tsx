import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { PostIt, Btn, ReportModal,Mosaic, Popup } from '../../components';
import PostBody from '../../components/pagecomp/PostBody';
import PostImgs from '../../components/pagecomp/PostImgs';
import PostInfo from './PostInfo';
import QuickMenu from './QuickMenu';
import useScroll from '../../customhook/useScroll';
import { color, font, radius, shadow } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import type { Board } from './Container';
import Comment from '../../components/comment/Comment';
import { open_login } from '../../redux/modal/reducer';

interface Props {
  requestHandleDeadline: (data: Board) => void;
  view: { [key: string]: boolean };
  setView: (str: string) => void;
  redirectLogin: boolean;
  setRedirectLogin: Dispatch<SetStateAction<boolean>>;
}

function Presenter({
  requestHandleDeadline,
  view,
  setView,
  redirectLogin,
  setRedirectLogin,
}: Props) {
  const reduxData = useSelector((state: RootState) => state.post.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reduxData.response.authorization) {
      setRedirectLogin(true);
    }
  }, []);

  const btnClick = {
    isdeadLine: () => setView('isDeadline'),
    closePopup: () => setRedirectLogin(false),
    login: () => {
      setRedirectLogin(false);
      dispatch(open_login(true));
    },
  };

  const closeBtn = () => {
    const style = css`
      margin: 16px;
      width: 100px;
      height: 43px;
      margin-left: 1028px;
      margin-bottom: 64px;
      visibility: ${reduxData.decoded &&
      reduxData.decoded.userNo === reduxData.response.board.userNo
        ? 'visible'
        : 'hidden'};
    `;
    return (
      <div
        className={cx(style)}
        onClick={() => {
          requestHandleDeadline(reduxData.response.board);
          setView('isDeadline');
        }}
      >
        <Btn main>
          {reduxData.response.board.isDeadline ? '마감 취소' : '마감 하기'}
        </Btn>
      </div>
    );
  };

  const popupText = () => {
    const date = new Date().toISOString();
    if (
      reduxData.response.board.endDate &&
      reduxData.response.board.endDate < date
    ) {
      return '작성 시에 설정하신 기간이 지난 후에는 불가합니다.';
    }
    if (reduxData.response.board.isDeadline) {
      return '마감 되었습니다.';
    } else {
      return '마감 취소 되었습니다.';
    }
  };
  const summaryContainer = css`
    width: 704px;
    height: 127px;
    overflow-y: ${reduxData.response.board.summary ? 'scroll' : 'auto'};
  `;

  return (
    <>
      <ReportModal
        visible={view.report}
        close={() => setView('report')}
        board
      />
      <div className={cx(wrap)}>
        <div className="topflexWrap">
          <PostImgs view />
          <div className="sectionWrap">
            <PostInfo close={() => setView('report')} />
            <div className="postIt">
              <PostIt small>
                <div
                  className={cx(summaryContainer)}
                  dangerouslySetInnerHTML={{
                    __html: reduxData.response.board.summary
                      ? reduxData.response.board.summary.replace(/\n/g, '<br/>')
                      : '',
                  }}
                ></div>
              </PostIt>
            </div>
          </div>
        </div>
        <PostBody view />
        <Comment />
        {closeBtn()}
        {useScroll().scrollY > 490 && (
          <div className="quickMenu">
            <QuickMenu close={() => setView('report')} />
          </div>
        )}
      </div>
      {!reduxData.response.authorization && (
        <>
          <Mosaic body />
          <Mosaic img />
        </>
      )}
      {redirectLogin && (
        <>
          <Popup visible={redirectLogin} text1={'로그인 후 이용 부탁드립니다.'}>
            <div className={cx(popupBtn)}>
              <Btn white onClick={btnClick.closePopup}>
                닫기
              </Btn>
            </div>
            <div className={cx(popupBtn)}>
              <Btn main onClick={btnClick.login}>
                로그인
              </Btn>
            </div>
          </Popup>
        </>
      )}
      {view.isDeadline && (
        <Popup
          visible={view.isDeadline}
          text1={popupText()}
          overlay={() => btnClick.isdeadLine}
        >
          <div className={cx(popupBtn)}>
            <Btn main onClick={btnClick.isdeadLine}>
              닫기
            </Btn>
          </div>
        </Popup>
      )}
    </>
  );
}

export default Presenter;

const wrap = css`
  margin-top: 40px;
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -8px, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }

  .topflexWrap {
    display: flex;
    justify-content: space-between;
  }

  .postIt {
    margin-top: 24px;
  }

  .quickMenu {
    position: fixed;
    top: 59px;
    animation: fadeInDown 1s;
  }
  .comments-box {
    padding: 16px 24px 24px 24px;
    margin-bottom: 16px;
  }
  .all-comments {
    ${font.size[16]}
    ${font.weight[700]}
    padding: 0px 0px 16px 0px;
    border-bottom: 1px solid ${color.light4};
    > span {
      color: ${color.dark3};
      ${font.weight[400]}
    }
  }
  .text-box {
    resize: none;
    overflow: hidden;
    width: 100%;
    min-height: 84px;
    padding: 16px;
    margin-top: 16px;
    ${radius[6]}
    ${shadow.inputGray}
  }
  .write-btn {
    width: 100px;
    height: 43px;
    margin-left: 980px;
  }
  .write-img {
    width: 15px;
    height: 15px;
  }
  .summary-container {
  }
`;

const popupBtn = css`
  width: 100px;
  height: 43px;
`;
