import React from 'react';
import { useState, useEffect } from 'react';
import { requestHotBoards } from '../../../../apis/hotBoards';
import { HotBoard, HotBoardsBasket } from '../../../../types/main/fourthPage/type';
import Presenter from './Presenter';

function Container() {
  const [focus, setFocus] = useState(0);
  const [hotBoardsBasket, setHotBoardsBasket] = useState<HotBoardsBasket>({
    overall: [],
    progressing: [],
    closed: [],
  });

  const putHotBoardsInBasket = (group: string, contents: HotBoard[]) => {
    const sortedArray = [
      contents[1] || false,
      contents[0] || false,
      contents[2] || false,
    ].filter(board => board);

    setHotBoardsBasket(prev => {
      return { ...prev, [group]: [...sortedArray] };
    });
  };

  const requestGetHotBoards = async ({
    group,
    URL,
  }: {
    group: string;
    URL: string;
  }) => {
    try {
      await requestHotBoards(URL).then(res =>
        putHotBoardsInBasket(group, res.data.response),
      );
    } catch (err) {
      alert('알 수 없는 에러 발생');
    }
  };

  useEffect(() => {
    requestGetHotBoards({
      group: 'overall',
      URL: 'boards/hot?select=0',
    });
    requestGetHotBoards({
      group: 'progressing',
      URL: 'boards/hot?select=1',
    });
    requestGetHotBoards({
      group: 'closed',
      URL: 'boards/hot?select=2',
    });
  }, []);

  return (
    <Presenter
      focus={focus}
      setFocus={setFocus}
      hotBoardsBasket={hotBoardsBasket}
    />
  );
}

export default Container;
