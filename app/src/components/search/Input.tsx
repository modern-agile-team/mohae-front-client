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
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

interface InputProps extends Props {
  setShowFilter?: Dispatch<SetStateAction<boolean>>;
  showFilter?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setLocalValue: Dispatch<React.SetStateAction<string[]>>;
  resetPageInfo: () => void;
}

function Input(props: InputProps) {
  const {
    showFilter,
    setShowFilter,
    value,
    setValue,
    setLocalValue,
    resetPageInfo,
  } = props;
  const localValue = JSON.parse(localStorage.getItem('currentSearch') || '[]');
  //===============================필터링===========================================
  const { no } = useParams();
  const filterData = useSelector((state: RootState) => state.filter.data);
  const [searchParams, setSearchParams] = useSearchParams();
  //===============================필터링===========================================
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
  //===============================필터링===========================================
  const objDataProcessing = (): any => {
    const changeNull = (filteringValue: boolean | number | string) => {
      if (
        filteringValue === false ||
        filteringValue === 0 ||
        filteringValue === 1000000
      ) {
        return null;
      } else return filteringValue;
    };

    return {
      check: {
        sort: {
          1: changeNull(filterData.check.sort[0]),
          DESC: changeNull(filterData.check.sort[1]),
          ASC: changeNull(filterData.check.sort[2]),
        },
        target: {
          0: changeNull(filterData.check.target[0]),
          1: changeNull(filterData.check.target[1]),
        },
        date: {
          7: changeNull(filterData.check.date[0]),
          30: changeNull(filterData.check.date[1]),
          60: changeNull(filterData.check.date[2]),
          0: changeNull(filterData.check.date[3]),
        },
        free: { 1: changeNull(filterData.check.free[0]) },
      },
      area: {
        areaNo: changeNull(filterData.area.areaNo),
      },
      price: {
        min: changeNull(filterData.price.min),
        max: changeNull(filterData.price.max),
      },
    };
  };

  const sortQuery = () => {
    if (objDataProcessing().check.sort[1] !== null) {
      return '&popular=1';
    } else
      return (
        '&sort=' +
        Object.keys(objDataProcessing().check.sort)
          .map((el, i) => {
            if (objDataProcessing().check.sort[el] !== null) {
              return Object.keys(objDataProcessing().check.sort)[i];
            }
          })
          .filter(el => el)[0]
      );
  };

  const drawObjKey = (obj: any) => {
    const value = Object.keys(obj)
      .map((el, i) => {
        if (obj[el] !== null) {
          return Object.keys(obj)[i];
        }
      })
      .filter(el => el)[0];
    return value ? value : null;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const query = `?categoryNo=${no}&title=${
      value ? value : null
    }${sortQuery()}&target=${drawObjKey(
      objDataProcessing().check.target,
    )}&date=${drawObjKey(objDataProcessing().check.date)}&free=${drawObjKey(
      objDataProcessing().check.free,
    )}&min=${
      objDataProcessing().check.free[1] === null
        ? objDataProcessing().price.min
        : null
    }&max=${
      objDataProcessing().check.free[1] === null
        ? objDataProcessing().price.max
        : null
    }&areaNo=${objDataProcessing().area.areaNo}`;
    e.preventDefault();

    if (value.length > 1) {
      setSearchParams(query);

      localStorage.setItem(
        'currentSearch',
        JSON.stringify([value, ...localValue]),
      );
      setLocalValue(JSON.parse(localStorage.getItem('currentSearch') || '[]'));
    } else alert('두 글자 이상');

    setValue('');
    resetPageInfo();
  };
  //===============================필터링===========================================
  return (
    <>
      <form
        id="inputWrap"
        className={cx(commonStyle)}
        onSubmit={e => onSubmit(e)}
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
