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

export default function SelectInfo({ part, next }: Props) {
  const text: { [key: string]: any } = {
    desc: '회원 정보는 마이페이지에서 수정 가능합니다',
    check: '중복확인',
    next: '다음',
    title: {
      phone: '연락처',
      school: '학교',
      major: '전공',
      interested: '관심사',
    },
    placeholder: {
      phone: '번호를 입력해 주세요.',
      school: '학교를 선택해 주세요.',
      major: '전공을 선택해 주세요.',
      interested: '관심사를 선택해 주세요.',
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

  return (
    <div className={cx(style)}>
      <div className={'sub-description'}>
        <span>{text.desc}</span>
      </div>
      <div className={'inputs'}>
        <li>
          <div className={'label'}>{text.title.phone}</div>
          <div className={'select'}>
            <button>{text.placeholder.phone}</button>
            <button className={'option'}>{'naver.com'}</button>
            <button className={'option'}>{'daum.net'}</button>
            <button className={'option'}>{'google.com'}</button>
            <button className={'option'}>{'nate.com'}</button>
            <button className={'arrow-down'}>
              <Img src={'/img/arrow-down-dark3.png'} />
            </button>
          </div>
        </li>
        <li className={'email'}>
          <div className={'label'}>{text.title.school}</div>
          <div className={'select'}>
            <button>{text.placeholder.school}</button>
            <button className={'option'}>{'인덕대학교'}</button>
            <button className={'option'}>{'광운대학교'}</button>
            <button className={'arrow-down'}>
              <Img src={'/img/arrow-down-dark3.png'} />
            </button>
          </div>
        </li>
        <li className={'password'}>
          <div className={'label'}>{text.title.major}</div>
          <div className={'select'}>
            <button>{text.placeholder.major}</button>
            <button className={'option'}>{'naver.com'}</button>
            <button className={'option'}>{'daum.net'}</button>
            <button className={'option'}>{'google.com'}</button>
            <button className={'option'}>{'nate.com'}</button>
            <button className={'arrow-down'}>
              <Img src={'/img/arrow-down-dark3.png'} />
            </button>
          </div>
        </li>
        <li>
          <div className={'label'}>{text.title.interested}</div>
          <div className={'select'}>
            <button>{text.placeholder.interested}</button>
            <button className={'option'}>{'naver.com'}</button>
            <button className={'option'}>{'daum.net'}</button>
            <button className={'option'}>{'google.com'}</button>
            <button className={'option'}>{'nate.com'}</button>
            <button className={'arrow-down'}>
              <Img src={'/img/arrow-down-dark3.png'} />
            </button>
          </div>
        </li>
      </div>
      <div className={'next-btn'} onClick={next}>
        <Btn white>{text.next}</Btn>
      </div>
    </div>
  );
}

const style = css`
  height: fit-content;
  > .sub-description {
    margin-top: 16px;
    font-size: 14px;
    > :first-child {
      color: ${color.main};
      margin-right: 16px;
    }
  }
  > .inputs {
    li {
      margin: 8px 0;
      position: relative;
      height: 52px;
      display: flex;
      align-items: flex-start;
      .label {
        width: 96px;
        text-align: center;
        margin-top: calc((52px - 27px) / 2);
      }
      .select {
        * {
          color: ${color.dark2};
          font-size: 14px;
        }
        width: calc(100% - 96px);
        height: 52px;
        display: flex;
        flex-direction: column;
        background-color: white;
        ${shadow.normal}
        border-radius: 6px;
        overflow: hidden;
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
          padding: 14px 0 14px 16px;
          z-index: 1;
          text-align: left;
          ${shadow.normal};
        }
        :focus-within {
          z-index: 5;
          height: 211px;
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
    }
  }

  .next-btn {
    height: 52px;
  }
`;
