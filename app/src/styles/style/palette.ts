import { css, CSSObject } from '@emotion/css';
import { CSSProperties } from 'react';

type Colors = {
  [key: string]: string;
};

const colors: Colors = {
  main: '#ff445e',
  darker: '#D12A41',
  lighter: '#FFA1AF',
  subtle: '#FCF3F4',
  error: '#FF3B3B',
  info: '#0063F7',
  success: '#06C270',
  dark1: '#4F4E5C',
  dark2: '#84838D',
  dark3: '#A7A7AD',
  dark4: '#CACACE',
  light1: '#F9F9F9',
  light2: '#F5F5F5',
  light3: '#EDEDEF',
  light4: '#E7E7E8',
};

type Shadows = {
  [key: string]: any;
};

const shadows: Shadows = {
  normal: css`
    box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  `,
  button: css`
    box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
  `,
  SmallMain: css`
    box-shadow: 0px 0px 4px rgba(255, 68, 94, 0.25);
  `,
  bigMain: css`
    box-shadow: 0px 0px 8px rgba(255, 68, 94, 0.25);
  `,
  click: css`
    box-shadow: 0px 0px 8px rgba(255, 68, 94, 0.8);
  `,
  inputGray: css`
    box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);
  `,
  inputMain: css`
    box-shadow: inset 0px 0px 8px rgba(255, 68, 94, 0.2);
  `,
};

type Aligns = {
  [key: string]: any;
};

const aligns: Aligns = {
  left: css`
    text-align: left;
  `,
  center: css`
    text-align: center;
  `,
  right: css`
    text-align: right;
  `,
};

type Sort = {
  [key: string]: any;
};

const sort: Sort = {
  row: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  col: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  center: css`
    justify-content: center;
  `,
  between: css`
    justify-content: space-between;
  `,
};

type Radius = {
  [key: number]: any;
  circle: any;
};

const radius: Radius = {
  5: css`
    border-radius: 5px;
  `,
  6: css`
    border-radius: 6px;
  `,
  24: css`
    border-radius: 24px;
  `,
  circle: css`
    border-radius: 50%;
  `,
};

type Size = {
  [key: number]: any;
};
type Weight = {
  [key: string]: any;
};
type Font = {
  size: Size;
  weight: Weight;
};

const font: Font = {
  size: {
    44: css`
      font-size: 44;
    `,
    46: css`
      font-size: 36;
    `,
    28: css`
      font-size: 28;
    `,
    24: css`
      font-size: 24;
    `,
    22: css`
      font-size: 22;
    `,
    20: css`
      font-size: 20;
    `,
    16: css`
      font-size: 16;
    `,
    14: css`
      font-size: 14;
    `,
    12: css`
      font-size: 12;
    `,
    10: css`
      font-size: 10;
    `,
  },
  weight: {
    light: css`
      font-weight: 300;
    `,
    regular: css`
      font-weight: 400;
    `,
    bold: css`
      font-weight: 700;
    `,
  },
};

export { colors, aligns, sort, radius, font, shadows };
