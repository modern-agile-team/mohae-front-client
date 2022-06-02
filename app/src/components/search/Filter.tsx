import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { FilterBtn } from '../button';
import MarkBox from '../markbox/MarkBox';
import { color, font } from '../../styles';
import Slider from './Silder';
import SelectBox from '../selectbox/SelectBox';

function Filter() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000000);

  const commonStyle = css`
    position: absolute;
    top: 42.5px;
    left: 0px;

    #realBox {
      width: 812px;
      height: 391px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      background-color: white;
      border-radius: 0px 0px 6px 6px;
      box-shadow: 0px 8px 8px rgba(132, 131, 141, 0.5);
      padding: 0px 32px 68px 32px;
      color: ${color.dark1};
      ${font.weight.bold}
      ${font.size[14]}
    }
  `;

  const sectionWrap = css`
    display: flex;
    justify-content: space-between;
    width: auto;
    height: 92px;
    border-bottom: 1px solid ${color.light4};
    label {
      margin-right: 8px;
    }
  `;

  const titleWrap = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const showPrice = (min?: string) => {
    const common = css`
      width: 98px;
      height: 43px;
      color: ${color.dark1};
      padding: 8px 16px;
      text-align: center;
    `;

    return min
      ? css`
          ${common}
          margin-right: 16px;
        `
      : css`
          ${common}
          margin-left: 16px;
          margin-right: 8px;
        `;
  };

  const create = {
    btn: (i: number) => {
      const textContents = [
        ['최신순', '인기순', '오래된순'],
        ['1주일', '1개월', '3개월', '상시'],
        ['초기화', '무료'],
      ];

      return textContents[i].map((el, key) => (
        <FilterBtn small key={key}>
          {el}
        </FilterBtn>
      ));
    },

    title: (text: string) => {
      const style = css`
        margin-right: 24px;
      `;
      return <span className={cx(style)}>{text}</span>;
    },
  };

  return (
    <div className={cx(commonStyle)} id='wrap'>
      <div id='realBox'>
        <div className={cx(sectionWrap)}>
          <div className={cx(titleWrap)}>
            {create.title('정렬')}
            {create.btn(0)}
          </div>
          <div className={cx(titleWrap)}>
            {create.title('대상')}
            <FilterBtn big id='bigBtn'>
              <MarkBox shape={0} state={0} />
              해줄래요
            </FilterBtn>
            <FilterBtn big>
              <MarkBox shape={1} state={0} />
              구할래요
            </FilterBtn>
          </div>
        </div>
        <div className={cx(sectionWrap)}>
          <div className={cx(titleWrap)}>
            {create.title('기간')}
            {create.btn(1)}
          </div>
          <div className={cx(titleWrap)}>
            {create.title('지역')}
            <SelectBox
              content={{
                지역: [
                  '서울시',
                  '부산시',
                  '남양주시',
                  '구리시',
                  '하남시',
                  '논현동',
                ],
              }}
              small
            />
          </div>
        </div>
        <div className={cx(sectionWrap)}>
          <div className={cx(titleWrap)}>
            {create.title('가격')}
            <div className={cx(showPrice('min'))}>
              {minValue.toLocaleString()}
            </div>
            <span>~</span>
            <div className={cx(showPrice())}>{maxValue.toLocaleString()}</div>원
          </div>
          <div className={cx(titleWrap)}>{create.btn(2)}</div>
        </div>
        <Slider
          min={0}
          max={1000000}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
          minValue={minValue}
          maxValue={maxValue}
        />
        {/* <Btn></Btn> */}
      </div>
    </div>
  );
}

export default Filter;
