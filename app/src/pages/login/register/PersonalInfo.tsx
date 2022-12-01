/** @format */

import { Img, Btn, Text } from '../../../components';
import { color, shadow } from '../../../styles';
import { css, cx } from '@emotion/css';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/root';
import { update_regist_info } from '../../../redux/user/reducer';
import { ENDPOINT } from '../../../utils/ENDPOINT';
import styled from '@emotion/styled';
import setInterceptors from '../../../apis/common/setInterceptors';
import { customAxios } from '../../../apis/instance';

interface Object {
  [key: string]: any;
}

export default function PersonalInfo({ part, next }: Object) {
  const text: { [key: string]: any } = {
    required: '*은 필수 항목입니다.',
    desc: '닉네임 미입력 시 이메일이 닉네임으로 설정됩니다.',
    check: '중복확인',
    next: '다음',
    selectEmail: '이메일 선택',
    title: {
      name: '이름',
      email: '이메일',
      password: '비밀번호',
      nickname: '닉네임',
    },
    placeholder: {
      name: '이름을 입력해 주세요.',
      email: '이메일을 입력해 주세요.',
      password: '비밀번호를 입력해 주세요.',
      checkPassword: '비밀번호를 다시 한번 입력해 주세요.',
      nickname: '닉네임을 입력해 주세요. (3 ~ 8자)',
    },
    companies: ['naver.com', 'daum.net', 'gmail.com', 'nate.com'],
  };

  const [inputValue, setInputValue] = useState<Object>({
    name: '',
    email: '',
    emailCompany: '이메일 선택',
    password: '',
    checkPassword: '',
    nickname: '',
  });
  const [focus, setFocus] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const dispatch = useDispatch();
  const registInfo = useSelector((state: RootState) => state.user.registInfo);
  const style = css`
    height: fit-content;
    padding-bottom: 8px;
    > .sub-description {
      margin-top: 16px;
      font-size: 14px;
      > :first-of-type {
        color: ${color.main};
        margin-right: 16px;
      }
    }

    > .inputs {
      margin: 16px 0;
      > .email {
        position: relative;
        > span {
          color: ${color.main};
        }
      }
      li {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        align-content: space-between;
        margin: 8px 0;
        * {
          font-size: 14px;
        }
        > .label {
          padding-left: 4px;
          display: inline-block;
          width: 96px;
          height: 23px;
          font-size: 16px;
          text-align: center;
        }
        input {
          border-radius: 6px;
          ${shadow.inputGray}
          width: 384px;
          height: 100%;
          font-size: 14px;
          padding: 16px;
        }
        #email {
          width: 192px;
        }
        > .select {
          * {
            color: ${color.dark2};
          }
          position: absolute;
          top: 0;
          right: 0;
          width: 146px;
          height: ${`${focus ? '211px' : '52px'}`};
          display: flex;
          flex-direction: column;
          background-color: white;
          ${shadow.normal}
          border-radius: 6px;
          overflow: hidden;
          float: right;
          transition: 0.2s all ease-in-out;
          .option {
            padding: 8px 0;
            :hover {
              background-color: ${color.subtle};
            }
            :active {
              background-color: ${color.lighter};
            }
          }
          > :first-of-type {
            padding: 16px 0 12px 16px;
            z-index: 1;
            text-align: left;
            ${shadow.normal};
          }
        }
        #nickname {
          width: 268px;
          ~ button {
            width: 100px;
            height: 43px;
            margin-left: 16px;
          }
        }
        .arrow-down {
          width: 24px;
          height: 24px;
          position: absolute;
          z-index: 2;
          top: 14px;
          right: 14px;
        }
      }
      > .email > :not(:first-of-type, :last-child) {
        margin-right: 16px;
      }

      .password {
        justify-content: flex-end;
        > #check {
          margin-top: 8px;
        }
      }
    }
    .next-btn {
      height: 52px;
    }
  `;

  const testInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.id;
    e.preventDefault();
    e.stopPropagation();
    setInputValue({ ...inputValue, [target]: e.currentTarget.value });
  };

  const focusSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFocus(!focus);
  };

  const clickCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setInterceptors(customAxios)
      .post(`${ENDPOINT}profile/check-nickname`, {
        no: null,
        nickname: inputValue.nickname,
      })
      .then(res => {
        if (res.data.success) {
          setIsValid(true);
          alert('사용가능한 닉네임입니다');
        }
      })
      .catch(err => alert(err.response.data.error.message));
  };

  const clickCompanyHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.value;
    setInputValue({ ...inputValue, emailCompany: target });
    setFocus(false);
  };

  const clickNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const userInputValueCheck =
      inputValue.emailCompany !== '이메일 선택'
        ? `${inputValue.email.replace(
            /@naver.com$|@daum.net$|@gmail.com$|@nate.com$/g,
            '',
          )}@${inputValue.emailCompany}`
        : inputValue.email;

    const finalRegistInfo: Object = {
      ...registInfo,
      ...inputValue,
      email: userInputValueCheck,
    };
    delete finalRegistInfo.emailCompany;
    delete finalRegistInfo.checkPassword;

    dispatch(update_regist_info(finalRegistInfo));
    next();
  };

  const valid = useMemo(() => {
    if (
      !inputValue.name.length ||
      !inputValue.email.length ||
      !inputValue.password.length ||
      !inputValue.nickname.length ||
      inputValue.emailCompany === text.selectEmail ||
      inputValue.password !== inputValue.checkPassword ||
      !isValid
    )
      return false;
    else return true;
  }, [inputValue, isValid]);

  const selectCompany = text.companies.map((company: string, index: number) => (
    <button
      key={index}
      onClick={clickCompanyHandler}
      className={'option'}
      value={company}
    >
      {company}
    </button>
  ));

  return (
    <div className={cx(style)}>
      <div className={'sub-description'}>
        <span>{text.required}</span>
        <span>{text.desc}</span>
      </div>
      <div className={'inputs'}>
        <li>
          <div className={'label'}>
            <Text star={16}>{text.title.name}</Text>
          </div>
          <input
            value={inputValue.name}
            onChange={testInput}
            placeholder={text.placeholder.name}
            id={'name'}
            type="text"
          />
        </li>
        <li className={'email'}>
          <div className={'label'}>
            <Text star={16}>{text.title.email}</Text>
          </div>
          <input
            value={inputValue.email}
            onChange={testInput}
            placeholder={text.placeholder.email}
            id={'email'}
            type="text"
          />
          <span>{'@'}</span>
          <div className={'select'}>
            <button onClick={focusSelect}>{inputValue.emailCompany}</button>
            {selectCompany}
            <button className={'arrow-down'} onClick={focusSelect}>
              <Img src={'/img/arrow-down-dark3.png'} alt="opener" />
            </button>
          </div>
        </li>
        <li className={'password'}>
          <div className={'label'}>
            <Text star={16}>{text.title.password}</Text>
          </div>
          <input
            value={inputValue.password}
            onChange={testInput}
            placeholder={text.placeholder.password}
            maxLength={15}
            id={'password'}
            type="password"
          />
          <input
            value={inputValue.checkPassword}
            onChange={testInput}
            placeholder={text.placeholder.checkPassword}
            maxLength={15}
            id={'checkPassword'}
            type="password"
          />
        </li>
        <li>
          <div className={'label'}>
            <Text star={16}>{text.title.nickname}</Text>
          </div>
          <input
            value={inputValue.nickname}
            onChange={testInput}
            placeholder={text.placeholder.nickname}
            maxLength={8}
            id={'nickname'}
            type="text"
          />
          <Btn white onClick={clickCheck}>
            {text.check}
          </Btn>
        </li>
      </div>
      {part > 2 && (
        <Button onClick={e => clickNext(e)} disabled={!valid}>
          다음
        </Button>
      )}
    </div>
  );
}

const Button = styled.button`
  width: 480px;
  height: 52px;
  border-radius: 6px;
  background-color: #ff445e;
  box-shadow: 0px 0px 8px 0px #84838d;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;

  &:disabled {
    background-color: #e7e7e8;
  }
`;
