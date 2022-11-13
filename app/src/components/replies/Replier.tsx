import styled from '@emotion/styled';
import Img from '../img/Img';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { setCommentArr } from '../../redux/comment/reducer';
import { deleteReply } from '../../apis/replies';
import { ReplierProps } from '../../types/replies/type';

const Replier = (props: ReplierProps) => {
  const { handleModalView, commentIndex, replyIndex, handleEditingButton } =
    props;
  const userInfo = useSelector((state: RootState) => state.user.user);
  const [detailsView, setDetailsView] = useState(false);
  const dispatch = useDispatch();
  const commentList = useSelector((state: RootState) => state.comment.data);
  const { replyNo, replyWriterNo } = useSelector(
    (state: RootState) => state.comment.data[commentIndex].replies[replyIndex],
  );
  const { commentNo } = useSelector(
    (state: RootState) => state.comment.data[commentIndex],
  );

  const createReportBtn = () => {
    return replyWriterNo === userInfo?.userNo ? (
      <IconWrapper>
        <Img src="/img/report-light1.png" alt="reply-report-disable" />
      </IconWrapper>
    ) : (
      <IconWrapper onClick={handleModalView}>
        <Img src="/img/report-main.png" alt="reply-report-able" />
      </IconWrapper>
    );
  };

  const handleDetailsView = () => {
    setDetailsView(!detailsView);
  };

  const editButtonClick = () => {
    handleEditingButton();
    handleDetailsView();
  };

  const deleteReplyRequest = () => {
    deleteReply({ no: commentNo, replyNo: replyNo }).then(_ => {
      const newCommentArr = commentList.filter((_, i) => {
        return i !== commentIndex;
      });

      newCommentArr.splice(commentIndex, 0, {
        ...commentList[commentIndex],
        replies: [...commentList[commentIndex].replies].filter(
          el => el.replyNo !== replyIndex,
        ),
      });
      dispatch(setCommentArr(newCommentArr));
    });
  };

  return (
    <>
      <Wrapper>
        <div className="left">
          <h3>{userInfo?.nickname}</h3>
          {createReportBtn()}
        </div>
        {replyWriterNo === userInfo?.userNo && (
          <div className="right">
            <IconWrapper onClick={handleDetailsView}>
              <Img src="/img/group.svg" alt="reply-details-view" />
            </IconWrapper>
          </div>
        )}
      </Wrapper>
      {detailsView && (
        <>
          <RelativeWrapper>
            <MoreDetails>
              <span onClick={editButtonClick}>수정하기</span>
              <span onClick={deleteReplyRequest}>삭제하기</span>
            </MoreDetails>
          </RelativeWrapper>
          <Overlay onClick={handleDetailsView} />
        </>
      )}
    </>
  );
};

export default Replier;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
  }
  h3 {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 170%;
    color: #4f4e5c;
  }
`;

const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 11px;
  cursor: pointer;
`;

const RelativeWrapper = styled.div`
  position: relative;
  top: 0px;
  right: 0px;
`;

const MoreDetails = styled.div`
  width: 100px;
  height: 90px;
  border-radius: 6px;
  padding: 12px 6px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0px;
  right: 0px;
  span:last-child {
    border-top: 1px solid #e7e7e8;
    padding-top: 8px;
  }
  span {
    color: #4f4e5c;
    font-size: 14px;
    font-family: 'Medium';
    width: 100%;
    height: 50%;
    text-align: center;
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: inherit;
`;
