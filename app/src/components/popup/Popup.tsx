import React from 'react';
import { handlePopup } from '../../redux/modal/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { Box } from '../../components';
import styled from '@emotion/styled';

function Popup() {
  const dispatch = useDispatch();
  const { view, textContents, children } = useSelector(
    (state: RootState) => state.modal.popup,
  );

  const closePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(handlePopup());
  };

  return (
    <>
      {view && (
        <>
          <Container size={[360, 205]} onClick={closePopup}>
            <Text>{textContents}</Text>
            <ButtonWrap>{children}</ButtonWrap>
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

const ButtonWrap = styled.div`
  width: 156px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  & :not(:first-of-type) {
    margin-left: 8px;
  }
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
