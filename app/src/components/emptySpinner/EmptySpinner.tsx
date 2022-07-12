import React from 'react';
import { css, cx } from '@emotion/css';
import Img from '../img/Img';
import { color } from '../../styles';

interface Props {
  [key: string]: boolean | string | null;
}

function EmptySpinner(props: Props) {
  const { loading, searchNone, boardNone, text } = props;
  const style = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const attrStyle = {
    loading: css`
      position: fixed;
      top: 0px;
      left: 0px;
      background-color: white;
      width: 100vw;
      height: 100vh;
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
        color: ${color.main};
      }
      p::after {
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
    loading: '/img/loading.gif',
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
      <p>{checkAttrProps(texts)}</p>
    </div>
  );
}

export default EmptySpinner;
