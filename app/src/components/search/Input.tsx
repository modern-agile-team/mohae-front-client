import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import { useState } from 'react';
import Img from '../img/Img';
import { Props } from '../button';
import { color, font, radius, shadow } from '../../styles';

interface InputProps extends Props {
  searchList?: () => React.ReactNode;
  setShowFilter?: Dispatch<SetStateAction<boolean>>;
  showFilter?: boolean;
}

function Input(props: InputProps) {
  const { board, main, showFilter, setShowFilter, searchList } = props;
  const [value, setValue] = useState('');
  const localValue = JSON.parse(localStorage.getItem('currentSearch') || '[]');

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
            margin: 7px 16px 0px 0px;
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
    ${radius[6]}
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
    const search = css`
      width: 43px;
      height: 43px;
      padding: 12px 0px 0px 16px;
      div {
        width: 18px;
        height: 18px;
      }
    `;
    const filter = css`
      width: 47px;
      height: 43px;
      display: flex;
      align-items: center;
      padding-left: 16px;
      #filter {
        width: 18px;
        height: 18px;
      }
    `;
    return board ? (
      <>
        <div className={cx(cancle)} onClick={() => setValue('')}>
          <Img src='img/close-dark2.png' />
        </div>
        <hr />
        <div className={cx(search)} onClick={onClick}>
          <Img src='img/search.png' />
        </div>
        <div className={cx(filter)}>
          <div
            id='filter'
            onClick={() => setShowFilter && setShowFilter(!showFilter)}
          >
            <Img src='img/filter.png' />
          </div>
        </div>
      </>
    ) : (
      <Img className={cx(search)} onClick={onClick} src='img/search.png' />
    );
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    // value.length > 2 &&
    localStorage.setItem(
      'currentSearch',
      JSON.stringify([...localValue, value])
    );
    setValue('');
  };

  const onClick = () => {
    setValue('');
    return localStorage.setItem(
      'currentSearch',
      JSON.stringify([...localValue, value])
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div
        id='inputWrap'
        className={cx(commonStyle)}
        onKeyPress={e => e.key === 'Enter' && onKeyPress(e)}
      >
        <input
          type='text'
          src='img/search.png'
          placeholder='검색어를 입력해 주세요.'
          onChange={onChange}
          value={value}
        />
        {contents()}
      </div>
    </>
  );
}

export default Input;
