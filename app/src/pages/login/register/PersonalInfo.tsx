/** @format */

import { Img, Btn, Text } from '../../../components';
import { color, shadow } from '../../../styles';
import { css, cx } from '@emotion/css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/root';
import { update_regist_info } from '../../../redux/user/reducer';
import axios from 'axios';
import { ENDPOINT } from '../../../utils/ENDPOINT';
import getToken from '../../../utils/getToken';

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
      password: '비밀먼호',
      nickname: '닉네임',
    },
    placeholder: {
      name: '이름을 입력해 주세요.',
      email: '이메일을 입력해 주세요.',
      password: '비밀먼호를 입력해 주세요.',
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
      > :first-child {
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
          > :first-child {
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
      > .email > :not(:first-child, :last-child) {
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
    console.log('target :>> ', target);
    e.preventDefault();
    e.stopPropagation();
    setInputValue({ ...inputValue, [target]: e.currentTarget.value });
  };

  const focusSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFocus(!focus);
  };

  const clickCompanyHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.value;
    setInputValue({ ...inputValue, emailCompany: target });
    setFocus(false);
  };

  const clickCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    axios
      .post(
        `${ENDPOINT}profile/check-nickname`,
        {
          no: null,
          nickname: inputValue.nickname,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        },
      )
      .then(res => {
        if (res.data.success) setIsValid(true);
      })
      .catch(err => alert(err.response.data.error.message));
  };

  const clickNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 조건 통과 안 하고 다음 누르고 싶으면 아래 if문 세개 주석 ㄱㄱ
    if (
      !inputValue.name.length ||
      !inputValue.email.length ||
      !inputValue.password.length ||
      !inputValue.nickname.length
    ) {
      alert('모든 필수 항목을 작성해주세요.');
      return;
    }
    if (inputValue.emailCompany === text.selectEmail) {
      alert('메일 주소를 선택해주세요.');
      return;
    }
    if (inputValue.password !== inputValue.checkPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!isValid) {
      alert('닉네임 중복체크를 해주세요');
      return;
    }

    const finalRegistInfo: Object = {
      ...registInfo,
      ...inputValue,
      email: `${inputValue.email}@${inputValue.emailCompany}`,
    };
    delete finalRegistInfo.emailCompany;
    delete finalRegistInfo.checkPassword;

    dispatch(update_regist_info(finalRegistInfo));
    next();
  };

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
              <Img src={'/img/arrow-down-dark3.png'} />
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
        <div className={'next-btn'} onClick={clickNext}>
          <Btn white>{text.next}</Btn>
        </div>
      )}
    </div>
  );
}
