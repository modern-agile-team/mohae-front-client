/** @format */

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ENDPOINT } from '../utils/ENDPOINT';
import setInterceptors from '../apis/common/setInterceptors';
import { customAxios } from '../apis/instance';

interface HEADERS {
  [key: string]: any;
}

export function BoardGetRequest(param: string, token: string, action: any) {
  const dispatch = useDispatch();
  const URL = `${ENDPOINT}${param}`,
    CONFIG: HEADERS = {
      headers: {
        accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : null,
      },
    };
  useEffect(() => {
    setInterceptors(customAxios)
      .get(URL, CONFIG)
      .then(res => {
        if (res.status >= 200 && res.status <= 204) {
          dispatch(action(res.data.response));
          // console.log(`res.data.response`, res.data.response);
        }
        return res.data;
      });
  }, []);
}
