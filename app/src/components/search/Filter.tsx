import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, Props, SelectBtn } from '../button';
import MarkBox from '../markbox/MarkBox';
import { color, font } from '../../styles';
import Slider from './Silder';
import SelectBox from '../selectbox/SelectBox';
import Img from '../img/Img';

function Filter() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000000);
  const [view, setView] = useState<{ [key: number]: boolean }>({ 0: false });

  interface type {
    [title: string]: string[] | React.ReactNode[];
  }
  const selectBtnText = (list: string) => {
    const contents: type = {
      정렬: ['인기순', '최신순', '오래된순'],
      대상: [
        <>
          <MarkBox shape={1} state={0} />
          해줄래요
        </>,
        <>
          <MarkBox shape={0} state={0} />
          구할래요
        </>,
      ],
      기간: ['1주일', '1개월', '3개월', '상시'],
      무료: ['무료'],
    };

    return contents[list].map((text, i) =>
      list !== '대상' ? (
        <SelectBtn key={i} small>
          {text}
        </SelectBtn>
      ) : (
        <SelectBtn key={i} medium>
          {text}
        </SelectBtn>
      )
    );
  };

  const title = (section: string) => {
    const texts: type = {
      top: ['정렬', '대상'],
      mid: ['기간', '지역'],
    };

    return (
      <div className='title'>
        {texts[section].map((text, i) => (
          <p className='filterTitle' key={i}>
            {text}
          </p>
        ))}
      </div>
    );
  };

  const parentWrap = css`
    position: absolute;
    top: 42.5px;
    left: 0px;

    .filterTitle {
      ${font.size[14]}
      ${font.weight[700]}
      margin-bottom: 8px;
    }

    #realBox {
      width: 812px;
      height: 391px;
      display: flex;
      gap: 16px;
      flex-direction: column;
      background-color: white;
      border-radius: 0px 0px 6px 6px;
      box-shadow: 0px 8px 8px rgba(132, 131, 141, 0.5);
      padding: 16px 32px 24px 32px;
      color: ${color.dark1};
      ${font.weight.bold}
      ${font.size[14]}
    }

    .title {
      display: flex;
      gap: 428px;
    }

    .selectBox {
      margin-right: 146px;
    }

    .row,
    .rowLeft {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .rowLeft {
      width: 334px;
      align-items: center;
      justify-content: center;
    }

    .wrap {
      display: flex;
      justify-content: space-between;
    }

    .top,
    .mid {
      border-bottom: 2px solid ${color.light4};
    }

    .bottom {
      display: flex;
      justify-content: space-between;
    }

    .bottomBtn {
      display: flex;
      align-items: center;
      margin-top: 12px;
    }

    .reset {
      width: 40px;
      height: 40px;
      .resetImg {
        width: 20px;
        height: 20px;
      }
    }

    .compliteBtn {
      width: 300px;
      height: 40px;
      margin: 0 16px 0 224px;
    }
  `;

  const priceArea = () => {
    if (0 < minValue && maxValue < 1000000) {
      return `${minValue.toLocaleString()} 원 ~ ${maxValue.toLocaleString()} 원`;
    }
    if (minValue > 0) {
      return `${minValue.toLocaleString()} 원 이상`;
    }
    if (maxValue < 1000000) {
      return `${maxValue.toLocaleString()} 원 이하`;
    }

    return '모든 가격대';
  };

  return (
    <div className={cx(parentWrap)}>
      <div id='realBox'>
        <div className='top'>
          {title('top')}
          <div className='wrap'>
            <div className='row'>{selectBtnText('정렬')}</div>
            <div className='rowLeft'>{selectBtnText('대상')}</div>
          </div>
        </div>
        <div className='mid'>
          {title('mid')}
          <div className='wrap'>
            <div className='row'>{selectBtnText('기간')}</div>
            <div className='rowLeft'>
              <div className='selectBox'>
                <SelectBox
                  view={view[0]}
                  onClick={() => setView({ 0: !view[0] })}
                  size='small'
                  placeholder='지역'
                  style='text'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='bottom'>
          <div>
            <p className='filterTitle'>가격</p>
            <p>{priceArea()}</p>
          </div>
          {selectBtnText('무료')}
        </div>
        <Slider
          min={0}
          max={1000000}
          minValue={minValue}
          maxValue={maxValue}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
        />
        <div className='bottomBtn'>
          <div className='compliteBtn'>
            <Btn main>설정 완료</Btn>
          </div>
          <div className='reset'>
            <Btn white>
              <div className='resetImg'>
                <Img src={'/img/alarm-bell.png'} />
              </div>
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
