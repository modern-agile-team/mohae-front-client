import styled from '@emotion/styled';
import {
  ReportModal,
  Mosaic,
  Popup,
  Comment,
  MainButton,
} from '../../components';
import {
  PostImgs,
  PostInfo,
  QuickMenu,
  PostBody,
  PostWriter,
  Summary,
} from './component';
import useScroll from '../../customhook/useScroll';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { PresenterProps } from '../../types/post/type';

function Presenter(props: PresenterProps) {
  const { requestHandleDeadline, modalView, setModalView } = props;
  const { isDeadline, mustLogin, report } = modalView;
  const { response } = useSelector((state: RootState) => state.post.data);
  const { userNo } = useSelector((state: RootState) => state.user.user);
  const scrollY = useScroll().scrollY;

  const handleClosingPostModalView = () => {
    setModalView(prev => {
      return { ...prev, isDeadline: !prev.isDeadline };
    });
  };

  const handleLoginModalView = () => {
    setModalView(prev => {
      return { ...prev, mustLogin: !prev.mustLogin };
    });
  };

  const handleReportModalView = () => {
    setModalView(prev => {
      return { ...prev, report: !prev.report };
    });
  };

  const closingPostBtnClick = () => {
    requestHandleDeadline(response.board);
    setModalView(prev => {
      return { ...prev, isDeadline: !prev.isDeadline };
    });
  };

  const popupText = () => {
    const date = new Date().toISOString();
    if (response.board.endDate && response.board.endDate < date) {
      return '작성 시에 설정하신 기간이 지난 후에는 불가합니다.';
    }
    if (response.board.isDeadline) {
      return '마감 되었습니다.';
    } else {
      return '마감 취소 되었습니다.';
    }
  };

  const createModal = (visible: boolean, text: string, overlay: () => void) => {
    return (
      visible && (
        <Popup visible={visible} text1={text} overlay={() => overlay}>
          <ButtonWrap>
            <MainButton type="button" able={true} onClick={overlay}>
              닫기
            </MainButton>
          </ButtonWrap>
        </Popup>
      )
    );
  };

  const createQuickMenu = () => {
    if (!response.authorization) return;

    return (
      scrollY > 490 && (
        <QuickMenuWrapper>
          <QuickMenu handleReportModalView={handleReportModalView} />
        </QuickMenuWrapper>
      )
    );
  };

  return (
    <>
      <Wrapper>
        <div className="topflexWrap">
          <PostImgs />
          <div className="sectionWrap">
            <PostInfo />
            <PostWriter handleReportModalView={handleReportModalView} />
            <Summary />
          </div>
        </div>
        <PostBody />
        <Comment />
        {userNo === response.board.userNo && (
          <PostClosingButtonWrap onClick={closingPostBtnClick}>
            <MainButton type="button" able={true}>
              {response.board.isDeadline ? '마감 취소' : '마감 하기'}
            </MainButton>
          </PostClosingButtonWrap>
        )}
      </Wrapper>
      {createQuickMenu()}
      {!response.authorization && <Mosaic />}
      {createModal(mustLogin, '로그인 후 이용해주세요.', handleLoginModalView)}
      {createModal(isDeadline, popupText(), handleClosingPostModalView)}
      <ReportModal visible={report} close={handleReportModalView} board />
    </>
  );
}

export default Presenter;

const Wrapper = styled.main`
  margin-top: 40px;
  .topflexWrap {
    display: flex;
    justify-content: space-between;
  }
  .comments-box {
    padding: 16px 24px 24px 24px;
    margin-bottom: 16px;
  }
`;

const QuickMenuWrapper = styled.div`
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
  position: fixed;
  top: 59px;
  animation: fadeInDown 1s;
`;

const ButtonWrap = styled.button`
  width: 100px;
  height: 43px;
`;

const PostClosingButtonWrap = styled.div`
  margin: 16px;
  width: 100px;
  height: 43px;
  margin-left: 1028px;
  margin-bottom: 64px;
`;
