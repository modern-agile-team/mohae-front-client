import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { RootState } from '../../redux/root';
import { ENDPOINT } from '../../utils/ENDPOINT';
import Presenter from './Presenter';

interface Props {
  board?: boolean;
  main?: boolean;
  resetPageInfo?: () => void;
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
  const [showDataList, setShowDataList] = useState(false);
  const [hotKeys, setHotKeys] = useState<
    { no: number; name: string; ranking: number }[]
  >([]);
  const navigate = useNavigate();
  const getParams = (query: string): any => {
    return searchParams.get(query);
  };
  const location = useLocation();

  const onBlur = () => {
    setShowDataList(false);
  };

  const onFocus = () => {
    if (showFilter) {
      return;
    } else {
      setShowDataList(true);
    }
  };

  useEffect(() => {
    axios
      .get(`${ENDPOINT}categories/popular`)
      .then(res => {
        const addRanking = Object.keys(res.data.response).map(el => {
          return { ...res.data.response[el], ranking: Number(el) + 1 };
        });
        setHotKeys([...addRanking]);
      })
      .catch(err => console.log('err', err));
  }, []);

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

  const titleQuery = (historyValue?: string) => {
    if (historyValue) {
      return historyValue;
    } else if (value) {
      return value;
    } else {
      return decodeURIComponent(getParams('title'));
    }
  };
  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    str: string,
    historyValue?: string,
  ) => {
    onBlur();
    if (searchParams.get('title') === value) {
      e.preventDefault();
      setValue('');
      return;
    }
    const query = `?categoryNo=${no || 1}&title=${titleQuery(
      historyValue,
    )}${sortQuery()}&target=${drawObjKey(
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
        setValue('');
        resetPageInfo && resetPageInfo();
      } else alert('두 글자 이상');
    } else {
      setSearchParams(query);
      resetPageInfo && resetPageInfo();
    }
    if (main) {
      navigate('boards/categories/1' + query);
    }
  };

  const hotKeyClick = (e: React.MouseEvent, no: number) => {
    e.preventDefault();
    if (!location.search) {
      if (location.pathname !== `/boards/categories/${no}`) {
        resetPageInfo && resetPageInfo();
        navigate(`/boards/categories/${no}`);
      }
    } else {
      resetPageInfo && resetPageInfo();
      navigate(`/boards/categories/${no}`);
    }
  };

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
      hotKeys={hotKeys}
      localValue={localValue}
      hotKeyClick={hotKeyClick}
      setLocalValue={setLocalValue}
      onSubmit={onSubmit}
      onBlur={onBlur}
      onFocus={onFocus}
      showDataList={showDataList}
    />
  );
}

export { Search };
