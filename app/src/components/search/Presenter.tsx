import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Props } from '../button';
import { color, font, radius } from '../../styles';
import Img from '../img/Img';
import Input from './Input';
import Filter from '../filter/Presenter';

interface InputProps extends Props {
  value?: string | number;
  style: string;
  onChange?: () => any;
}

interface DataList {
  hotKey: {
    statusCode: number;
    msg: string;
    response: [
      { no: number; name: string },
      { no: number; name: string },
      { no: number; name: string },
      { no: number; name: string },
      { no: number; name: string }
    ];
  };
}
// 리덕스로 바꾸게 되면 서로 연결 되야 하는 데이터나 코드가 리덕스에 저장이 되어야 함
function Presenter(props: InputProps) {
  const { style } = props;
  const [localValue, setLocalValue] = useState<string[]>(
    JSON.parse(localStorage.getItem('currentSearch') || '[]')
  );
  const [showFilter, setShowFilter] = useState(false);
  const [dataList, setDataList] = useState<DataList>({
    hotKey: {
      statusCode: 200,
      msg: '',
      response: [
        {
          no: 1,
          name: '개발',
        },
        {
          no: 2,
          name: '디자인',
        },
        {
          no: 3,
          name: '일상',
        },
        {
          no: 4,
          name: '응애',
        },
        {
          no: 5,
          name: '프론트',
        },
      ],
    },
  });

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

  const deleteAll = () => {
    localStorage.removeItem('currentSearch');
    setLocalValue([]);
  };

  const deleteList = (i: number) => {
    const newLocal = localValue.reverse().filter((el, index) => index != i);
    localStorage.setItem('currentSearch', JSON.stringify(newLocal.reverse()));
    setLocalValue(newLocal);
  };

  const searchList = () => {
    const list: string[] = localValue.reverse().slice(0, 5);

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
        <div id='list'>최근 검색 내역이 없습니다.</div>
      </div>
    ) : (
      list.map((el, i) => (
        <div id='#wrap' className={cx(searchStyle, hover)} key={i}>
          <div id='list'>{el}</div>
          <div id='delete' onClick={() => deleteList(i)}>
            <Img src='/img/close.png' />
          </div>
        </div>
      ))
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
    const list = dataList.hotKey.response;

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

    const onClick = (e: React.MouseEvent) =>
      console.log(
        'e.target',
        e.currentTarget.textContent?.slice(
          1,
          e.currentTarget.textContent.length
        )
      );

    return list.map(el => (
      <div key={el.no} className={cx(hotKeyStyle)} onClick={e => onClick(e)}>
        <div id='no'>{el.no}</div>
        <div id='categoryName'>{el.name}</div>
      </div>
    ));
  };

  const show = () =>
    style === 'board' ? (
      <Input board showFilter={showFilter} setShowFilter={setShowFilter} />
    ) : (
      <Input main showFilter={showFilter} setShowFilter={setShowFilter} />
    );

  return (
    <form className={cx(parentWrap)}>
      {show()}
      <div id='dataListWrap'>
        <div className={cx(userSearchWrap())}>
          <div id='titleWrap'>
            <p className={cx(title)}>최근 검색어</p>
            <div id='allClear' onClick={deleteAll}>
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
      {showFilter && <Filter />}
    </form>
  );
}

export default Presenter;
