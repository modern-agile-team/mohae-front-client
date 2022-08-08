import instance from './instance';

export const postQuestion = (body: FormData) => {
  return instance.post(`/email/question`, body);
};
