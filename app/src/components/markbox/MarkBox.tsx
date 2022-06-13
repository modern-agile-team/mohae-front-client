import { css, cx } from '@emotion/css';
import React, { ReactChild } from 'react';
import { color, font, radius, shadow, btnStyle } from '../../styles';
import Img from '../img/Img';

interface MarkBoxProps {
  [key: string]: number | boolean | string;
}

function MarkBox(props: MarkBoxProps) {
  const { shape, state, big, small, hover } = props;

  const commonStyle = () => {
    const common = css`
      border-radius: 1px;
      position: relative;
      ::after {
        width: 212px;
        height: 104px;
        box-sizing: border-box;
        ${btnStyle.square}
        background-color: white;
        color: ${color.dark1};
        ${font.size[14]}
        ${font.weight[400]}
        line-height: 23.8px;
        text-align: center;
        visibility: hidden;
        ${shadow.normal}
        position: absolute;
        top: -94px;
        z-index: 11;
      }
    `;

    return shape
      ? css`
          ${common}
          ::after {
            content: '재능을 가지고 있는 사람들에게 도움을 요청할래요.';
            left: ${big ? '20px' : '16px'};
            padding: 12px;
          }
        `
      : css`
          ${common}
          ::after {
            content: '재능을 가지고 사람들에게 도움을 줄래요.';
            left: ${big ? '20px' : '16px'};
            padding: 28px;
          }
        `;
  };

  const markBoxSize = () =>
    big
      ? css`
          width: 30px;
          height: 30px;
        `
      : css`
          width: 24px;
          height: 24px;
        `;

  const wrap = () =>
    hover
      ? css`
          ${markBoxSize()};
          &:hover :after {
            visibility: visible;
          }
        `
      : css`
          ${markBoxSize()};
          &:hover :after {
            visibility: hidden;
          }
        `;

  interface Attrs {
    [shape: string]: string;
  }

  const attrs: Attrs = {
    '00': '/img/exclamation-mark-main.png',
    '01': '/img/exclamation-mark-dark1.png',
    '10': '/img/question-mark-main.png',
    '11': '/img/question-mark-dark1.png',
  };

  const attrProps = () => {
    const prop = String(shape) + String(state);

    return Object.keys(attrs)
      .map(shape => prop === shape && attrs[shape])
      .filter(el => el);
  };

  return (
    <div className={cx(wrap())}>
      <div className={cx(markBoxSize(), commonStyle())}>
        <Img src={attrProps()} />
      </div>
    </div>
  );
}

export default MarkBox;
