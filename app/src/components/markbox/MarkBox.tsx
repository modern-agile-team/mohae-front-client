import { css, cx } from '@emotion/css';
import React, { ReactChild } from 'react';
import { color, font, radius, shadow, btnStyle } from '../../styles';
import { Props } from '../button';
import Img from '../img/Img';

interface MarkBoxProps extends Props {
  style?: { [key: string]: string };
}

function MarkBox(props: MarkBoxProps) {
  const { style, big, small, hover } = props;

  const commonStyle = () => {
    const common = css`
      border-radius: 1px;
      clear: both;
      position: relative;
      :after {
        width: 212px;
        height: 104px;
        box-sizing: border-box;
        display: block;
        ${btnStyle.square}
        background-color: white;
        color: ${color.dark1};
        ${font.size[14]}
        ${font.weight.regular}
        line-height: 23.8px;
        text-align: center;
        visibility: hidden;
        ${shadow.normal}
        position: relative;
      }
    `;

    return style && style.shape === '?'
      ? css`
          ${common}
          ::after {
            content: '재능을 가지고 있는 사람들에게 도움을 요청할래요.';
            bottom: ${big ? '124px' : '120px'};
            left: ${big ? '20px' : '16px'};
            padding: 9px;
          }
        `
      : css`
          ${common}
          ::after {
            content: '재능을 가지고 사람들에게 도움을 줄래요.';
            bottom: ${big ? '124px' : '120px'};
            left: ${big ? '20px' : '16px'};
            padding: 23px;
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
    '!able': 'img/exclamation-mark-main.png',
    '!disable': 'img/exclamation-mark-dark1.png',
    '?able': 'img/question-mark-main.png',
    '?disable': 'img/question-mark-dark1.png',
  };

  const attrProps = () => {
    const prop = style && style.shape + style.state;

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

MarkBox.defaultProps = {
  style: { shape: '!', state: 'able' },
};
