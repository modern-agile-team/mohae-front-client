import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import {
  setResCategorys,
  setResArrEmpty,
  setResFiltering,
} from '../../redux/board/reducer';
import { useDispatch } from 'react-redux';
import Presenter from './Presenter';
import { customAxios } from '../../apis/instance';

interface PageInfo {
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
  const location = useLocation();
  const [target, setTarget] = useState<Element | null>(null);
  const [urlInfo, setUrlInfo] = useState({
    query: location.search,
    no: no,
  });
  const [pageInfo, setPageInfo] = useState<PageInfo>({
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
  }, [location.search]);

  const getData = async () => {
    const filteringBaseURL = `https://mo-hae.site/boards/filter?take=8&page=${pageInfo.filtering.page}`;
    const categoryBaseURL = `https://mo-hae.site/boards/category/${no}?take=8&page=${pageInfo.category.page}`;
    try {
      await customAxios
        .get(
          location.search
            ? filteringBaseURL + filteringQuery()
            : categoryBaseURL,
        )
        .then(res => {
          if (!location.search) {
            dispatch(setResCategorys(res.data.response));
            setPageInfo((prev: PageInfo) => ({
              category: {
                ...prev.category,
                totalPage: pageInfo.category.totalPage + 1,
              },
              filtering: { page: 1, totalPage: 1 },
            }));
          } else {
            dispatch(setResFiltering(res.data.response));
            setPageInfo((prev: PageInfo) => ({
              category: { page: 1, totalPage: 1 },
              filtering: {
                ...prev.filtering,
                totalPage: pageInfo.filtering.totalPage + 1,
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
      if (urlInfo.no === no && urlInfo.query === location.search) {
        setPageInfo(prev => prev);
        getData();
      } else {
        dispatch(setResArrEmpty());
        getData();
        setUrlInfo({ query: location.search, no: no });
      }
    }, 500);
    return () => clearTimeout(deboucing);
  }, [location.search, no, pageInfo.category.page, pageInfo.filtering.page]);

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setPageInfo(prev => {
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

  const resetPageInfo = () => {
    setPageInfo({
      category: { page: 1, totalPage: 1 },
      filtering: { page: 1, totalPage: 1 },
    });
  };

  return <Presenter resetPageInfo={resetPageInfo} setTarget={setTarget} />;
}

export default Container;
