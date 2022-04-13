import { css, cx } from '@emotion/css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
import { ReactElement } from 'react';

const grid = css`
  display: grid;
  width: 100vw;
  min-width: 1200px;
  align-items: center;
  grid-gap: 0.5px;
  grid-template-columns: repeat(24, 1fr);
  background-color: #f9f9f8;
`;

type Props = {
  component: any;
  name?: string;
  children?: any;
};

export default function Layout(props: Props): ReactElement {
  return (
    <div className={cx(grid)}>
      <Header>{'Header'}</Header>
      <Main>{props.component}</Main>
      <Footer>{'Footer'}</Footer>
    </div>
  );
}
