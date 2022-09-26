import React, { useCallback, useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  setResCategorys,
  setResArrEmpty,
  setResFiltering,
} from '../../redux/board/reducer';
import Presenter from './Presenter';
import getToken from '../../utils/getToken';
import { customAxios } from '../../apis/instance';

export interface PostData {
  decimalDay: number | null;
  no: number;
  title: string;
  isDeadline: number;
  photoUrl: string | null;
  price: number | null;
  target: number;
  areaNo: number;
  areaName: string;
  nickname: string;
}

export interface Data {
  response: PostData[];
}

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
  const loginState = getToken();
  const [loginPlz, setLoginPlz] = useState(false);
  const [target, setTarget] = useState<Element | null>(null);
  const [urlInfo, setUrlInfo] = useState({
    query: location.search,
    no: no,
  });
  const navigation = useNavigate();
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

  const controlWriteButton = () => {
    if (loginState && loginState !== null) {
      navigation('/create/post');
    } else setLoginPlz(true);
  };

  const getParams = (query: string): any => {
    return searchParams.get(query);
  };

  const filteringQuery = () => {
    const queryBase = `&categoryNo=${no}&title=${decodeURIComponent(
      getParams('title'),
    )}&target=${getParams('target')}&date=${getParams('date')}&free=${getParams(
      'free',
    )}&min=${getParams('min')}&max=${getParams('max')}&areaNo=${
      getParams('areaNo') !== '0' ? getParams('areaNo') : null
    }`;
    return getParams('popular') !== null
      ? queryBase + `&popular=${getParams('popular')}`
      : queryBase + `&sort=${getParams('sort')}`;
  };

  const getData = () => {
    const filteringBaseURL = `https://mo-hae.site/boards/filter?take=8&page=${pageInfo.filtering.page}`;
    const categoryBaseURL = `https://mo-hae.site/boards/category/${no}?take=8&page=${pageInfo.category.page}`;
    customAxios
      .get(
        location.search ? filteringBaseURL + filteringQuery() : categoryBaseURL,
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
      })
      .catch(err => console.log('err', err));
  };

  const resetPageInfo = () => {
    setPageInfo({
      category: { page: 1, totalPage: 1 },
      filtering: { page: 1, totalPage: 1 },
    });
  };

  useEffect(() => {
    return () => {
      dispatch(setResArrEmpty());
    };
  }, []);

  useEffect(() => {
    if (urlInfo.no === no && urlInfo.query === location.search) {
      setPageInfo(prev => prev);
      getData();
    } else {
      dispatch(setResArrEmpty());
      getData();
      setUrlInfo({ query: location.search, no: no });
    }
  }, [location.search, no, pageInfo.category.page, pageInfo.filtering.page]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0,
      root: null,
    });

    target && observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, target]);

  return (
    <Presenter
      resetPageInfo={resetPageInfo}
      setTarget={setTarget}
      categories={categories}
      controlWriteButton={controlWriteButton}
      loginPlz={loginPlz}
      setLoginPlz={setLoginPlz}
    />
  );
}

export default Container;

const categories = [
  { no: '1', name: '전체' },
  { no: '2', name: '디자인' },
  { no: '3', name: 'IT/개발' },
  { no: '4', name: '사진/영상' },
  { no: '5', name: '기획/마케팅' },
  { no: '6', name: '번역/통역' },
  { no: '7', name: '문서작업' },
  { no: '8', name: '컨설팅' },
  { no: '9', name: '법률' },
  { no: '10', name: '과외/레슨' },
  { no: '11', name: '상담/운세' },
  { no: '12', name: '이벤트' },
  { no: '13', name: '핸드메이드' },
  { no: '14', name: '취미' },
  { no: '15', name: '생활서비스' },
  { no: '16', name: '기타' },
];
