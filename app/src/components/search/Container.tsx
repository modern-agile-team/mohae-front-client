import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { RootState } from '../../redux/root';
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
  const { no } = useParams();
  const filterData = useSelector((state: RootState) => state.filter.data);
  const [searchParams, setSearchParams] = useSearchParams();
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>, str: string) => {
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

    if (str === 'search') {
      if (value.length > 1) {
        setSearchParams(query);

        localStorage.setItem(
          'currentSearch',
          JSON.stringify([value, ...localValue]),
        );
        setLocalValue(
          JSON.parse(localStorage.getItem('currentSearch') || '[]'),
        );
      } else alert('두 글자 이상');

      setValue('');
    } else {
      setSearchParams(query);
      resetPageInfo();
    }
  };

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
      onSubmit={onSubmit}
    />
  );
}

export { Search };
export type { DataList };
