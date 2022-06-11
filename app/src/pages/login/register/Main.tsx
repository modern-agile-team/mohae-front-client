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
      <div className={'ssary'}></div>
      <Box size={[100, 43]}>
        <Btn main>{text.signUp}</Btn>
      </Box>
    </>
  );
}
