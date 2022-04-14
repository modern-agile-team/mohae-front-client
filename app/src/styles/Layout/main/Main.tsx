import { css, cx } from '@emotion/css';
import { ReactElement } from 'react';

const main = css`
  /* position: absolute;
  top: 0;
  left: 0; */
  /* height: calc(100vh); */

  @media (max-width: 1200px) {
    width: calc(1200px / 24 * 16);
    background-color: #0063f7;
  }
  @media (min-width: 1200px) and (max-width: 1600px) {
    width: calc(100vw / 24 * 16);
    background-color: #00a3f7;
  }
  @media (min-width: 1600px) {
    width: calc(1600px / 24 * 16);
    background-color: #006307;
  }

  @media (max-height: 600px) {
    height: 600px;
    background-color: #0063f7;
  }
  @media (min-height: 600px) and (max-height: 1000px) {
    height: 100vh;
    background-color: #00a3f7;
  }
  @media (min-height: 1000px) {
    height: 1000px;
    background-color: #006307;
  }
`;

type Props = {
  name?: string;
  children?: any;
};

export default function Main(props: Props): ReactElement {
  return <div className={cx(main)}>{props.children}</div>;
}
