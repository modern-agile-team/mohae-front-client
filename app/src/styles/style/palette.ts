import { css } from '@emotion/css';

const colors: object = {
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
  white: '#FFFFFF',
  black: '#000000',
};

const shadows: object = {
  normal: css`
    box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  `,
  button: css`
    box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
  `,
  SmallmainColor: css`
    box-shadow: 0px 0px 4px rgba(255, 68, 94, 0.25);
  `,
  bigMainColor: css`
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

const aligns: object = {
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

const sort: object = {
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

const radius: object = {
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

const font = {
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

  wieght: {
    Regular: css`
      font-weight: regular;
    `,
    Bold: css`
      font-weight: bold;
    `,
    Light: css`
      font-weight: lighter;
    `,
  },
};

export { colors, aligns, sort, radius, font, shadows };
