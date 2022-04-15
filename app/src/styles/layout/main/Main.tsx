import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../style/palette';
import { ReactElement } from 'react';

const main = css`
  @media (max-width: 1200px) {
    width: calc(1200px / 24 * 16);
  }
  @media (min-width: 1200px) and (max-width: 1600px) {
    width: calc(100vw / 24 * 16);
  }
  @media (min-width: 1600px) {
    width: calc(1600px / 24 * 16);
  }
  height: 675px;

  @media (max-height: 675px) {
    height: calc(675px - 59px);
  }
  @media (min-height: 675px) and (max-height: 900px) {
    height: calc(100vh - 59px);
  }
  @media (min-height: 900px) {
    height: calc(100vh - 59px);
  }
`;

const colors = {
  gray: css`
    background-color: ${color.light2};
  `,
};

type Props = {
  name?: string;
  children?: any;
  [props: string]: boolean | undefined | string | number[] | JSX.Element;
};

export default function Main(props: Props): ReactElement {
  return (
    <>
      <div className={cx(main, colors.gray)}>{props.children}</div>
      <div className={cx(main)}>{props.children}</div>
    </>
  );
}
