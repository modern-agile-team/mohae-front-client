import instance from './instance';

export interface NoticePostType {
  title: string;
  description: string;
  params: string;
}

export const createNotice = (data: NoticePostType) => {
  const { title, description, params } = data;
  return instance.post(`/${params}`, { title, description });
};

export const getNoticePost = (body: string) => {
  return instance.get(`/${body}`);
};
