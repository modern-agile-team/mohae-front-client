import React from 'react';
import { useParams } from 'react-router-dom';
import { MainButton, WhiteButton } from '../../../../components';
import styled from '@emotion/styled';
import PostUserInteraction from './presenter/PostUserInteraction';
import PostDetails from './presenter/PostDetails';
import { requestDeletePost } from '../../../../apis/post';
import { useDispatch } from 'react-redux';
import { handlePopup } from '../../../../redux/modal/reducer';

function Container() {
  const { no } = useParams();
  const dispatch = useDispatch();
  const popupClose = () => dispatch(handlePopup());

  const clickDeleteButton = () => {
    try {
      requestDeletePost(Number(no)).then(_ =>
        window.location.replace('/boards/categories/1'),
      );
      popupClose();
    } catch (err) {
      alert('알 수 없는 에러가 발생하였습니다.');
    }
  };

  const popupContents = {
    text: '정말 삭제 하시겠습니까?',
    children: (
      <>
        <PopupButton>
          <WhiteButton type="button" able={true} onClick={popupClose}>
            닫기
          </WhiteButton>
        </PopupButton>
        <PopupButton>
          <MainButton type="button" able={true} onClick={clickDeleteButton}>
            삭제하기
          </MainButton>
        </PopupButton>
      </>
    ),
  };

  return (
    <>
      <Wrap>
        <PostDetails />
        <PostUserInteraction popupContents={popupContents} />
      </Wrap>
    </>
  );
}

export default Container;

const Wrap = styled.section`
  display: flex;
  justify-content: space-between;
  color: #4f4e5c;
  font-family: 'Regular';
  border-bottom: 1px solid #e7e7e8;
`;

const PopupButton = styled.div`
  width: 74px;
  height: 43px;
`;
