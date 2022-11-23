import React from 'react';
import styled from '@emotion/styled';
import { SetNewPasswordProps } from '../../../../types/findPassword/type';

function Presenter(props: SetNewPasswordProps) {
  const { inputValue, showHiden, handleHiden, handleOnChange, onSubmit } =
    props;
  const { email, changePassword, confirmChangePassword } = inputValue;

  const toggleImgSrc = (key: string) => {
    return showHiden[key] ? '/img/hide-password.png' : '/img/show-password.png';
  };

  const submitAble = () => {
    if (email.length && changePassword.length && confirmChangePassword.length)
      return true;
    else return false;
  };

  return (
    <Wrapper>
      <Container onSubmit={onSubmit}>
        <section>
          <p>새 비밀번호 설정</p>
          <p>새로운 비밀번호를 설정해 주세요.</p>
          <Line />
        </section>
        <section>
          <label className="title-label">이메일</label>
          <Input
            name="email"
            type="email"
            value={inputValue.email}
            placeholder="이메일을 입력해 주세요."
            onChange={handleOnChange}
          />
        </section>
        <section>
          <label className="title-label">새 비밀번호</label>
          <div>
            <ShadowLabel>
              <Input
                password
                name="changePassword"
                type={showHiden.new ? 'text' : 'password'}
                value={inputValue.changePassword}
                placeholder="새로운 비밀번호를 입력해 주세요. (8~15자)"
                onChange={handleOnChange}
              />
              <img
                id="new"
                src={toggleImgSrc('new')}
                onClick={() => handleHiden('new')}
              />
            </ShadowLabel>
            <ShadowLabel>
              <Input
                password
                name="confirmChangePassword"
                type={showHiden.check ? 'text' : 'password'}
                value={inputValue.confirmChangePassword}
                placeholder="새로운 비밀번호를 다시 한 번 입력해 주세요."
                onChange={handleOnChange}
              />
              <img
                src={toggleImgSrc('check')}
                onClick={() => handleHiden('check')}
              />
            </ShadowLabel>
          </div>
        </section>
        <SubmitButton able={submitAble()} onSubmit={onSubmit}>
          변경하기
        </SubmitButton>
      </Container>
    </Wrapper>
  );
}

export default Presenter;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.form`
  width: 936px;
  height: 540px;
  border-radius: 24px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  margin: 75px 0px;
  padding: 74px 201px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  p:nth-of-type(1) {
    font-size: 24px;
    font-weight: 700;
    color: #ff445e;
  }
  p:nth-of-type(2) {
    font-size: 14px;
    font-weight: 400;
    color: #4f4e5c;
    margin-bottom: 16px;
  }
  section:nth-of-type(1) {
    text-align: center;
  }
  section:nth-of-type(2),
  section:nth-of-type(3) {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    div {
      width: 384px;
      > label:nth-of-type(2) {
        margin-top: 8px;
      }
    }
  }
  .title-label {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    width: 96px;
    color: #4f4e5c;
  }
`;

const Line = styled.hr`
  width: 480px;
  height: 6px;
  background-color: #e7e7e8;
`;

const Input = styled.input<{ password?: boolean }>`
  width: 384px;
  height: 52px;
  border-radius: 6px;
  box-shadow: ${props =>
    !props.password && 'inset 0px 0px 8px rgba(132, 131, 141, 0.2);'};
  background-color: ${props => props.password && 'initial'};
  padding: 16px;
`;

const SubmitButton = styled.button<{ able: boolean }>`
  width: 480px;
  height: 52px;
  background-color: ${props => (props.able ? '#ff445e' : '#E7E7E8')};
  color: white;
  font-size: 14px;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
`;

const ShadowLabel = styled.label`
  box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  padding-right: 8px;
  > img {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;
