import React from 'react';
import styled from '@emotion/styled';
import { Img } from '../../../components';

function Succese() {
  const toLogin = () => {
    window.location.replace('/');
  };
  return (
    <Wrapper>
      <Container>
        <ImgWrap width={66} height={50}>
          <Img src="/img/logo.png" alt="mo-hae-logo" />
        </ImgWrap>
        <ImgWrap width={42} height={42}>
          <Img src="/img/complete.png" alt="complete-change-password" />
        </ImgWrap>
        <div>
          <p>비밀번호 변경 완료</p>
          <p>새 비밀번호로 로그인 해주세요.</p>
        </div>
        <ButtonToLogin onClick={toLogin}>
          메인으로 가기
          <ImgWrap width={18} height={18}>
            <Img src="/img/move.png" alt="link-to-main" />
          </ImgWrap>
        </ButtonToLogin>
      </Container>
    </Wrapper>
  );
}

export default Succese;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.body`
  width: 936px;
  height: 540px;
  border-radius: 24px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  margin: 75px 0px;
  padding: 112px 351px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  p {
    color: #4f4e5c;
  }
  p:nth-of-type(1) {
    font-size: 24px;
  }
  p:nth-of-type(2) {
    font-size: 18px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
`;

const ButtonToLogin = styled.button`
  width: 154px;
  height: 43px;
  background-color: #ff445e;
  color: white;
  font-size: 14px;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
`;

const ImgWrap = styled.div<{ width: number; height: number }>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
