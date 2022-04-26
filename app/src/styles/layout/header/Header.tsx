import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../style/palette';
import { ReactElement } from 'react';

const wrapper = css`
  background-color: white;
  position: sticky;
  top: 0;
  width: 100%;
  ${shadow.normal}
  @media (max-width: 1200px) {
    padding: 0 calc(calc(1200px - 1128px) / 2);
  }
  @media (min-width: 1200px) {
    padding: 0 calc((100vw - 1128px) / 2);
  }
  min-height: 59px;
  overflow: hidden;
`;

const content = css`
  width: 100%;
  height: 100%;
  padding: 8px 0;
  background-color: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logo = css`
  width: 40px;
  height: 43px;
`;

type Props = {
  name?: string;
  children?: any;
  [props: string]: boolean | undefined | string | number[] | JSX.Element;
};

export default function Header(props: Props): ReactElement {
  return (
    <div className={cx(wrapper)}>
      <div className={content}>
        {props.children}
        <button className={cx(logo)}>{'로그인'}</button>
      </div>
    </div>
  );
}
