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
    width: 100%;
  `;
  return (
    <div className={cx(style)}>
      <span>{text.required}</span>
      <span>{text.desc}</span>
    </div>
  );
}
