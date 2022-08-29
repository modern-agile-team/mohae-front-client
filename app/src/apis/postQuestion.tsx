import { customAxios } from './instance';
import setInterceptors from './common/setInterceptors';

export const postQuestion = (body: FormData) => {
  return setInterceptors(customAxios).post(`/email/question`, body);
};

export const profile = () => {
  return setInterceptors(customAxios)
    .get('/profile/1')
    .then(res => console.log(res))
    .catch(error => {
      if (error.response.status === 410) alert('세션이 만료되었습니다');
    });
};
