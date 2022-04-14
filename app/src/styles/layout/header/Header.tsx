import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../style/palette';
import { ReactElement } from 'react';

const header = css`
  background-color: white;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${shadow.normal}
  @media (max-width: 1200px) {
    padding: 0 calc(1200px / 24 * 4);
  }
  @media (min-width: 1200px) and (max-width: 1600px) {
    padding: 0 calc(100vw / 24 * 4);
  }
  @media (min-width: 1600px) {
    padding: 0 calc((100vw - calc(1600px / 24 * 16)) / 2);
    /* 전체 - 1600 기준 가로길이 / 2 */
  }
  height: 59px;
  overflow: hidden;
`;

type Props = {
  name?: string;
  children?: any;
  [props: string]: boolean | undefined | string | number[] | JSX.Element;
};

export default function Header(props: Props): ReactElement {
  return <div className={cx(header)}>{props.children}</div>;
}
