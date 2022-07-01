/** @format */

import { css, cx } from '@emotion/css';
import { ReactElement } from 'react';

type Props = {
  [props: string]: boolean | undefined | string | number[] | JSX.Element;
};

export default function Main({ main, children }: Props): ReactElement {
  const style = css`
    width: ${main ? '100%' : '1128px'};
    height: fit-content;
    overflow-x: visible;
  `;

  return <div className={cx(style)}>{children}</div>;
}
