import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import { useState } from 'react';
import Img from '../img/Img';
import { Props } from '../button';
import { color, font, radius, shadow } from '../../styles';
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

interface InputProps extends Props {
  setShowFilter?: Dispatch<SetStateAction<boolean>>;
  showFilter?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function Input(props: InputProps) {
  const { board, main, showFilter, setShowFilter, value, setValue } = props;
  const localValue = JSON.parse(localStorage.getItem('currentSearch') || '[]');
  const { no } = useParams();
  const [searchPrams, setSearchPrams] = useSearchParams();
  const navigate = useNavigate();

  const attrProps = () =>
    board
      ? css`
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
        `
      : css`
          width: 648px;
          height: 68px;
          div {
            margin: 16px 24px;
            width: 36px;
            height: 36px;
            display: flex;
            padding-top: 3px;
          }
          input {
            margin: 16px 0px 0px 24px;
            ${font.weight.ragular}
            ${font.size[28]}
            color: ${color.dark1};
            width: 540px;
            height: 36px;
          }
          input::placeholder {
            ${font.weight.normal}
            color: ${color.dark2};
            ${font.size[28]}
          }
        `;

  const commonStyle = css`
    ${shadow.normal}
    border-radius: ${showFilter ? '6px 6px 0px 0px' : '6px'};
    display: flex;
    background-color: white;
    cursor: pointer;
    ${attrProps()}
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

    return board ? (
      <>
        <div className={cx(cancle)} onClick={() => setValue('')}>
          <Img src='/img/close-dark2.png' />
        </div>
        <hr />
        <button className={cx(iconStyle())} type='submit'>
          <Img src='/img/search.png' />
        </button>
        <div
          className={cx(iconStyle('filter'))}
          onClick={() => setShowFilter && setShowFilter(!showFilter)}
        >
          <div id='filter'>
            <Img src='/img/filter.png' />
          </div>
        </div>
      </>
    ) : (
      <button type='submit'>
        <Img className={cx(iconStyle())} src='/img/search.png' />
      </button>
    );
  };
  //=====================경로 바꾸는 함수--171줄에 사용=====================
  const onSubmit = (e: any) => {
    if (value.length > 1) {
      setSearchPrams(`?categoryNo=${no}&title=${value}`);
      localStorage.setItem(
        'currentSearch',
        JSON.stringify([...localValue, value])
      );
    } else alert('두 글자 이상');

    setValue('');
  };
  //=====================경로 바꾸는 함수=====================

  return (
    <>
      <form id='inputWrap' className={cx(commonStyle)} onSubmit={onSubmit}>
        <input
          type='text'
          src='/img/search.png'
          placeholder='검색어를 입력해 주세요.'
          onChange={e => setValue(e.target.value)}
          value={value}
        />
        {contents()}
      </form>
    </>
  );
}

export default Input;
