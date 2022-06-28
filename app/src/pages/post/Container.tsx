import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';

function Post() {
  const [data, setData] = useState();
  const { no } = useParams();

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTm8iOjIsImVtYWlsIjoid2VyMDYwOTlAbmF2ZXIuY29tIiwibmlja25hbWUiOiJobmVlZGRqc2pkZSIsInBob3RvVXJsIjoicHJvZmlsZS8xNjU1MTg0MjM0MTY1X1x1MDAwNO-_vTjvv71Q77-9LmpwZyIsImlzc3VlciI6Im1vZGVybi1hZ2lsZSIsImV4cGlyYXRpb24iOiIzNjAwMCIsImlhdCI6MTY1NjM3OTYwOSwiZXhwIjoxNjU2NDE1NjA5fQ.n3pTICdAFoXrP41T-uaM87W-mg2LdqJIp3OtztXXJXw';

  useEffect(() => {
    axios
      .get(`https://mo-hae.shop/boards/${no}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log('err', err));
  }, []);

  return <> {data && <Presenter data={data} />}</>;
}

export default Post;
