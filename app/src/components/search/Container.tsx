import React from 'react';
import { Props } from '../button';
import Presenter from './Presenter';

function Search(props: Props) {
  const { board, main } = props;
  return <Presenter style={board ? 'board' : 'main'} />;
}

export default Search;
