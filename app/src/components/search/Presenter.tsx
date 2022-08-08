import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { Props } from '../button';
import { color, font, radius } from '../../styles';
import Img from '../img/Img';
import Input from './Input';
import Filter from '../filter/Container';
import { Link } from 'react-router-dom';

interface InputProps extends Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  style: string;
  onChange?: () => any;
  showFilter: boolean;
  setShowFilter: Dispatch<React.SetStateAction<boolean>>;
  hotKeys: { no: number; name: string; ranking: number }[];
  localValue: string[];
  deleteAll: () => void;
  deleteList: (i: number) => void;
  hotKeyClick: (e: React.MouseEvent, no: number) => void;
  setLocalValue: Dispatch<React.SetStateAction<string[]>>;
  onSubmit: (e: any, str: string, searchValue?: string) => void;
}

function Presenter(props: InputProps) {
  const {
    style,
    showFilter,
    setShowFilter,
    hotKeys,
    localValue,
    deleteAll,
    deleteList,
    hotKeyClick,
    value,
    setValue,
    setLocalValue,
    onSubmit,
  } = props;
  const list: string[] = localValue;

  useEffect(() => {
    localValue.slice(0, 5);
  }, []);

  const realBoxStyle = () => {
    const common = css`
      #dataListWrap {
        box-shadow: ${showFilter ? '' : '0px 8px 8px rgba(132, 131, 141, 0.5)'};
        position: absolute;
        background-color: white;
        border-radius: 0px 0px 6px 6px;
        display: flex;
        padding: 12px 0px 32px 24px;
        visibility: hidden;
        :hover {
          visibility: visible;
        }
      }
      &:focus-within #dataListWrap {
        visibility: ${showFilter ? 'hidden' : 'visible'};
      }
      &:focus-within {
        border-radius: 6px 6px 0px;
      }
    `;

    return style === 'board'
      ? css`
          ${common}
          #dataListWrap {
            width: 812px;
            height: 240px;
            top: 38px;
          }
        `
      : css`
          ${common}
          #dataListWrap {
            width: 648px;
            height: 239px;
            top: 63px;
          }
        `;
  };

  const parentWrap = css`
    width: fit-content;
    height: fit-content;
    position: relative;
    z-index: 4;
    ${realBoxStyle()}
  `;

  const title = css`
    font-size: 18px;
    ${font.weight.regular}
    color: ${color.dark1};
  `;

  const userSearchWrap = () => {
    const common = css`
      #titleWrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        padding: 0px 8px;
      }
      #allClear {
        width: 56px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        ${radius[6]}
        padding: 1px;
        cursor: pointer;
        ${font.size[12]}
        ${font.weight.regular}
        color: ${color.dark2};
        :hover {
          background-color: ${color.light1};
        }
      }
    `;

    return style === 'board'
      ? css`
          width: 376px;
          ${common}
          padding-right: 24px;
        `
      : css`
          width: 276px;
          ${common}
          margin-right: 16px;
          padding-right: 24px;
          #titleWrap {
            width: 276px;
          }
        `;
  };

  const searchList = () => {
    const searchStyle = css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      ${radius[6]}
      cursor: pointer;
      color: ${color.dark2};
      ${font.size[14]}
      padding: 0px 8px;
      width: ${style === 'board' ? '352px' : '276px'};
      #list {
        height: 32px;
        ${radius[6]}
        padding-top: 4px;
      }
      #delete {
        ${radius.circle}
        width: 20px;
        height: 20px;
        padding: 2px;
      }
    `;
    const hover = css`
      &:hover {
        background-color: ${color.light1};
      }
      #delete:hover {
        background-color: ${color.light4};
      }
    `;

    return list.length === 0 ? (
      <div className={cx(searchStyle)}>
        <div id="list">최근 검색 내역이 없습니다.</div>
      </div>
    ) : (
      list.map(
        (el, i) =>
          i < 5 && (
            <div
              className={cx(searchStyle, hover)}
              key={i}
              onClick={e => {
                onSubmit(e, 'fliter', el);
              }}
            >
              <div id="list">{el}</div>
              <div
                id="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteList(i);
                }}
              >
                <Img src="/img/close.png" />
              </div>
            </div>
          ),
      )
    );
  };

  const hotKeyWrap = css`
    padding-left: 24px;
    border-left: 1px solid ${color.light4};
    p {
      display: flex;
      height: 32px;
      margin-bottom: 8px;
    }
  `;

  const HotKeyList = () => {
    const hotKeyStyle = css`
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      height: 24px;
      cursor: pointer;
      #no {
        width: 20px;
        height: 20px;
        text-align: center;
        color: ${color.main};
        ${font.size[12]}
        ${font.weight[700]}
        margin: 2px 8px 0px 0px;
      }
      #categoryName {
        width: 325px;
        height: 24px;
        padding-top: 1px;
        ${font.size[14]}
        ${font.weight[400]}
      }
    `;

    return hotKeys.map((el, i) => (
      <div
        key={el.no}
        className={cx(hotKeyStyle)}
        onClick={e => hotKeyClick(e, el.no)}
      >
        <div id="no">{el.ranking}</div>
        <div id="categoryName">{el.name}</div>
      </div>
    ));
  };

  const show = () =>
    style === 'board' ? (
      <Input
        value={value}
        setValue={setValue}
        board
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        setLocalValue={setLocalValue}
        onSubmit={onSubmit}
      />
    ) : (
      <Input
        value={value}
        setValue={setValue}
        main
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        setLocalValue={setLocalValue}
        onSubmit={onSubmit}
      />
    );

  return (
    <div className={cx(parentWrap)}>
      {show()}
      <div id="dataListWrap">
        <div className={cx(userSearchWrap())}>
          <div id="titleWrap">
            <p className={cx(title)}>최근 검색어</p>
            <div id="allClear" onClick={deleteAll}>
              전체 삭제
            </div>
          </div>
          {searchList()}
        </div>
        <div className={cx(hotKeyWrap)}>
          <p className={cx(title)}>인기 카테고리</p>
          {HotKeyList()}
        </div>
      </div>
      {showFilter && (
        <Filter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}

export default Presenter;
