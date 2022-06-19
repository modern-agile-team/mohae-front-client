/** @format */

import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../style/palette';
import { ReactElement } from 'react';

type Props = {
  [props: string]: boolean | undefined | string | number[] | JSX.Element;
};

export default function Main({ main, children }: Props): ReactElement {
  const padding = css`
    @media (max-width: 1200px) {
      padding: 0 calc(calc(1200px - 1128px) / 2);
    }
    @media (min-width: 1200px) {
      padding: 0 calc((100vw - 1128px) / 2);
    }
  `;

  const style = css`
    width: ${main ? '100%' : '1128px'};
    height: fit-content;
    overflow-x: visible;
  `;

  return <div className={cx(style)}>{children}</div>;
}
