import React, { useState } from 'react';
import styled from '@emotion/styled';
import Img from '../img/Img';
import { deleteComment } from '../../apis/comment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { setCommentArr } from '../../redux/comment/reducer';
import { CommenterProps } from '../../types/comment/type';
import { handelReportModal } from '../../redux/modal/reducer';

function Commenter(props: CommenterProps) {
  const { handleEditingButton, commentIndex } = props;
  const [detailsView, setDetailsView] = useState(false);
  const { userInfo, commentList, commentNo, commenterNo, commenterNickname } =
    useSelector((state: RootState) => ({
      userInfo: state.user.user,
      commentList: state.comment.data,
      commentNo: state.comment.data[commentIndex].commentNo,
      commenterNo: state.comment.data[commentIndex].commenterNo,
      commenterNickname: state.comment.data[commentIndex].commenterNickname,
    }));
  const dispatch = useDispatch();
  const { no } = useParams();

  const reportModalOpen = () => {
    dispatch(handelReportModal('user'));
  };

  const createReportBtn = () => {
    return commenterNo === userInfo?.userNo ? (
      <IconWrapper>
        <Img src="/img/report-light1.png" alt="report-disable" />
      </IconWrapper>
    ) : (
      <IconWrapper onClick={reportModalOpen}>
        <Img src="/img/report-main.png" alt="report-able" />
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

  const deleteCommentRequest = () => {
    deleteComment({ no: Number(no), commentNo: commentNo }).then(_ => {
      dispatch(
        setCommentArr(commentList.filter(el => el.commentNo !== commentNo)),
      );
    });
    handleDetailsView();
  };

  return (
    <>
      <Wrapper>
        <div className="left">
          <h3>{commenterNickname}</h3>
          {createReportBtn()}
        </div>
        {commenterNo === userInfo?.userNo && (
          <div className="right">
            <IconWrapper onClick={handleDetailsView}>
              <Img src="/img/group.svg" alt="comment-details-view" />
            </IconWrapper>
          </div>
        )}
      </Wrapper>
      {detailsView && (
        <>
          <RelativeWrapper>
            <MoreDetails>
              <span onClick={editButtonClick}>수정하기</span>
              <span onClick={deleteCommentRequest}>삭제하기</span>
            </MoreDetails>
          </RelativeWrapper>
          <Overlay onClick={handleDetailsView} />
        </>
      )}
    </>
  );
}

export default Commenter;

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
