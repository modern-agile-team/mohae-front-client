import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../style/palette';
import { ReactElement } from 'react';

type Props = {
  [props: string]: boolean | undefined | string | number[] | JSX.Element;
};

export default function Main({ main, children }: Props): ReactElement {
  const style = () => {
    const col = main ? '100%' : '1128px';
    return css`
      width: ${col};
      height: fit-content;
      overflow-x: visible;
    `;
  };

  return <div className={cx(style())}>{children}</div>;
}
