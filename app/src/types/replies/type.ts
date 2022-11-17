interface TypeForExtends {
  commentIndex: number;
}

interface ReplyList {
  replyNo: number;
  replyContent: string;
  replyWriterNo: number;
  replyWriterPhotoUrl: string;
  replyCreatedAt: string;
}

interface RepliesListProps extends TypeForExtends {
  replies: ReplyList[];
}

interface ReplyItemProps extends TypeForExtends {
  replyIndex: number;
}

interface ReplierProps extends TypeForExtends {
  handleEditingButton: () => void;
  replyIndex: number;
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
  replyNo: number;
}

export type {
  RepliesListProps,
  ReplyItemProps,
  ReplierProps,
  ReplyList,
  EditAndDeleteParameterType,
  TypeForExtends as RepliesCommonProps,
  ExtendsTypeUsedInAPI as PostParameterType,
  ErrorState,
};
