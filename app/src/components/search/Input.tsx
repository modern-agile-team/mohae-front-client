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
}

function Input(props: InputProps) {
  const { showFilter, setShowFilter, value, setValue, onSubmit } = props;

  const commonStyle = css`
    ${shadow.normal}
    border-radius: ${showFilter ? '6px 6px 0px 0px' : '6px'};
    display: flex;
    background-color: white;
    cursor: pointer;
    width: 812px;
    height: 43px;
    input {
      margin: 12px 0px 0px 32px;
      ${font.weight.ragular}
      ${font.size[14]}
      color: ${color.dark1};
      width: 663px;
      height: 19px;
    }
    input::placeholder {
      ${font.weight.normal}
      color: ${color.dark2};
      ${font.size[14]}
    }
    hr {
      visibility: ${value ? 'visible' : 'hidden'};
      margin-top: 7px;
      width: 0;
      height: 28px;
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

  const contents = () => {
    const cancle = css`
      visibility: ${value ? 'visible' : 'hidden'};
      margin: 14px 16px 0px 0px;
      width: 15px;
      height: 15px;
    `;

    const iconStyle = (filter?: string) => {
      const common = css`
        width: 47px;
        height: 43px;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          width: 18px;
          height: 18px;
        }
      `;
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

    return (
      <>
        <div className={cx(cancle)} onClick={() => setValue('')}>
          <Img src="/img/close-dark2.png" />
        </div>
        <hr />
        <button className={cx(iconStyle())} type="submit">
          <Img src="/img/search.png" />
        </button>
        <div
          className={cx(iconStyle('filter'))}
          onClick={() => setShowFilter && setShowFilter(!showFilter)}
        >
          <div id="filter">
            <Img src="/img/filter.png" />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <form
        id="inputWrap"
        className={cx(commonStyle)}
        onSubmit={e => onSubmit(e, 'search')}
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
