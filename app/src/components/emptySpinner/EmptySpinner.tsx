import React from 'react';
import { css, cx } from '@emotion/css';
import Img from '../img/Img';
import { color } from '../../styles';

interface Props {
  [key: string]: boolean | string | null;
}

function EmptySpinner(props: Props) {
  const { loading, searchNone, boardNone, subText, text, small } = props;
  const style = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const attrStyle = {
    loading: css`
      position: fixed;
      top: ${small ? '475px' : '0px'};
      left: 0px;
      background-color: ${color.light1};
      width: ${small ? '100%' : '100vw'};
      height: ${small ? '100%' : '100vh'};
      ${small && `z-index: 2;`}
      .img-wrap {
        width: 500px;
        height: 500px;
      }
    `,
    searchNone: css`
      width: 100%;
      height: 242px;
      .img-wrap {
        width: 61px;
        height: 110px;
      }
      p {
        color: ${color.dark1};
      }
      p:nth-of-type(2) {
        color: ${color.main};
      }
      p:nth-of-type(2)::after {
        content: '에 대한 검색결과가 없습니다.';
        color: ${color.dark1};
      }
    `,
    boardNone: css`
      width: 100%;
      height: 242px;
      .img-wrap {
        width: 102px;
        height: 110px;
      }
      p {
        color: ${color.main};
      }
      p::after {
        content: '에 게시글이 없습니다.';
        color: ${color.dark1};
      }
    `,
  };

  const texts: { [key: string]: string } = {
    loading: `로딩중입니다. 잠시만 기다려 주세요 :)`,
    searchNone: `'${text}'`,
    boardNone: `'${text}'`,
  };
  const imgs: { [key: string]: string } = {
    loading: !small ? '/img/loading.gif' : '',
    searchNone: '/img/search-none.png',
    boardNone: '/img/board-none.png',
  };

  const checkAttrProps = (obj: { [key: string]: string }) => {
    return Object.keys(props)
      .map(el => obj[el])
      .filter(el => el)[0];
  };

  return (
    <div className={cx(style, checkAttrProps(attrStyle))}>
      <div className="img-wrap">
        <Img src={checkAttrProps(imgs)} />
      </div>
      {subText && <p>{subText}</p>}
      <p>{checkAttrProps(texts)}</p>
    </div>
  );
}

export default EmptySpinner;
