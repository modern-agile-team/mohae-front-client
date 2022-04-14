import { cx, css } from '@emotion/css';
import {
  Btn1,
  Btn10,
  Btn11,
  Btn12,
  Btn4,
  Btn5,
  Btn6,
  Btn7,
  Btn8,
  Btn9,
} from '../../components/button';

export default function SJ() {
  return (
    <div>
      <Btn1 msg={'9'}>{'St1'}</Btn1>
      <Btn4 small main>
        {'St4'}
      </Btn4>
      <Btn5>{'St5'}</Btn5>
      <Btn6 main>{'St6'}</Btn6>
      <Btn7>{'St7'}</Btn7>
      <Btn8 big>{'St8'}</Btn8>
      <Btn9>{'St9'}</Btn9>
      <Btn10>{'St10'}</Btn10>
      <Btn11 small>{'St11'}</Btn11>
      <Btn12 big>{'St12'}</Btn12>
    </div>
  );
}
