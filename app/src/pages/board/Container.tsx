import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Presenter from './Presenter';

function Board() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get('https://mo-hae.site/boards/category/1')
      .then(res => setData(res.data.response))
      .catch(err => console.log('err', err));
  }, []);

  return <>{data && <Presenter data={data} />}</>;
}

export default Board;
