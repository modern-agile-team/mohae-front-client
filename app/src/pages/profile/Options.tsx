/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
import {
  Img,
  Poster,
  NewPost,
  Box,
  Profile,
  FocusBar,
  Category,
  BasicModal,
  MarkBox,
  Btn,
} from '../../components';
import { createContext } from 'vm';

interface Props {
  [key: string]: any;
}

export default function Options({
  blocks,
  list,
  targets,
  target,
  onClick,
  number,
}: Props) {
  const mainColor = css`
    color: ${color.main} !important;
  `;
  if (blocks) {
    const style = css`
      width: calc(100% - 2px);
      position: absolute;
      z-index: 5;
      top: 52px;
      left: 0;
      padding: 0 40px 0 8px;
      height: fit-content;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
      .sub {
        margin: 4px 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      > :not(:nth-child(3n + 1)) {
        margin: 0 14px 8px 0;
      }
    `;
    return (
      <div className={cx(style)}>
        <div className={'sub'}>
          <span>{'관심사를 선택해주세요. (최대3개)'}</span>
          <div>
            <span className={cx(number === 3 && mainColor)}>{number}</span>
            <span>{'/3'}</span>
          </div>
        </div>
        {list.map((each: any, index: number) => (
          <Category
            shape={'row'}
            key={index}
            name={each}
            id={'block'}
            className={targets.includes(each) && mainColor}
            onClick={onClick}
          />
        ))}
      </div>
    );
  } else {
    const style = css`
      width: 100%;
      position: absolute;
      z-index: 1;
      top: 52px;
      left: 0;
      padding: 8px 0 0 0;
      height: fit-content;
      display: flex;
      flex-direction: column;
      > :nth-child(2n-1) {
        background-color: ${color.light1};
      }
      button {
        background-color: white;
        width: 100%;
        display: flex;
        line-height: 20px;
        padding: 8px 0;
        justify-content: center;
        align-items: center;
      }
    `;

    return (
      <div className={cx(style)}>
        {list.map((each: any, index: number) => (
          <button
            id={'text'}
            key={index}
            name={each}
            className={cx(each === target && mainColor)}
            onClick={onClick}
          >
            {each}
          </button>
        ))}
      </div>
    );
  }
}
