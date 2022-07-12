import React, { Dispatch, useState } from 'react';
import { css, cx } from '@emotion/css';
import SelectList from './SelectList';
import { color, font, radius, shadow } from '../../styles';
import Img from '../img/Img';
import { Btn } from '../button';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

interface Contents {
  no: string;
  name: string;
}
interface Props {
  view: boolean;
  filter?: boolean;
  onClick: () => void;
  size: string;
  placeholder: string;
  style: string;
}

function SelectBox(props: Props) {
  const { view, onClick, size, placeholder, style, filter } = props;
  const filterSelected = useSelector(
    (state: RootState) => state.filter.data.area.areaName
  );
  const [selected, setSelected] = useState<string>(placeholder);
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
        <div className='placeholder'>{filter ? filterSelected : selected}</div>
      </div>
    ) : (
      <div className='placeholderWrap'>
        <div className='category'>
          <Btn white category>
            {selected}
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
          size={sizeList[size]}
          contents={list[placeholder]}
          style={style}
          setSelected={setSelected}
        />
      )}
    </>
  );
}

export default SelectBox;

const list: { [placeholder: string]: Contents[] } = {
  카테고리: [
    { no: '1', name: 'All' },
    { no: '2', name: '디자인' },
    { no: '3', name: 'IT/개발' },
    { no: '4', name: '사진/영상' },
    { no: '5', name: '기획/마케팅' },
    { no: '6', name: '번역/통역' },
    { no: '7', name: '문서작업' },
    { no: '8', name: '컨설팅' },
    { no: '9', name: '법률' },
    { no: '10', name: '과외/레슨' },
    { no: '11', name: '상담/운세' },
    { no: '12', name: '이벤트' },
    { no: '13', name: '핸드메이드' },
    { no: '14', name: '취미' },
    { no: '15', name: '생활서비스' },
    { no: '16', name: '기타' },
  ],
  '전체 지역': [
    { no: '1', name: '서울' },
    { no: '2', name: '경기도' },
    { no: '3', name: '강원도' },
    { no: '4', name: '대전' },
    { no: '5', name: '세종시' },
    { no: '6', name: '전라도' },
    { no: '7', name: '광주' },
    { no: '8', name: '경상도' },
    { no: '9', name: '부산' },
    { no: '10', name: '울산' },
    { no: '11', name: '제주도' },
  ],
  기간: [
    { no: '7', name: '일주일' },
    { no: '30', name: '1개월' },
    { no: '60', name: '3개월' },
    { no: '0', name: '상시' },
  ],
};
