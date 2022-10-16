import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainButton, Popup, WhiteButton } from '../../../../components';
import styled from '@emotion/styled';
import PostUserInteraction from './presenter/PostUserInteraction';
import PostDetails from './presenter/PostDetails';
import { requestDeletePost } from '../../../../apis/post';

function Container() {
  const { no } = useParams();
  const [popupView, setPopupView] = useState(false);

  const handleDeletePopupView = () => {
    setPopupView(prev => !prev);
  };

  const showPopup = () => {
    return (
      popupView && (
        <Popup
          visible={popupView}
          text1={'정말 삭제 하시겠습니까? '}
          text2={'삭제 시 게시판으로 이동합니다.'}
        >
          <PopupButton>
            <WhiteButton
              type="button"
              able={true}
              onClick={handleDeletePopupView}
            >
              닫기
            </WhiteButton>
          </PopupButton>
          <PopupButton>
            <MainButton type="button" able={true} onClick={clickDeleteButton}>
              삭제하기
            </MainButton>
          </PopupButton>
        </Popup>
      )
    );
  };

  const clickDeleteButton = () => {
    try {
      requestDeletePost(Number(no)).then(_ =>
        window.location.replace('/boards/categories/1'),
      );
    } catch (err) {
      alert('알 수 없는 에러가 발생하였습니다.');
    }
  };

  return (
    <>
      <Wrap>
        <PostDetails />
        <PostUserInteraction requestDeleteFunc={handleDeletePopupView} />
      </Wrap>
      {showPopup()}
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
