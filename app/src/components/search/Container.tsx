import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { ContainerProps } from '../../types/searchComponent/type';

function Search(props: ContainerProps) {
  const { used, resetPageNation } = props;
  const { no } = useParams();
  const { search: queryString } = useLocation();

  useEffect(() => {
    resetPageNation && resetPageNation();
  }, [no, queryString]);

  return <Presenter used={used} resetPageNation={resetPageNation} />;
}

export default Search;
