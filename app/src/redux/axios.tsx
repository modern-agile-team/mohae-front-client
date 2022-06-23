/** @format */

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const ENDPOINT = 'https://mo-hae.site/';

interface HEADERS {
  [key: string]: any;
}

export function useGetRequest(param: string, token: string, action: any) {
  const dispatch = useDispatch();
  const URL = `${ENDPOINT}${param}`,
    CONFIG: HEADERS = {
      headers: {
        accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : null,
      },
    };
  useEffect(() => {
    axios.get(URL, CONFIG).then((res) => {
      if (res.status >= 200 && res.status <= 204) {
        dispatch(action(res.data.response));
        // console.log(`res.data.response`, res.data.response);
      }
      return res.data;
    });
  }, []);
}
