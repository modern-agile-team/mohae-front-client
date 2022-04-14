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
      <Header>
        {
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam atque mollitia veritatis distinctio doloremque molestias aliquid, in incidunt numquam quasi amet architecto similique a iusto id fugit consectetur itaque!'
        }
      </Header>
      <Main>{props.component}</Main>
      <Footer>{'Footer'}</Footer>
    </div>
  );
}
