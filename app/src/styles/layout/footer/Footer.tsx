import { ReactElement } from 'react';
import { color, radius, font, shadow } from '../../style/palette';
import { css, cx } from '@emotion/css';

const footer = css`
  height: 150px;
  width: 100%;
  background-color: white;
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
`;

const content = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

type Props = {
  name?: string;
  children?: any;
};

export default function Footer(props: Props): ReactElement {
  return (
    <>
      <div className={cx(footer)}>
        <div className={cx(content)}>{props.children}</div>
      </div>
    </>
  );
}
