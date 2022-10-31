import React from 'react';
import styled from '@emotion/styled';
import { Poster } from '../../../../components';
import { HotBoardsFilter, Tropy } from './components';
import {
  HotBoard,
  PresenterProps,
} from '../../../../types/main/fourthPage/type';
import { Link } from 'react-router-dom';

function Presenter({ focus, setFocus, hotBoardsBasket }: PresenterProps) {
  const threeBoard = (hotBoards: HotBoard[]) =>
    hotBoardsBasket.overall[1] &&
    hotBoards.map((board: HotBoard, index: number) => (
      <Link key={index} to={`/post/${board.no}`}>
        <Poster size="large" data={board} />
      </Link>
    ));

  const boardViewCheck: { [key: string]: React.ReactNode } = {
    0: threeBoard(hotBoardsBasket.overall),
    1: threeBoard(hotBoardsBasket.progressing),
    2: threeBoard(hotBoardsBasket.closed),
  };

  return (
    <Container>
      <span className="title">인기 게시글 Top3</span>
      <HotBoardsFilter focus={focus} setFocus={setFocus} />
      <div className="ranking">
        <Tropy ranking={2} />
        <Tropy ranking={1} />
        <Tropy ranking={3} />
      </div>
      <div className="posts">{boardViewCheck[focus]}</div>
    </Container>
  );
}

export default Presenter;

const Container = styled.section`
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
    font-family: 'Bold';
    font-size: 28px;
    line-height: 36px;
    margin: 0 0 40px;
    color: #4f4e5c;
  }

  .ranking {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 8px;
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
