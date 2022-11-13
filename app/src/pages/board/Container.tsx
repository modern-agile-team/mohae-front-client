import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { requestCategorySelected, requestFiltering } from '../../apis/board';
import {
  setResCategorys,
  setResArrEmpty,
  setResFiltering,
} from '../../redux/board/reducer';
import { useDispatch } from 'react-redux';
import Presenter from './Presenter';

interface PageNation {
  category: {
    page: number;
    totalPage: number;
  };
  filtering: {
    page: number;
    totalPage: number;
  };
}

function Container() {
  const dispatch = useDispatch();
  const { no } = useParams();
  const [searchParams, _] = useSearchParams();
  const { search: queryString } = useLocation();
  const [target, setTarget] = useState<Element | null>(null);
  const [urlInfo, setUrlInfo] = useState({
    query: queryString,
    no: no,
  });
  const [pageNation, setPageNation] = useState<PageNation>({
    category: {
      page: 1,
      totalPage: 1,
    },
    filtering: {
      page: 1,
      totalPage: 1,
    },
  });

  const getParams = (key: string): any => {
    if (key === 'popular') {
      return searchParams.get('popular') === null
        ? `&sort=${searchParams.get('sort')}`
        : `&${key}=${searchParams.get(key)}`;
    }
    if (key === 'areaNo') {
      return searchParams.get('areaNo') === '0'
        ? `&${key}=null`
        : `&${key}=${searchParams.get(key)}`;
    } else {
      return key === 'title'
        ? `&${key}=${decodeURIComponent(String(searchParams.get(key)))}`
        : `&${key}=${searchParams.get(key)}`;
    }
  };

  const filteringQuery = useCallback(() => {
    const queryString = `${getParams('categoryNo')}${decodeURIComponent(
      getParams('title'),
    )}${getParams('target')}${getParams('date')}${getParams('free')}${getParams(
      'min',
    )}${getParams('max')}${getParams('areaNo')}${getParams('popular')}`;
    return queryString;
  }, [queryString]);

  const handlingRequest = () => {
    return queryString
      ? requestFiltering(pageNation.filtering.page, filteringQuery())
      : requestCategorySelected(Number(no), pageNation.category.page);
  };

  const getData = async () => {
    try {
      await handlingRequest().then(res => {
        if (!queryString) {
          dispatch(setResCategorys(res.data.response));
          setPageNation((prev: PageNation) => ({
            category: {
              ...prev.category,
              totalPage: pageNation.category.totalPage + 1,
            },
            filtering: { page: 1, totalPage: 1 },
          }));
        } else {
          dispatch(setResFiltering(res.data.response));
          setPageNation((prev: PageNation) => ({
            category: { page: 1, totalPage: 1 },
            filtering: {
              ...prev.filtering,
              totalPage: pageNation.filtering.totalPage + 1,
            },
          }));
        }
      });
    } catch (err) {
      alert('알 수 없는 에러가 발생하였습니다.');
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setResArrEmpty());
    };
  }, []);

  useEffect(() => {
    const deboucing = setTimeout(() => {
      if (urlInfo.no === no && urlInfo.query === queryString) {
        setPageNation(prev => prev);
        getData();
      } else {
        dispatch(setResArrEmpty());
        getData();
        setUrlInfo({ query: queryString, no: no });
      }
    }, 500);
    return () => {
      clearTimeout(deboucing);
    };
  }, [queryString, no, pageNation.category.page, pageNation.filtering.page]);

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setPageNation(prev => {
          if (prev.category.totalPage > prev.category.page) {
            return {
              category: { ...prev.category, page: prev.category.page + 1 },
              filtering: { ...prev.filtering },
            };
          }
          if (prev.filtering.totalPage > prev.filtering.page) {
            return {
              category: { ...prev.category },
              filtering: { ...prev.filtering, page: prev.filtering.page + 1 },
            };
          }
          return prev;
        });
      }
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0,
      root: null,
    });

    target && observer.observe(target);
    return () => observer.disconnect();
  }, [handleIntersect, target]);

  const resetPageNation = () => {
    setPageNation({
      category: { page: 1, totalPage: 1 },
      filtering: { page: 1, totalPage: 1 },
    });
  };

  return <Presenter resetPageNation={resetPageNation} setTarget={setTarget} />;
}

export default Container;
