import { EditorState } from 'draft-js';
import instance from './instance';

export interface NoticePostType {
  title: string;
  description: string;
  postNo: number;
  editForm: boolean;
  params: string;
}

export const createNotice = (data: NoticePostType) => {
  const { title, description, params } = data;
  return instance.post(`/${params}`, { title, description });
};

export const getNoticePost = (body: string) => {
  return instance.get(`/${body}`);
};

export const editNoticePost = (data: NoticePostType) => {
  const { title, description, params, postNo } = data;
  return instance.put(`/${params}/${postNo}`, { title, description });
};

export const deleteNoticePost = (data: {
  params: string | undefined;
  postNo: number;
}) => {
  const { params, postNo } = data;
  return instance.delete(`/${params}/${postNo}`);
};

export const searchNoticePost = (data: { params?: string; search: string }) => {
  const { params, search } = data;
  return instance.get(`/${params}/search?title=${search}&take=5&page=1`);
};
