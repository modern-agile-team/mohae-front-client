import { ReplyList } from '../replies/type';

interface TypeForExtends {
  handleModalView: () => void;
}

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

interface CommenterProps extends TypeForExtends {
  commentIndex: number;
  handleEditingButton: () => void;
}

interface CommentItemProps extends TypeForExtends {
  handlePopupView: () => void;
  commentIndex: number;
}

interface CommentListProps extends TypeForExtends {
  handlePopupView: () => void;
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

interface EditAndDeleteParameterType extends ExtendsTypeUsedInAPI {
  commentNo: number;
}

export type {
  CommentList,
  CommenterProps,
  TypeForExtends as CommentInputFormProps,
  CommentItemProps,
  CommentListProps,
  CommentInputProps,
  EditAndDeleteParameterType,
  ExtendsTypeUsedInAPI as PostParameterType,
};
