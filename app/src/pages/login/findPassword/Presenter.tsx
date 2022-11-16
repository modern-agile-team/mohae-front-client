import styled from '@emotion/styled';
import React from 'react';

interface Props {
  inputValue: {
    email: string;
    changePassword: string;
    confirmChangePassword: string;
  };
  showHidenPassword: { [key: string]: boolean };
  popupInfo: { view: boolean; message: string };
  handleHidenPassword: (str: string) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
  submitAble: () => boolean;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>,
  ) => void;
  closePopup: () => void;
}

function Presenter(props: Props) {
  const {
    inputValue,
    showHidenPassword,
    popupInfo,
    handleHidenPassword,
    handleOnChange,
    submitAble,
    onSubmit,
    closePopup,
  } = props;

  return (
    <>
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
              type={'email'}
              value={inputValue.email}
              placeholder="이메일을 입력해 주세요."
              onChange={e => handleOnChange(e, 'email')}
            />
          </section>
          <section>
            <label className="title-label">새 비밀번호</label>
            <div>
              <ShadowLabel>
                <Input
                  type={showHidenPassword.new ? 'text' : 'password'}
                  password
                  value={inputValue.changePassword}
                  placeholder="새로운 비밀번호를 입력해 주세요. (8~15자)"
                  onChange={e => handleOnChange(e, 'changePassword')}
                />
                <img
                  src={
                    showHidenPassword.new
                      ? '/img/hide-password.png'
                      : '/img/show-password.png'
                  }
                  onClick={() => handleHidenPassword('new')}
                />
              </ShadowLabel>
              <ShadowLabel>
                <Input
                  type={showHidenPassword.check ? 'text' : 'password'}
                  password
                  value={inputValue.confirmChangePassword}
                  placeholder="새로운 비밀번호를 다시 한 번 입력해 주세요."
                  onChange={e => handleOnChange(e, 'confirmChangePassword')}
                />
                <img
                  src={
                    showHidenPassword.check
                      ? '/img/hide-password.png'
                      : '/img/show-password.png'
                  }
                  onClick={() => handleHidenPassword('check')}
                />
              </ShadowLabel>
            </div>
          </section>
          <SubmitButton able={submitAble()} onSubmit={onSubmit}>
            변경하기
          </SubmitButton>
        </Container>
      </Wrapper>
    </>
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
  ${props =>
    !props.password
      ? 'box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);'
      : 'background-color: initial;'}
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

const PopupCloseButton = styled.button`
  width: 74px;
  height: 43px;
  background-color: #ff445e;
  color: white;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
`;
