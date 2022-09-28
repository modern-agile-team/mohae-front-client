/** @format */

import { css, cx } from '@emotion/css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
import { color } from '../style/palette';
import { Dispatch, ReactElement, SetStateAction } from 'react';

type Props = {
  [key: string]: any;
  setSnapPageNumber?: Dispatch<SetStateAction<number>>;
};

export default function Layout({
  setSnapPageNumber,
  main,
  component,
}: Props): ReactElement {
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
      <Header setSnapPageNumber={setSnapPageNumber} />
      {show}
    </div>
  );
}
