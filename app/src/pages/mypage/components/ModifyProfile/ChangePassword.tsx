import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { changePassword } from '../../../../apis/changePassword';
import { RootState } from '../../../../redux/root';

interface Props {
  setIsChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangePassword({ setIsChangePassword }: Props) {
  const [passwordValue, setPasswordValue] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const user = useSelector((state: RootState) => state.user.user);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue({
      ...passwordValue,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (
      passwordValue.password === '' ||
      passwordValue.newPassword === '' ||
      passwordValue.confirmPassword === ''
    ) {
      alert('빈칸을 입력해주세요');
    } else if (passwordValue.newPassword !== passwordValue.confirmPassword)
      alert('새로운 비밀번호가 다릅니다');

    changePassword({
      email: user.email,
      nowPassword: passwordValue.password,
      changePassword: passwordValue.newPassword,
      confirmChangePassword: passwordValue.confirmPassword,
    })
      .then(res => {
        if (res.data.success) {
          alert('성공적으로 비밀번호가 변경되었습니다');
          setIsChangePassword(false);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Wrapper>
        <Container>
          <section>
            <p>비밀번호 변경하기</p>
            <p>새로운 비밀번호를 설정해 주세요.</p>
            <Line />
          </section>
          <section>
            <label className="title-label">비밀번호</label>
            <Input
              type={'password'}
              name="password"
              placeholder="기존 비밀번호를 입력해주세요."
              value={passwordValue.password}
              onChange={onChange}
            />
          </section>
          <section>
            <label className="title-label">새 비밀번호</label>
            <div>
              <ShadowLabel>
                <Input
                  type={'password'}
                  name="newPassword"
                  placeholder="새로운 비밀번호를 입력해 주세요. (8~15자)"
                  value={passwordValue.newPassword}
                  onChange={onChange}
                />
              </ShadowLabel>
              <ShadowLabel>
                <Input
                  type={'password'}
                  name="confirmPassword"
                  placeholder="새로운 비밀번호를 다시 한 번 입력해 주세요."
                  value={passwordValue.confirmPassword}
                  onChange={onChange}
                />
              </ShadowLabel>
            </div>
          </section>
          <SubmitButton able={true} onClick={e => onSubmit(e)}>
            변경하기
          </SubmitButton>
        </Container>
      </Wrapper>
    </>
  );
}

export default ChangePassword;

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
  position: relative;
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
