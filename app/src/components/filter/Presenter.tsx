import React, { Dispatch } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, SelectBtn } from '../button';
import MarkBox from '../markbox/MarkBox';
import { color, font } from '../../styles';
import Slider from './Silder';
import SelectBox from '../selectbox/SelectBox';
import Img from '../img/Img';
import type { type } from './Container';

interface Props {
  texts: type;
  contents: type;
  priceArea: (minValue: number, maxValue: number) => string;
  minValue: number;
  setMinValue: Dispatch<React.SetStateAction<number>>;
  maxValue: number;
  setMaxValue: Dispatch<React.SetStateAction<number>>;
  view: { [key: number]: boolean };
  setView: Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  filterChecked: { [key: string]: { [key: number]: boolean | undefined } };
  setItemCheck: (list: string, i: number) => void;
}

function Presenter(props: Props) {
  const {
    texts,
    contents,
    priceArea,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    view,
    setView,
    filterChecked,
    setItemCheck,
  } = props;

  const title = (section: string) => {
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

  const selectBtnText = (list: string) => {
    return contents[list].map((text, i) =>
      list !== '대상' ? (
        <div key={i}>
          <SelectBtn
            onChange={() => setItemCheck(list, i)}
            small
            checked={filterChecked[list][i]}
            type={list}
          >
            {text}
          </SelectBtn>
        </div>
      ) : (
        <div key={i}>
          <SelectBtn
            onChange={() => setItemCheck(list, i)}
            medium
            checked={filterChecked[list][i]}
            type={list}
          >
            {text}
          </SelectBtn>
        </div>
      )
    );
  };

  const parentWrap = css`
    position: absolute;
    top: 43.5px;
    left: 0px;
    z-index: 1;

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
            <p>{priceArea(minValue, maxValue)}</p>
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

export default Presenter;
