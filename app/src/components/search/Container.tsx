import React, { useEffect, useState } from 'react';
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
      { no: number; name: string },
    ];
  };
}

interface Props {
  board?: boolean;
  main?: boolean;
  resetPageInfo: () => void;
}

function Search(props: Props) {
  const { board, main, resetPageInfo } = props;
  const [value, setValue] = useState<string>('');
  const [localValue, setLocalValue] = useState<string[]>(
    JSON.parse(localStorage.getItem('currentSearch') || '[]'),
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

  // 쿼리 순서 상관 없음
  //https://mo-hae.site//boards/filter
  //?take=12
  //&page=${페이지숫자}
  //&categoryNo=${카테고리숫자}
  //&sort=${'정렬값'} || &popular=1
  //&target=${'대상'} || null -> ex) 0=해줄래요(!), 1=구할래요(?)
  //&date=${일수} || null -> ex) 일주일(7), 1개월(30), 3개월(60)
  //&free=${1} || null
  //&min=${최소값} || null
  //&max=${최대값} || null
  //&areaNo=${지역숫자} || null
  //&title=${검색값} || null

  const hotKeyClick = (e: React.MouseEvent) =>
    console.log(
      'e.target',
      e.currentTarget.textContent?.slice(1, e.currentTarget.textContent.length),
    );

  const deleteAll = () => {
    localStorage.removeItem('currentSearch');
    setLocalValue([]);
  };

  const deleteList = (i: number) => {
    const newLocal = localValue.filter((el, index) => index != i);
    localStorage.setItem('currentSearch', JSON.stringify(newLocal));
    setLocalValue(newLocal);
  };

  return (
    <Presenter
      style={board ? 'board' : 'main'}
      value={value}
      setValue={setValue}
      deleteAll={deleteAll}
      deleteList={deleteList}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      dataList={dataList}
      setDataList={setDataList}
      localValue={localValue}
      hotKeyClick={hotKeyClick}
      setLocalValue={setLocalValue}
      resetPageInfo={resetPageInfo}
    />
  );
}

export { Search };
export type { DataList };
