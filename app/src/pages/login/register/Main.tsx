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
  Report,
} from '../../../components';
import { radius, font, color, shadow } from '../../../styles';
import { css, cx } from '@emotion/css';

interface Props {
  [key: string]: any;
}

export default function Main({ text }: Props) {
  return (
    <>
      <div className={'desc'}>
        <span>{text.description}</span>
        <div>
          <span>{text.mohae}</span>
          <span>{'에 오신 것을 환영합니다.'}</span>
        </div>
        <span>{text.subDesc}</span>
      </div>
      <div className={'ssary'}>
        <Img src={'/img/hello.png'} />
      </div>
      <div
        className={cx(css`
          width: 100px;
          height: 43px;
        `)}
      >
        <Btn main>{text.signUp}</Btn>
      </div>
    </>
  );
}
