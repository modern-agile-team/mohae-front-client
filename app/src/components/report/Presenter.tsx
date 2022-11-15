import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import Img from '../img/Img';
import Box from '../box/Box';
import CheckBoxList from './checkBoxList/CheckBoxList';
import { MainButton } from '../button';
import { CheckList, PresenterProps } from '../../types/report/type';
import { handelReportModal } from '../../redux/modal/reducer';

function Presenter(props: PresenterProps) {
  const { onSubmit, requestForm } = props;
  const dispatch = useDispatch();
  const initialState = {
    list: [
      { checked: false, title: '욕설 / 비방' },
      { checked: false, title: '개인정보 요구' },
      { checked: false, title: '사기' },
      { checked: false, title: '사적인 연락' },
      { checked: false, title: '도배' },
      { checked: false, title: '선정적인 게시물' },
      { checked: false, title: '위협' },
    ],
    text: '',
  };
  const [checkList, setCheckList] = useState<CheckList>(initialState);

  const inputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCheckList({
      ...checkList,
      text: e.currentTarget.value,
    });
  };

  const closeReportModal = () => {
    dispatch(handelReportModal());
  };

  const submitButtonClick = () => {
    onSubmit(requestForm(checkList));
    closeReportModal();
  };

  useEffect(() => {
    return () => setCheckList(initialState);
  }, []);

  return (
    <>
      <Contaoner light size={[384, 480]}>
        <ButtonWrap close onClick={closeReportModal}>
          <Img src="/img/close.png" alt="modal-close" />
        </ButtonWrap>
        <Wrapper>
          <Title>신고 사유 선택</Title>
          <Warring>최대 3개 항목까지 선택 가능합니다.</Warring>
        </Wrapper>
        <div>
          <CheckBoxList checkList={checkList} setCheckList={setCheckList} />
          <TextAreaContainer>
            <Description
              placeholder="직접 입력 (최대 100자)"
              onChange={inputValue}
            />
          </TextAreaContainer>
        </div>
        <Wrapper>
          <ButtonWrap close={false}>
            <MainButton type="button" able={true} onClick={submitButtonClick}>
              전송
            </MainButton>
          </ButtonWrap>
        </Wrapper>
      </Contaoner>
      <Overlay onClick={closeReportModal} />
    </>
  );
}

export default Presenter;

const Contaoner = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: 14;
  padding: 16px 67px 24px 67px;
`;

const TextAreaContainer = styled.div`
  box-shadow: inset 0px 0px 4px rgba(132, 131, 141, 0.2);
  padding: 8px;
  border-radius: 2px;
  margin-bottom: 24px;
`;

const Description = styled.textarea`
  width: 100%;
  height: 96px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  color: #4f4e5c;
  font-size: 12px;
  padding: 0 8px 0 0;
  resize: none;
`;

const Title = styled.p`
  width: fit-content;
  height: 23px;
  color: #4f4e5c;
  font-size: 16px;
  font-family: 'Regular';
`;

const Warring = styled.p`
  width: fit-content;
  height: 14px;
  color: #ff445e;
  font-size: 10px;
  font-family: 'Light';
  margin-bottom: 12px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrap = styled.div<{ close: boolean }>`
  width: ${props => (props.close ? '15px' : '74px')};
  height: ${props => (props.close ? '15px' : '44px')};
  margin-left: ${props => (props.close ? '286px' : '0px')};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 13;
`;
