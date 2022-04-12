import { css } from '@emotion/css';

const colors: obj = {
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

export { colors, aligns, sort, radius };
