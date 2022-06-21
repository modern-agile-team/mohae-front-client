import React, { useState } from 'react';
import { Props } from '../button';
import Presenter from './Presenter';

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

function Search(props: Props) {
  const { board, main } = props;
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

  const hotKeyClick = (e: React.MouseEvent) =>
    console.log(
      'e.target',
      e.currentTarget.textContent?.slice(1, e.currentTarget.textContent.length)
    );

  const deleteAll = () => {
    localStorage.removeItem('currentSearch');
    setLocalValue([]);
  };

  const deleteList = (i: number) => {
    const newLocal = localValue.reverse().filter((el, index) => index != i);
    localStorage.setItem('currentSearch', JSON.stringify(newLocal.reverse()));
    setLocalValue(newLocal);
  };

  return (
    <Presenter
      style={board ? 'board' : 'main'}
      deleteAll={deleteAll}
      deleteList={deleteList}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      dataList={dataList}
      setDataList={setDataList}
      localValue={localValue}
      hotKeyClick={hotKeyClick}
    />
  );
}

export { Search };
export type { DataList };
