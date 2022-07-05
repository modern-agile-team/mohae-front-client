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

export default function PersonalInfo({}: Props) {
  const text: { [key: string]: any } = {
    required: '*은 필수 항목입니다.',
    desc: '닉네임 미입력 시 이메일이 닉네임으로 설정됩니다.',
    title: {
      name: '이름',
      email: '이메일',
      pw: '비밀먼호',
      nickname: '닉네임',
    },
    placeholder: {
      name: '이름을 입려해 주세요.',
      email: '이메일을 입력해 주세요.',
      pw: '비밀먼호를 입력해 주세요. (8 ~ 15자)',
      repeatPw: '비밀번호를 다시 한번 입력해 주세요.',
      nickname: '닉네임을 입려해 주세요. (3 ~ 8자)',
    },
    check: '중복확인',
    next: '다음',
  };
  const style = css`
    width: calc(100% / 4);
    > .sub-description {
      margin-top: 16px;
      font-size: 14px;
      > :first-child {
        color: ${color.main};
        margin-right: 16px;
      }
    }

    > .inputs {
      li span {
        width: 96px;
        height: 23px;
        text-align: center;
      }
    }
  `;
  return (
    <div className={cx(style)}>
      <div className={'sub-description'}>
        <span>{text.required}</span>
        <span>{text.desc}</span>
      </div>
      <div className={'inputs'}>
        <li>
          <span>{'1'}</span>
          <input id={'name'} type="text" />
        </li>
        <li>
          <span>{'2'}</span>
          <input id={'email'} type="text" />
        </li>
        <li>
          <span>{'3'}</span>
          <input id={'password'} type="text" />
          <input id={'check-password'} type="text" />
        </li>
        <li>
          <span>{'5'}</span>
          <input id={'nickname'} type="text" />
        </li>
      </div>
    </div>
  );
}
