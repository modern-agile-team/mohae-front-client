import { css, cx } from '@emotion/css';
import { ReactElement } from 'react';
import {} from '../index';

const main = css`
  grid-column-start: 5;
  grid-column-end: 21;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: light;
  position: relative;

  background-color: lightgoldenrodyellow;
  height: 900px;
`;

type Props = {
  name?: string;
  children?: any;
};

export default function Main(props: Props): ReactElement {
  // console.log('palette :>> ', palette.colors);

  return <div className={cx(main)}>{props.children}</div>;
}
