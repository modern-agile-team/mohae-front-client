import { css, cx } from '@emotion/css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import requestHotCategories from '../../../apis/hotCategories';
import {
  HotCategoriesProps,
  HotCategoriesType,
} from '../../../types/searchComponent/dataList/type';

function HotCategories(props: HotCategoriesProps) {
  const { resetPageInfo, onBlur, children } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, __] = useSearchParams();
  const [_, setSearchQuery] = useState<string | null>(
    searchParams.get('title'),
  );
  const [hotCategories, setHotCategories] = useState<HotCategoriesType[]>([]);

  useEffect(() => {
    requestHotCategories(setHotCategories);
  }, []);

  const handleHotCategoriesClick = (e: React.MouseEvent, no: number) => {
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

    onBlur();
    setSearchQuery(null);
  };

  return (
    <div className={cx(hotCategoriesWrap)}>
      {children}
      {hotCategories.map((el, _) => (
        <div
          key={el.no}
          className={cx(hotCategoriestyle)}
          onClick={e => handleHotCategoriesClick(e, el.no)}
        >
          <div id="no">{el.ranking}</div>
          <div id="categoryName">{el.name}</div>
        </div>
      ))}
    </div>
  );
}
export default HotCategories;

const hotCategoriesWrap = css`
  padding-left: 24px;
  color: #4f4e5c;
  border-left: 1px solid #e7e7e8;
  p {
    display: flex;
    height: 32px;
    margin-bottom: 8px;
  }
`;

const hotCategoriestyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  height: 24px;
  cursor: pointer;
  &:hover #categoryName {
    font-family: 'Bold';
  }
  #no {
    width: 20px;
    height: 20px;
    text-align: center;
    color: #ff445e;
    font-size: 12px;
    font-family: 'Bold';
    margin: 2px 8px 0px 0px;
  }
  #categoryName {
    width: 325px;
    height: 24px;
    padding-top: 1px;
    font-size: 14px;
    font-family: 'Regular';
  }
`;
