import { css } from '@emotion/css';
import Alram from './Alram';
import SelectBtn from './SelectBtn';
import Btn from './Btn';
import { ReactNode } from 'react';

export { Alram, Btn, SelectBtn };

export interface Props {
  [props: string]: React.ReactNode;
  onClick?: (e: React.MouseEvent) => any | ReactNode;
}
