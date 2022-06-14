import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  LegacyRef,
  Dispatch,
} from 'react';
import { css, cx } from '@emotion/css';
import { color, radius } from '../../styles';

interface Props {
  min: number;
  max: number;
  setMinValue: Dispatch<React.SetStateAction<number>>;
  setMaxValue: Dispatch<React.SetStateAction<number>>;
  minValue: number;
  maxValue: number;
}

const Slider = (props: Props) => {
  const { min, max, minValue, maxValue, setMinValue, setMaxValue } = props;
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

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
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxRefPercent = getPercent(maxValRef.current);
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxRefPercent - minPercent}%`;
    }
  }, [minValue, getPercent]);

  useEffect(() => {
    const minRefPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxValue);

    if (range.current) {
      range.current.style.width = `${maxPercent - minRefPercent}%`;
    }
  }, [maxValue, getPercent]);

  return (
    <div className={cx(sliderStyle)}>
      <input
        type='range'
        min={min}
        max={max}
        value={minValue}
        onChange={e => {
          const value = Math.min(Number(e.target.value), maxValue - 1000);
          setMinValue(Math.floor(value / 1000) * 1000);
          minValRef.current = value;
        }}
        className='thumb--min'
      />
      <input
        type='range'
        min={min}
        max={max}
        value={maxValue}
        onChange={e => {
          const value = Math.max(Number(e.target.value), minValue + 1000);
          setMaxValue(Math.floor(value / 1000) * 1000);
          maxValRef.current = value;
        }}
        className='thumb--max'
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
