import { AxiosResponse } from 'axios';
import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

const requestGetPostData = (no: number): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).get(`boards/${no}`);
};

const requestPostLike = (
  no: number,
  body: { judge: boolean },
): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).post(
    `https://mo-hae.site/like/board/${no}`,
    body,
  );
};

const requestPostClosing = (no: number): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).patch(`boards/close/${no}`);
};

const requestPostReopening = (no: number): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).patch(`boards/cancel/${no}`);
};

const requestDeletePost = (no: number): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).delete(
    `https://mo-hae.site/boards/${no}`,
  );
};

export {
  requestGetPostData,
  requestPostLike,
  requestPostClosing,
  requestPostReopening,
  requestDeletePost,
};
