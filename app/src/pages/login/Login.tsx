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
} from '../../components';
import { radius, font, color, shadow } from '../../styles';
import { css, cx } from '@emotion/css';

interface Props {
  [key: string]: any;
}

export default function Register({ text }: Props) {
  return (
    <>
      <div className={'input'}>
        <div className={'icon'}>
          <Img src={'/img/id.png'} />
        </div>
        <input placeholder={text.placeholder.id} />
      </div>
      <div className={'input'}>
        <div className={'icon'}>
          <Img src={'/img/password.png'} />
        </div>
        <input placeholder={text.placeholder.pw} />
      </div>
      <div className={'option'}>
        <div>
          <input id="keep-login" type="checkbox" />
          <label htmlFor="keep-login">{text.stayLogin}</label>
        </div>
        <button>{text.forgotPw}</button>
      </div>
      <Box size={[480, 52]}>
        <Btn main>{text.login}</Btn>
      </Box>
    </>
  );
}
