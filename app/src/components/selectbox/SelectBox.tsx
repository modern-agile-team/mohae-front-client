import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, shadow, font } from '../../styles';
import Img from '../img/Img';
import SelectList from './SelectList';
import { Btn } from '../button';

interface Props {
  big?: boolean;
  small?: boolean;
  category?: boolean;
  content: { [key: string]: string[] };
  className?: string;
}

function SelectBox(props: Props) {
  const { content, big, small, category, className } = props;

  const [show, setShow] = useState({
    title: Object.entries(content)[0][0],
    list: Object.entries(content)[0][1],
    able: false,
  });

  interface SizeList {
    [size: string]: string[];
  }

  const sizeList: SizeList = {
    big: [
      css`
        width: 368px;
        height: 62px;
      `,
      css`
        width: 368px;
        height: 247px;
      `,
    ],
    small: [
      css`
        width: 146px;
        height: 44px;
      `,
      css`
        width: 146px;
        height: 176px;
      `,
    ],
  };

  const size = Object.keys(props)
    .map(el => sizeList[el])
    .filter(el => el)[0];

  const common = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${color.dark2};
    ${font.weight[400]}
    ${size[0]}
    
    .palceholder {
      width: 100px;
      height: 36px;
    }

    .img {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  `;

  const difStyle = () => {
    return small
      ? css`
          ${common}
          ${!show.able ? radius[6] : 'border-radius: 6px 6px 0px 0px;'}
          ${shadow.button}
          padding: 10px 16px 10px 40px;
        `
      : css`
          ${common}
          ${show.able && shadow.normal}
          padding: ${!category
            ? '10px 16px 10px 154px'
            : '10px 16px 10px 116px'};
          border-bottom: 2px solid ${color.light4};
        `;
  };

  const listWrap = css`
    display: flex;
    flex-direction: column;
    position: relative;
    ${font.weight.regular}
    .realBox {
      ${size[1]}
      position: absolute;
      top: 0px;
      right: 0px;
      overflow-y: scroll;
      overflow-x: hidden;
      text-align: center;
      border-radius: 0px 0px 6px 6px;
      background-color: white;
      z-index: 5;
      border-right: 2px solid transparent;
      ${shadow.button}
      ::-webkit-scrollbar {
        width: 4px;
        height: 30px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${color.main};
        ${radius[6]}
      }
      ::-webkit-scrollbar-track {
        background-color: ${color.light4};
        ${radius[6]}
      }
    }
  `;

  return (
    <>
      <div className={cx(difStyle())}>
        {!category ? (
          show.title
        ) : (
          <div className='palceholder'>
            <Btn white category>
              {show.title}
            </Btn>
          </div>
        )}
        <div
          className='img'
          onClick={() => setShow({ ...show, able: !show.able })}
        >
          <Img src='/img/arrow-down-dark3.png' />
        </div>
      </div>
      <ul className={cx(listWrap)}>
        {show.able && (
          <div className='realBox'>
            {category ? (
              <SelectList content={show.list} category size={size[0]} />
            ) : (
              <SelectList content={show.list} size={size[0]} />
            )}
          </div>
        )}
      </ul>
    </>
  );
}

export default SelectBox;
