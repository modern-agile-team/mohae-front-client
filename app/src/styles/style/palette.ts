import { css, CSSObject } from '@emotion/css';

interface Color {
  [key: string]: any;
}

const color: Color = {
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

type Shadow = {
  [key: string]: any;
};

const shadow: Shadow = {
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

interface Size {
  [key: number]: any;
}
interface Weight {
  [key: string]: any;
}
interface Font {
  size: Size;
  weight: Weight;
}

const font: Font = {
  size: {
    44: css`
      font-size: 44px;
    `,
    46: css`
      font-size: 36px;
    `,
    28: css`
      font-size: 28px;
    `,
    24: css`
      font-size: 24px;
    `,
    22: css`
      font-size: 22px;
    `,
    20: css`
      font-size: 20px;
    `,
    16: css`
      font-size: 16px;
    `,
    14: css`
      font-size: 14px;
    `,
    12: css`
      font-size: 12px;
    `,
    10: css`
      font-size: 10px;
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

export { color, radius, font, shadow };
