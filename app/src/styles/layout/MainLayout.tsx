import { css, cx } from '@emotion/css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
import { color, radius, font, shadow } from '../style/palette';
import { ReactElement } from 'react';

const wrapper: string = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${color.light4};
  @media (max-width: 1200px) {
    width: 1200px;
  }
  @media (min-width: 1200px) {
    width: 100vw;
  }
`;

type Props = {
  component: any;
  name?: string;
  className?: string;
  [props: string]: boolean | undefined | string | JSX.Element;
};

export default function Layout(props: Props): ReactElement {
  return (
    <div className={cx(wrapper)}>
      <Header>{'Header'}</Header>
      <Main>{props.component}</Main>
    </div>
  );
}
