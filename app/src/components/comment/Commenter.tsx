import styled from '@emotion/styled';
import Img from '../img/Img';
import React, { useState } from 'react';
import { deleteComment } from '../../apis/comment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { setCommentArr } from '../../redux/comment/reducer';
import { CommenterProps } from '../../types/comment/type';

const Commenter = (props: CommenterProps) => {
  const { handleModalView, handleEditingButton, commentIndex } = props;
  const userInfo = useSelector((state: RootState) => state.user.user);
  const [detailsView, setDetailsView] = useState(false);
  const { no } = useParams();
  const dispatch = useDispatch();
  const commentList = useSelector((state: RootState) => state.comment.data);
  const { commentNo, commenterNickname, commenterNo } = useSelector(
    (state: RootState) => state.comment.data[commentIndex],
  );

  const createReportBtn = () => {
    return commenterNo === userInfo?.userNo ? (
      <IconWrapper>
        <Img src="/img/report-light1.png" />
      </IconWrapper>
    ) : (
      <IconWrapper onClick={handleModalView}>
        <Img src="/img/report-main.png" />
      </IconWrapper>
    );
  };

  const handleDeailsView = () => {
    setDetailsView(!detailsView);
  };

  const editButtonClick = () => {
    handleEditingButton();
    handleDeailsView();
  };

  const deleteCommentRequest = () => {
    deleteComment({ no: Number(no), commentNo: commentNo }).then(_ => {
      dispatch(
        setCommentArr(commentList.filter(el => el.commentNo !== commentNo)),
      );
    });
    handleDeailsView();
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
            <IconWrapper onClick={handleDeailsView}>
              <Img src="/img/group.svg" />
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
          <Overlay onClick={handleDeailsView} />
        </>
      )}
    </>
  );
};

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
