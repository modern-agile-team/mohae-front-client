/** @format */

import { css } from '@emotion/css';
import Alram from './Alram';
import Btn from './Btn';

import { ReactNode } from 'react';

export {
  Alram,
  Btn,
  // FilterBtn
};

export interface Props {
  [props: string]: React.ReactNode;
  onClick?: (e: React.MouseEvent) => any | ReactNode;
}
