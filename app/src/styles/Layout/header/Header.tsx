import { css, cx } from '@emotion/css';
import { ReactElement } from 'react';

const header = css`
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1200px) {
    width: calc(1200px / 24 * 16);
  }
  @media (min-width: 1200px) and (max-width: 1600px) {
    width: calc(100vw / 24 * 16);
  }
  @media (min-width: 1600px) {
    width: calc(1600px / 24 * 16);
  }
  height: 59px;
`;

type Props = {
  name?: string;
  children?: any;
};

export default function Header(props: Props): ReactElement {
  return (
    <>
      <div className={cx(header)}>{props.children}</div>
    </>
  );
}
