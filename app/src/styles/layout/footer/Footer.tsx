/** @format */

import { ReactElement } from 'react';
import { color, shadow } from '../../style/palette';
import { css, cx } from '@emotion/css';
import { Img } from '../../../components';

const style = css`
  height: 120px;
  width: 100%;
  background-color: white;
  ${shadow.normal}

  @media (max-width: 1200px) {
    padding: 20px calc(calc(1200px - 1128px) / 2);
  }
  @media (min-width: 1200px) {
    padding: 20px calc((100vw - 1128px) / 2);
  }
  color: ${color.dark1};
  &,
  * {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .icon-wrapper {
    height: 24px;
    width: 72px;
    flex-direction: row;
    justify-content: space-between;
    > * {
      width: 24px;
      height: 24px;
    }
    & > :not(:last-child) {
      margin-right: 24px;
    }
  }
`;

export default function Footer(): ReactElement {
  const text = {
    introduce: '© 2022 Modern Agile',
    others: '아이두 마켓 | 동그라미',
  };

  return (
    <div className={cx(style)}>
      <div className={'icon-wrapper'}>
        <button
          onClick={() => {
            window.open(
              'https://modern-agile-official-client.vercel.app/',
              '_blank',
            );
          }}
        >
          <Img src={'/img/medium.png'} alt="modern-agile-medium" />
        </button>
        <button
          onClick={() => {
            window.open(
              'https://www.notion.so/25f5a56ccbe94545be0a4608ca55f026',
              '_blank',
            );
          }}
        >
          <Img src={'/img/notion.png'} alt="modern-agile-notion" />
        </button>
      </div>
      <div>{text.introduce}</div>
      <div>{text.others}</div>
    </div>
  );
}
