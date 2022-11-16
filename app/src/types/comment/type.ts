import React from 'react';
import { ReplyList } from '../replies/type';

interface CommentList {
  commentContent: string;
  commentCreatedAt: string;
  commentNo: number;
  commenterNickname: string;
  commenterNo: number;
  commenterPhotoUrl: string;
  isCommenter: number;
  replies: ReplyList[];
}

interface CommentInputFormProps {
  popupContents: { text: string; children: React.ReactNode };
}
interface CommenterProps {
  commentIndex: number;
  handleEditingButton: () => void;
}

interface CommentItemProps {
  commentIndex: number;
}

interface CommentInputProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => Promise<void>;
  value: string;
  usedForEdit: boolean;
  handleClose?: () => void;
  errorState: boolean;
  errorMessage: string;
}

interface ExtendsTypeUsedInAPI {
  no: number;
  body?: {
    content: string;
  };
}

interface ErrorState {
  message: string;
  errorOccurred: boolean;
}

interface EditAndDeleteParameterType extends ExtendsTypeUsedInAPI {
  commentNo: number;
}

export type {
  CommentList,
  CommenterProps,
  CommentItemProps,
  CommentInputProps,
  CommentInputFormProps,
  EditAndDeleteParameterType,
  ExtendsTypeUsedInAPI as PostParameterType,
  ErrorState,
};
