import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import Img from '../img/Img';
import { Props } from '../button';
import { color, font, radius, shadow } from '../../styles';

interface InputProps extends Props {
  setShowFilter?: Dispatch<SetStateAction<boolean>>;
  showFilter?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setLocalValue: Dispatch<React.SetStateAction<string[]>>;
  onSubmit: (e: any, str: string) => void;
  onBlur: () => void;
  onFocus: () => void;
}

function Input(props: InputProps) {
  const {
    showFilter,
    setShowFilter,
    value,
    setValue,
    onSubmit,
    onBlur,
    onFocus,
    board,
    main,
  } = props;

  const commonStyle = css`
    ${shadow.normal}
    border-radius: ${showFilter ? '6px 6px 0px 0px' : '6px'};
    display: flex;
    background-color: white;
    cursor: pointer;
    width: ${board ? '812px' : '648px'};
    height: ${board ? '43px' : '63px'};
    input {
      margin: ${board ? '12px 0px 0px 32px' : '16px 0px 0px 24px'};
      ${font.weight.ragular}
      ${board ? font.size[14] : font.size[24]}
      color: ${color.dark1};
      width: ${board ? '663px' : '545px'};
      height: ${board ? '19px' : '31px'};
    }
    input::placeholder {
      ${font.weight.normal}
      color: ${color.dark2};
      ${board ? font.size[14] : font.size[24]}
    }
    hr {
      visibility: ${value ? 'visible' : 'hidden'};
      margin-top: 7px;
      width: 0;
      height: ${board ? '28px' : '48px'};
      border-left: 2px solid ${color.light3};
      margin-bottom: 15px;
    }
    input::-ms-clear,
    input::-ms-reveal {
      display: none;
    }
    input::-webkit-search-decoration,
    input::-webkit-search-cancel-button,
    input::-webkit-search-results-button,
    input::-webkit-search-results-decoration {
      display: none;
    }
  `;

  const cancle = css`
    visibility: ${value ? 'visible' : 'hidden'};
    margin: ${board ? '14px 16px 0px 0px' : '18px 16px 0px 0px'};
    ${board
      ? `width: 15px;
        height: 15px;`
      : `width: 28px;
        height: 28px;`}
  `;
  const common = css`
    width: 47px;
    height: 43px;
    margin: ${main ? '12px 12px 0px 4px' : '0'};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    div {
      ${board
        ? `width: 18px;
        height: 18px;`
        : `width: 31px;
        height: 31px;`}
    }
  `;

  const iconStyle = (filter?: string) => {
    return filter
      ? css`
          ${common}
          ${radius[6]}
          background-color: ${showFilter && color.subtle};
          ${showFilter && shadow.inputMain};
        `
      : css`
          ${common}
          ${radius[6]}
        `;
  };

  const contents = () => {
    return (
      <>
        <div className={cx(cancle)} onClick={() => setValue('')}>
          <Img src="/img/close-dark2.png" />
        </div>
        <hr />
        <button className={cx(iconStyle())} type="submit">
          <Img src="/img/search.png" />
        </button>
        {board && (
          <div
            className={cx(iconStyle('filter'))}
            onClick={() => setShowFilter && setShowFilter(!showFilter)}
          >
            <div id="filter">
              <Img src="/img/filter.png" />
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <form
        id="inputWrap"
        className={cx(commonStyle)}
        onSubmit={e => onSubmit(e, 'search')}
        onBlur={() => onBlur()}
        onFocus={() => onFocus()}
      >
        <input
          type="text"
          src="/img/search.png"
          placeholder="검색어를 입력해 주세요."
          onChange={e => setValue(e.target.value)}
          value={value}
        />
        {contents()}
      </form>
    </>
  );
}

export default Input;
