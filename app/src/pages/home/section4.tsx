/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { Img, NewPost, Poster } from '../../components';
import {
  getHotAll,
  getHotProgressing,
  getHotOver,
} from '../../redux/main/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/root';
import { AppDispatch } from '../../redux/root';
import { Link } from 'react-router-dom';

interface Props {
  [key: string]: any;
}

interface Focus {
  [key: string]: string;
}

interface Text {
  [key: string]: any | Focus;
}
export default function Part4(props: Props) {
  const text: Text = {
    focus: { all: 'All', inProgress: '진행 중', end: '마감' },
  };

  const [focus, setFocus] = useState(0);
  const focusArea = `translate(${focus * 154}px, -50%)`;
  const dispatch = useDispatch<AppDispatch>();

  const boardsInMain = useSelector((state: RootState) => state.main);

  const hotBoardAll = [
    boardsInMain.allBoard[1] || null,
    boardsInMain.allBoard[0] || null,
    boardsInMain.allBoard[2] || null,
  ].filter(board => !!board);
  const hotBoardProgressing = [
    boardsInMain.inProgressBoard[1] || null,
    boardsInMain.inProgressBoard[0] || null,
    boardsInMain.inProgressBoard[2] || null,
  ].filter(board => !!board);
  const hotBoardOver = [
    boardsInMain.overedBoard[1] || null,
    boardsInMain.overedBoard[0] || null,
    boardsInMain.overedBoard[2] || null,
  ].filter(board => !!board);

  useEffect(() => {
    dispatch(getHotAll());
    dispatch(getHotProgressing());
    dispatch(getHotOver());
  }, []);

  const style = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc((100vh - 59px - 518px) / 2) calc((100% - 1128px) / 2);
    .loading {
      background-color: red;
      width: 100%;
      height: 284px;
    }

    .title {
      ${font.weight[700]};
      font-size: 28px;
      line-height: 36px;
      margin: 0 0 40px;
      color: ${color.dark1};
    }

    .filter {
      padding: 4px;
      width: fit-content;
      display: flex;
      justify-content: space-between;
      background-color: ${color.light4};
      position: relative;
      ${radius[6]}
      margin: 0 0 40px;

      .focus {
        width: 150px;
        height: 32px;
        background-color: white;
        position: absolute;
        ${radius[6]}
        transition: 0.3s all ease-in-out;
        transform: ${focusArea};
        top: 50%;
      }

      & > :not(:last-child) {
        margin-right: 4px;
      }

      button {
        ${radius[6]}
        z-index: 2;
        width: 150px;
        padding: 3px 0 2px;
        line-height: 27px;
        background-color: unset;
      }
    }
    .ranking {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 8px;

      & > div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 182px;
        height: fit-content;
        position: relative;
        & > :not(:last-child) {
          margin: 0 8px 0 0;
        }
        .star {
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          width: 35px;
          height: 35px;
        }
        .trophy {
          width: 51px;
          height: 58px;
        }
        .top {
          width: 70px;
          height: 70px;
        }
      }
    }
    .posts {
      width: calc(100%);
      height: calc(284px);
      display: flex;
      justify-content: flex-start;
      overflow: visible;
      & > * {
        display: inline-block;
      }
      & > :not(:last-child) {
        margin-right: 24px;
      }
    }
  `;

  const clickFocus = (e: React.MouseEvent<HTMLButtonElement>) => {
    const slideFocus = e.currentTarget.id;
    setFocus(Number(slideFocus));
  };

  const filter = Object.keys(text.focus).map((title: string, index: number) => {
    return (
      <button key={index} id={`${index}`} className={cx()} onClick={clickFocus}>
        {text.focus[title]}
      </button>
    );
  });

  const threeBoard = (boards: any) =>
    boardsInMain.allBoard[1] &&
    boards.map((board: any, index: number) => (
      <Link key={index} to={`/post/${board.no}`}>
        <Poster size="large" data={board} big />
      </Link>
    ));

  const boardViewCheck: { [key: string]: any } = {
    0: threeBoard(hotBoardAll),
    1: threeBoard(hotBoardProgressing),
    2: threeBoard(hotBoardOver),
  };
  return (
    <div className={cx(style)}>
      <span className={'title'}>{'인기 게시글 Top3'}</span>
      <div className={'filter'}>
        <div className={'focus'} />
        {filter}
      </div>
      <div className={'ranking'}>
        <div>
          <div className={'trophy'}>
            <Img src={'img/2nd-trophy.png'} />
          </div>
        </div>
        <div>
          <div className={'star'}>
            <Img src={'img/crown.png'} />
          </div>
          <div className={'trophy top'}>
            <Img src={'img/1st-trophy.png'} />
          </div>
        </div>
        <div>
          <div className={'trophy'}>
            <Img src={'img/3rd-trophy.png'} />
          </div>
        </div>
      </div>
      <div className={'posts'}>{boardViewCheck[focus]}</div>
    </div>
  );
}
