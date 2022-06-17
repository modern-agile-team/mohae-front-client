import { ReactElement } from 'react';
import { color, radius, font, shadow } from '../../style/palette';
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
        <Img src={'/img/notion.png'} />
        <Img src={'/img/medium.png'} />
      </div>
      <div>{text.introduce}</div>
      <div>{text.others}</div>
    </div>
  );
}
