import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../style/palette';
import { ReactElement } from 'react';

const main = css`
  width: 1128px;
  height: 675px;
  overflow: hidden;

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
  [props: string]: boolean | undefined | string | number[] | JSX.Element;
};

export default function Main(props: Props): ReactElement {
  return (
    <>
      <div className={cx(main, colors.gray)}>{props.children}</div>
    </>
  );
}
