import { customAxios } from './instance';
import setInterceptors from './common/setInterceptors';

export const postQuestion = async (body: FormData) => {
  const response = await setInterceptors(customAxios).post(
    `/email/question`,
    body,
  );

  return response.data;
};
