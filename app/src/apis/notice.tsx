import { customAxios } from './instance';
import setInterceptors from './common/setInterceptors';

export interface NoticePostType {
  title: string;
  description: string;
  postNo: number;
  editForm: boolean;
  params: string;
}

export const createNotice = (data: NoticePostType) => {
  const { title, description, params } = data;
  return setInterceptors(customAxios).post(`/${params}`, {
    title,
    description,
  });
};

export const getNoticePost = (body: string) => {
  return setInterceptors(customAxios).get(`/${body}`);
};

export const editNoticePost = (data: NoticePostType) => {
  const { title, description, params, postNo } = data;
  return setInterceptors(customAxios).put(`/${params}/${postNo}`, {
    title,
    description,
  });
};

export const deleteNoticePost = (data: {
  params: string | undefined;
  postNo: number;
}) => {
  const { params, postNo } = data;
  return setInterceptors(customAxios).delete(`/${params}/${postNo}`);
};

export const searchNoticePost = (data: { params?: string; search: string }) => {
  const { params, search } = data;
  return setInterceptors(customAxios).get(
    `/${params}/search?title=${search}&take=5&page=1`,
  );
};

const response = 1;
