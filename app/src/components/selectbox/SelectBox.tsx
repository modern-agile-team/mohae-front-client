import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import SelectList from './SelectList';
import { color, font, radius, shadow } from '../../styles';
import Img from '../img/Img';
import { Btn } from '../button';

interface Props {
  view: boolean;
  onClick: () => void;
  size: string;
  placeholder: string;
  style: string;
}

function SelectBox(props: Props) {
  const { view, onClick, size, placeholder, style } = props;
  const [value, setValue] = useState(placeholder);
  const list: { [placeholder: string]: string[] } = {
    카테고리: [
      '카테고리',
      '카테고리',
      '응애',
      '애기',
      '성제',
      '미안',
      '한결이형',
    ],
    지역: [
      '강남구',
      '논현동',
      '남양주시',
      '도농동',
      '노원구',
      '한남동',
      '해방촌',
    ],
    기간: ['일주일', '1개월', '3개월', '상시'],
  };

  const sizeList: { [size: string]: string[] } = {
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
        width: 138px;
        height: 44px;
      `,
      css`
        width: 138px;
        height: 176px;
      `,
    ],
  };

  const sizeStyle: { [style: string]: string } = {
    big: css`
      ${view && shadow.normal}
      border-bottom: 2px solid ${color.light4};
      padding: 0px 32px;
      .placeholderWrap {
        width: 336px;
        display: flex;
        justify-content: center;
      }
    `,
    small: css`
      ${shadow.button}
      ${view ? 'border-radius: 6px 6px 0px 0px;' : radius[6]}
      padding: 0px 8px;
      .placeholderWrap {
        width: 106px;
        display: flex;
        justify-content: center;
      }
    `,
  };

  const wrap = css`
    position: relative;
    ${sizeStyle[size]}
    ${sizeList[size][0]}
    display: flex;
    align-items: center;
    ${font.size[14]}
    ${font.weight[400]}
    cursor: pointer;
    .opener {
      width: 24px;
      height: 24px;
    }
    .category {
      width: 100px;
      height: 36px;
    }
    .placeholderWrap {
      width: ${size === 'big' ? '344px' : '114px'};
      display: flex;
      align-items: center;
    }
    .placeholder {
      color: ${color.dark3};
    }
  `;

  const contentsStyle = () => {
    return style === 'text' ? (
      <div className='placeholderWrap'>
        <div className='placeholder'>{value}</div>
      </div>
    ) : (
      <div className='placeholderWrap'>
        <div className='category'>
          <Btn white category>
            {value}
          </Btn>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={cx(wrap)} onClick={onClick}>
        {contentsStyle()}
        <div className='opener'>
          <Img src='/img/arrow-down-dark3.png' />
        </div>
      </div>
      {view && (
        <SelectList
          setPlaceholder={setValue}
          size={sizeList[size]}
          contents={list[placeholder]}
          style={style}
        />
      )}
    </>
  );
}

export default SelectBox;
