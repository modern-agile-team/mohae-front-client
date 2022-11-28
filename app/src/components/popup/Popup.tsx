import React from 'react';
import { handlePopup } from '../../redux/modal/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { Box, MainButton, WhiteButton } from '../../components';
import styled from '@emotion/styled';

function Popup() {
  const dispatch = useDispatch();
  const { view, textContents, sub } = useSelector(
    (state: RootState) => state.modal.popup,
  );

  const closePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(handlePopup());
  };

  const createButtons = () => {
    return sub.action && sub.text ? (
      <ButtonsWrap>
        <BtnWrapper>
          <WhiteButton type="button" able onClick={closePopup}>
            닫기
          </WhiteButton>
        </BtnWrapper>
        <BtnWrapper>
          <MainButton type="button" able onClick={sub.action}>
            {sub.text}
          </MainButton>
        </BtnWrapper>
      </ButtonsWrap>
    ) : (
      <ButtonsWrap>
        <BtnWrapper>
          <MainButton type="button" able onClick={closePopup}>
            닫기
          </MainButton>
        </BtnWrapper>
      </ButtonsWrap>
    );
  };

  return (
    <>
      {view && (
        <>
          <Container size={[360, 205]}>
            <Text>{textContents}</Text>
            {createButtons()}
          </Container>
          <Overlay onClick={closePopup}></Overlay>
        </>
      )}
    </>
  );
}

export default Popup;

const Container = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 14;
`;

const Text = styled.div`
  width: 312px;
  height: fit-content;
  line-height: 23.8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #4f4e5c;
  font-size: 14px;
  font-family: 'Regular';
`;

const ButtonsWrap = styled.div`
  width: 156px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  & :not(:first-of-type) {
    margin-left: 8px;
  }
`;

const BtnWrapper = styled.div`
  width: 74px;
  height: 43px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 13;
  background-color: rgba(0, 0, 0, 0.3);
`;
