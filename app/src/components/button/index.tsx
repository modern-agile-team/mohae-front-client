import { css } from '@emotion/css';
import Alram from './imgBtn/Alram';
import Btn4 from './imgBtn/Btn4';
import Btn5 from './textBtn/Btn5';
import Btn6 from './textBtn/Btn6';
import Btn7 from './textBtn/Btn7';
import Btn8 from './textBtn/Btn8';
import Btn9 from './textBtn/Btn9';
import Btn10 from './textBtn/Btn10';
import Btn11 from './textBtn/Btn11';
import Btn12 from './textBtn/Btn12';

import { color, radius, font, shadow } from '../../styles/index';

export {
  color,
  radius,
  font,
  shadow,
  Alram,
  Btn4,
  Btn5,
  Btn6,
  Btn7,
  Btn8,
  Btn9,
  Btn10,
  Btn11,
  Btn12,
};

export interface Props {
  [props: string]: React.ReactNode;
}

export const btnStyle = {
  square: css`
    ${radius[6]}
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  circle: css`
    ${radius.circle}
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
