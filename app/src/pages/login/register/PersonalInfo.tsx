/** @format */

import {
  Img,
  Poster,
  NewPost,
  Box,
  Profile,
  FocusBar,
  Category,
  BasicModal,
  MarkBox,
  Btn,
  OrderedImg,
  Text,
  Report,
} from '../../../components';
import { radius, font, color, shadow } from '../../../styles';
import { css, cx } from '@emotion/css';

interface Props {
  [key: string]: any;
}

export default function PersonalInfo({ part, next }: Props) {
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
      password: '비밀먼호를 입력해 주세요. (8 ~ 15자)',
      checkPassword: '비밀번호를 다시 한번 입력해 주세요.',
      nickname: '닉네임을 입려해 주세요. (3 ~ 8자)',
    },
  };

  const inputHandler: { [key: string]: any } = {
    name: (e: React.ChangeEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    email: (e: React.ChangeEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    password: (e: React.ChangeEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    checkPassword: (e: React.ChangeEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    nickname: (e: React.ChangeEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
  };

  const clickNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

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
          <input placeholder={text.placeholder.name} id={'name'} type="text" />
        </li>
        <li className={'email'}>
          <div className={'label'}>
            <Text star={16}>{text.title.email}</Text>
          </div>
          <input
            placeholder={text.placeholder.email}
            id={'email'}
            type="text"
          />
          <span>{'@'}</span>
          <div className={'select'}>
            <button>{text.selectEmail}</button>
            <button className={'option'}>{'naver.com'}</button>
            <button className={'option'}>{'daum.net'}</button>
            <button className={'option'}>{'google.com'}</button>
            <button className={'option'}>{'nate.com'}</button>
            <button className={'arrow-down'}>
              <Img src={'/img/arrow-down-dark3.png'} />
            </button>
          </div>
        </li>
        <li className={'password'}>
          <div className={'label'}>
            <Text star={16}>{text.title.password}</Text>
          </div>
          <input
            placeholder={text.placeholder.password}
            id={'password'}
            type="text"
          />
          <input
            placeholder={text.placeholder.checkPassword}
            id={'check-password'}
            type="text"
          />
        </li>
        <li>
          <div className={'label'}>
            <Text star={16}>{text.title.nickname}</Text>
          </div>
          <input
            placeholder={text.placeholder.nickname}
            id={'nickname'}
            type="text"
          />
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

const style = css`
  width: 480px;
  height: fit-content;
  /* background-color: lightblue; */
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
        height: 52px;
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
        :focus-within {
          height: 211px;
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
