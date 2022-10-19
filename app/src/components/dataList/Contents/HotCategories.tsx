import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import getHotCategories from '../../../apis/hotCategories';
import {
  HotCategoriesProps,
  HotCategoriesType,
} from '../../../types/searchComponent/dataList/type';

function HotCategories(props: HotCategoriesProps) {
  const { resetPageNation, onBlur, children } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, __] = useSearchParams();
  const [_, setSearchQuery] = useState<string | null>(
    searchParams.get('title'),
  );
  const [hotCategories, setHotCategories] = useState<HotCategoriesType[]>([]);

  const requestHotCategories = async () => {
    try {
      await getHotCategories().then(res => {
        const addRanking: HotCategoriesType[] = Object.keys(
          res.data.response,
        ).map(el => {
          return { ...res.data.response[el], ranking: Number(el) + 1 };
        });

        setHotCategories([...addRanking]);
      });
    } catch (err: any) {
      alert(err.response.data.error.message);
    }
  };

  useEffect(() => {
    requestHotCategories();
  }, []);

  const handleHotCategoriesClick = (e: React.MouseEvent, no: number) => {
    e.preventDefault();

    if (!location.search) {
      if (location.pathname !== `/boards/categories/${no}`) {
        resetPageNation && resetPageNation();
        navigate(`/boards/categories/${no}`);
      }
    } else {
      resetPageNation && resetPageNation();
      navigate(`/boards/categories/${no}`);
    }

    onBlur();
    setSearchQuery(null);
  };

  return (
    <Container>
      {children}
      {hotCategories.map((el, _) => (
        <HotCategorieWrapper
          key={el.no}
          onClick={e => handleHotCategoriesClick(e, el.no)}
        >
          <RankingNumber>{el.ranking}</RankingNumber>
          <CategoryName>{el.name}</CategoryName>
        </HotCategorieWrapper>
      ))}
    </Container>
  );
}
export default HotCategories;

const Container = styled.section`
  padding-left: 24px;
  color: #4f4e5c;
  border-left: 1px solid #e7e7e8;
  p,
  strong {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 8px;
  }
`;

const CategoryName = styled.p`
  width: 325px;
  height: 24px;
  padding-top: 1px;
  font-size: 14px;
  font-family: 'Regular';
`;

const HotCategorieWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  height: 24px;
  cursor: pointer;
  &:hover p {
    font-family: 'Bold';
  }
`;

const RankingNumber = styled.strong`
  width: 20px;
  text-align: center;
  color: #ff445e;
  font-size: 12px;
  font-family: 'Bold';
  margin: 2px 8px 0px 0px;
`;
