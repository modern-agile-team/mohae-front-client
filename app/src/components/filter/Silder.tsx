import React, { useCallback, useEffect, useRef } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { setMax, setMin } from '../../redux/filter/reducer';
import { RootState } from '../../redux/root';

interface Props {
  min: number;
  max: number;
}

const Slider = (props: Props) => {
  const { min, max } = props;
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const minVal = useSelector((state: RootState) => state.filter.data.price.min);
  const maxVal = useSelector((state: RootState) => state.filter.data.price.max);
  const wrapSlider = css`
    position: relative;
    width: 748px;
    div {
      position: absolute;
    }
  `;

  const attrSilder = (track?: string) => {
    const common = css`
      ${radius[6]};
      height: 5px;
      overflow: hidden;
    `;

    return track
      ? css`
          ${common}
          background-color: ${color.light4};
          width: 100%;
          z-index: 1;
        `
      : css`
          ${common}
          background-color: ${color.main};
          z-index: 2;
        `;
  };

  const sliderStyle = css`
    .thumb--min {
      z-index: 3;
    }

    .thumb--max {
      z-index: 4;
    }

    input[type='range'] {
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
      pointer-events: none;
      position: absolute;
      height: 0;
      width: 748px;
      outline: none;
      ::-webkit-slider-thumb {
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
      }
      ::-webkit-slider-thumb {
        background-color: #f1f5f7;
        border: none;
        border-radius: 50%;
        box-shadow: 0 0 1px 1px #ced4da;
        cursor: pointer;
        height: 20px;
        width: 20px;
        margin-top: 4px;
        pointer-events: all;
        position: relative;
      }
      .thumb--min {
        height: 25px;
        width: 25px;
      }
      ::-moz-range-thumb {
        background-color: ${color.light4};
        border: none;
        ${radius.circle}
        box-shadow: 0 0 1px 1px #ced4da;
        cursor: pointer;
        height: 18px;
        width: 18px;
        margin-top: 4px;
        pointer-events: all;
        position: relative;
      }
    }
  `;

  const getPercent = useCallback(
    value => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );
  console.log(maxValRef.current);
  useEffect(() => {
    const minPercent = getPercent(minVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
    }
  }, [minVal, getPercent, maxVal]);

  useEffect(() => {
    const minRefPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${
        minVal === 0 && maxVal === 1000000 ? '100' : maxPercent - minRefPercent
      }%`;
    }
  }, [maxVal, getPercent, minVal]);

  return (
    <div className={cx(sliderStyle)}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={e => {
          const value = Math.min(Number(e.target.value), maxVal - 1000);
          minValRef.current = value;
          dispatch(setMin(Math.floor(value / 1000) * 1000));
        }}
        className="thumb--min"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={e => {
          const value = Math.max(Number(e.target.value), minVal + 1000);
          maxValRef.current = value;
          dispatch(setMax(Math.floor(value / 1000) * 1000));
        }}
        className="thumb--max"
      />

      <div className={cx(wrapSlider)}>
        <div className={cx(attrSilder('track'))}>
          <div ref={range} className={cx(attrSilder())} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
