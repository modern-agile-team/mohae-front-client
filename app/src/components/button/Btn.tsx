/** @format */

import { css, cx } from '@emotion/css';
import React, { ReactNode } from 'react';
import { color, font, radius, shadow } from '../../styles';

interface Props {
  [props: string]: React.ReactNode;
  onClick?: (e: React.MouseEvent) => any | ReactNode;
}

function Btn(props: Props) {
  const {
    children,
    main,
    white,
    disable,
    big,
    small,
    regular,
    bold,
    category,
    onClick,
  } = props;

  const common = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    ${shadow.normal}
    ${radius[6]}
    ${small ? font.size[12] : font.size[14]}
    ${bold ? font.weight[700] : font.weight[400]}
    *:not(:last-child, source) {
      margin-right: 8px;
    }
  `;

  const attrs = () => {
    const common = {
      main: css`
        color: white;
        &:active {
          background-color: ${color.darker};
        }
      `,
      white: css`
        background-color: white;
        &:hover {
          background-color: ${color.subtle};
        }
        &:active {
          background-color: ${color.lighter};
        }
      `,
    };

    interface Table {
      [color: string]: {
        [state: string]: string;
      };
    }

    const table: Table = {
      main: {
        able: css`
          ${common.main}
          background-color: ${color.main};
        `,
        disable: css`
          ${common.main}
          background-color: ${color.light4};
          &:active {
            background-color: ${color.light4};
          }
        `,
      },
      white: {
        able: css`
          ${common.white}
          color: ${color.main};
        `,
        disable: css`
          ${common.white}
          color: ${color.light4};
          &:hover {
            background-color: white;
          }
          &:active {
            background-color: white;
          }
        `,
      },
    };

    return Object.keys(props)
      .map(el => table[el])
      .filter(el => el)
      .map(el => (disable ? el.disable : el.able));
  };

  const categoryBtn = () => {
    return category
      ? css`
          &:hover {
            background-color: white;
          }
          &:active {
            background-color: white;
          }
        `
      : css``;
  };

  return (
    <button className={cx(common, attrs(), categoryBtn())} onClick={onClick}>
      {children}
    </button>
  );
}

export default Btn;
