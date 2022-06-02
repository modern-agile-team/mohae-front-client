/** @format */

import { css, cx } from '@emotion/css';
import { Img } from '../../components';

export default function Title() {
  const text: { [key: string]: any } = {
    title: '회원 탈퇴',
  };
  return (
    <>
      <div className={'logo'}>
        <Img src={'/img/logo.png'} />
      </div>
      <div className={'bold main'}>{text.title}</div>
    </>
  );
}
