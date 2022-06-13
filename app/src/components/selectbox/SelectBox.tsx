import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, shadow, font } from '../../styles';
import Img from '../img/Img';
import SelectList from './SelectList';

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

  const common = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .img {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  `;

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

  const difStyle = {
    small: css`
      ${common}
      ${size[0]}
      ${!show.able ? radius[6] : 'border-radius: 6px 6px 0px 0px;'}
      ${shadow.button}
      color: ${color.dark2};
      padding: 10px 16px 10px 40px;
      ${font.weight.regular}
      ${className}
    `,
    big: css``,
  };

  const listWraper = {
    small: css`
      display: flex;
      flex-direction: column;
      position: relative;
      ${font.weight.regular}
      div {
        ${size[1]}
        position: absolute;
        top: 23px;
        right: 0px;
        overflow-y: scroll;
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
    `,
  };

  const listWrap = css`
    display: flex;
    flex-direction: column;
    position: relative;
    ${font.weight.regular}
    .realBox {
      ${size[1]}
      position: absolute;
      top: 23px;
      right: 0px;
      overflow-y: scroll;
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
      <div className={cx(difStyle.small)}>
        {show.title}
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
              <SelectList content={show.list} category />
            ) : (
              <SelectList content={show.list} />
            )}
          </div>
        )}
      </ul>
    </>
  );
}

export default SelectBox;
