import { customAxios } from './instance';
import setInterceptors from './common/setInterceptors';

export const postQuestion = (body: FormData) => {
  return setInterceptors(customAxios).post(`/email/question`, body);
};

