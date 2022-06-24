import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';

function Post() {
  const [data, setData] = useState();
  const { no } = useParams();

  useEffect(() => {
    axios
      .get(`https://mo-hae.site/boards/${no}`)
      .then(res => setData(res.data.response))
      .catch(err => console.log('err', err));
  }, []);

  return <> {data && <Presenter data={data} />}</>;
}

export default Post;
