import React, { Dispatch } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, SelectBtn } from '../button';
import { color, font } from '../../styles';
import Slider from './Slider';
import SelectBox from '../selectbox/SelectBox';
import Img from '../img/Img';
import type { type } from './Container';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

interface Props {
  texts: type;
  contents: type;
  priceRange: (minValue: number, maxValue: number) => string;
  view: { [key: number]: boolean };
  setView: Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  setItemCheck: (list: string, i: string) => void;
  resetSetting: () => void;
  onSubmit: (e: any, str: string) => void;
  setShowFilter: Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;
}

function Presenter(props: Props) {
  const {
    texts,
    contents,
    priceRange,
    view,
    setView,
    setItemCheck,
    resetSetting,
    onSubmit,
    setShowFilter,
    showFilter,
  } = props;
  const minVal = useSelector((state: RootState) => state.filter.data.price.min);
  const maxVal = useSelector((state: RootState) => state.filter.data.price.max);
  const checked: { [key: string]: { [key: number]: boolean } } = useSelector(
    (state: RootState) => state.filter.data.check,
  );

  const title = (section: string) => {
    return (
      <div className="title">
        {texts[section].map((text: any, i: any) => (
          <p className="filterTitle" key={i}>
            {text}
          </p>
        ))}
      </div>
    );
  };

  const selectBtnText = (list: string) => {
    return contents[list].map((text: any, i: any) =>
      list !== 'target' ? (
        <div key={i}>
          <SelectBtn
            onChange={() => setItemCheck(list, i)}
            small
            checked={checked[list][i]}
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
            checked={checked[list][i]}
            type={list}
          >
            {text}
          </SelectBtn>
        </div>
      ),
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
      <div id="realBox">
        <div className="top">
          {title('top')}
          <div className="wrap">
            <div className="row">{selectBtnText('sort')}</div>
            <div className="rowLeft">{selectBtnText('target')}</div>
          </div>
        </div>
        <div className="mid">
          {title('mid')}
          <div className="wrap">
            <div className="row">{selectBtnText('date')}</div>
            <div className="rowLeft">
              <div className="selectBox">
                <SelectBox
                  view={view[0]}
                  handleView={() => setView({ 0: !view[0] })}
                  style="전체 지역"
                  used={'filter'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div>
            <p className="filterTitle">가격</p>
            <p>{priceRange(minVal, maxVal)}</p>
          </div>
          {selectBtnText('free')}
        </div>
        <Slider min={0} max={1000000} />
        <div className="bottomBtn">
          <div className="compliteBtn">
            <Btn
              main
              onClick={e => {
                onSubmit(e, 'filter');
                setShowFilter(!showFilter);
              }}
            >
              설정 완료
            </Btn>
          </div>
          <div className="reset">
            <Btn white onClick={resetSetting}>
              <div className="resetImg">
                <Img src={'/img/reset.png'} />
              </div>
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presenter;
