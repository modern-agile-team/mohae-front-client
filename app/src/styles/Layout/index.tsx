import { css, cx } from '@emotion/css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
import { ReactElement } from 'react';

const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #ffa1af;
  /* height: 100vh; */
  @media (max-width: 1200px) {
    width: 1200px;
  }
  @media (min-width: 1200px) {
    width: 100vw;
    background-color: #ff445e;
  }
`;

type Props = {
  component: any;
  name?: string;
  children?: any;
};

export default function Layout(props: Props): ReactElement {
  return (
    <div className={cx(wrapper)}>
      <Header>{'Header'}</Header>
      <Main>{props.component}</Main>
      {/* <Footer>{'Footer'}</Footer> */}
    </div>
  );
}
