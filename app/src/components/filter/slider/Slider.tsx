import React, { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { setMax, setMin } from '../../../redux/filter/reducer';
import { RootState } from '../../../redux/root';

interface SliderProps {
  min: number;
  max: number;
}

const Slider = (props: SliderProps) => {
  const { min, max } = props;
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const minVal = useSelector((state: RootState) => state.filter.data.price.min);
  const maxVal = useSelector((state: RootState) => state.filter.data.price.max);

  const getPercent = useCallback(
    value => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

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
    <Wrapper>
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
      <SliderWrapper>
        <TrackWrapper>
          <InsideRange ref={range} />
        </TrackWrapper>
      </SliderWrapper>
    </Wrapper>
  );
};

export default Slider;

const SliderWrapper = styled.div`
  position: relative;
  width: 748px;
  div {
    position: absolute;
  }
`;

const TrackWrapper = styled.div`
  border-radius: 6px;
  height: 5px;
  overflow: hidden;
  background-color: #e7e7e8;
  width: 100%;
  z-index: 1;
`;

const InsideRange = styled.div`
  border-radius: 6px;
  height: 5px;
  overflow: hidden;
  background-color: #ff445e;
  z-index: 2;
`;

const Wrapper = styled.div`
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
      background-color: #e7e7e8;
      border: none;
      border-radius: 50%;
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
