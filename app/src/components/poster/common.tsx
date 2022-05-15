import { css, keyframes } from '@emotion/css';
import { shadow, radius, color, font } from '../../styles';

export interface Props {
  [key: string]: string | boolean;
}

export interface Style {
  [index: string]: any;
}

export const zoomIn = keyframes`
from {
  background-size: 100%;
}
to {
  background-size: 120%;
}
`;

export const posterStyle = {
  imgBox: css`
    position: relative;

    /* animation */
    :hover {
      animation: ${zoomIn} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
    }
  `,

  infoBox: css`
    background-color: white;
    ${shadow.normal}

    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  `,

  leftInfoContainer: css`
    display: flex;
    flex-direction: column;
  `,

  title: css`
    display: flex;
    justify-content: start;
    align-items: center;
  `,

  writer: css`
    display: flex;
    justify-content: start;
    align-items: center;
  `,

  price: css`
    display: flex;
    justify-content: end;
    align-items: center;
  `,
};

export const checkIn: Style = {
  inMain: {
    container: css`
      width: 360px;
      height: 284px;
    `,
    imgBox: css`
      width: 360px;
      height: 208px;
    `,
    infoBox: css`
      width: 360px;
      height: 76px;
      padding: 16px;
    `,
    title: css`
      ${font.size[14]}
      ${font.weight.bold}
      width: 194px;
      height: 24px;
    `,
    writer: css`
      ${font.size[12]}
      ${font.weight.regular}
      width: 78px;
      height: 20px;
    `,
    price: css`
      ${font.size[16]}
      ${font.weight.bold}
      width: 92px;
      height: 27px;
    `,
    markBox: css`
      position: absolute;
      top: 16px;
      right: 16px;
    `,
  },
  inBoard: {
    container: css`
      width: 264px;
      height: 208px;
    `,
    imgBox: css`
      width: 264px;
      height: 152px;
    `,
    infoBox: css`
      width: 264px;
      height: 56px;
      padding: 8px 12px;
    `,
    title: css`
      ${font.size[12]}
      ${font.weight.bold}
      width: 154px;
      height: 20px;
    `,
    writer: css`
      ${font.size[12]}
      ${font.weight.regular}
      width: 90px;
      height: 20px;
    `,
    price: css`
      ${font.size[14]}
      ${font.weight.bold}
      width: 78px;
      height: 24px;
    `,
    markBox: css`
      position: absolute;
      top: 16px;
      right: 16px;
    `,
  },
  inSpec: {
    container: css`
      width: 228px;
      height: 177px;
    `,
    imgBox: css`
      width: 228px;
      height: 120px;
    `,
    infoBox: css`
      width: 228px;
      height: 57px;
      padding: 16px;
    `,
    title: css`
      ${font.size[14]}
      ${font.weight.bold}
      width: 196px;
      height: 25px;
    `,
    markBox: css`
      position: absolute;
      top: 16px;
      right: 16px;
    `,
  },
  inReview: {
    container: css`
      width: 173px;
      height: 130px;
    `,
    imgBox: css`
      width: 173px;
      height: 97px;
    `,
    infoBox: css`
      width: 173px;
      height: 33px;
      padding: 8px;
    `,
    title: css`
      ${font.size[12]}
      ${font.weight.bold}
      width: 157px;
      height: 17px;
    `,
    markBox: css`
      position: absolute;
      top: 8px;
      right: 8px;
    `,
  },
};
