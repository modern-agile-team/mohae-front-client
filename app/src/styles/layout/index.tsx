/** @format */

import { css, cx } from '@emotion/css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
import { color } from '../style/palette';
import { ReactElement } from 'react';

type Props = {
  [key: string]: any;
};

export default function Layout({ main, component }: Props): ReactElement {
  // const TOKEN = localStorage.getItem('');

  const wrapper: string = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${color.light1};
    @media (max-width: 1200px) {
      width: 1200px;
    }
    @media (min-width: 1200px) {
      width: 100vw;
    }
  `;

  const show = main ? (
    <Main main>{component}</Main>
  ) : (
    <>
      <Main>{component}</Main>
      <Footer />
    </>
  );

  return (
    <div className={cx(wrapper)}>
      <Header />
      {show}
    </div>
  );
}
