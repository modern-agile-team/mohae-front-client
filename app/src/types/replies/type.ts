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

interface RepliesProps extends TypeForExtends {
  handleModalView: () => void;
  handlePopupView: () => void;
}

interface RepliesInputFromProps extends TypeForExtends {
  handlePopupView: () => void;
}

interface RepliesListProps extends TypeForExtends {
  handleModalView: () => void;
  replies: ReplyList[];
}

interface ReplyItemProps extends TypeForExtends {
  handleModalView: () => void;
  replyIndex: number;
}

interface ReplierProps extends TypeForExtends {
  handleModalView: () => void;
  handleEditingButton: () => void;
  replyIndex: number;
}

interface ExtendsTypeUsedInAPI {
  no: number;
  body?: {
    content: string;
  };
}

interface EditAndDeleteParameterType extends ExtendsTypeUsedInAPI {
  replyNo: number;
}

export type {
  ReplyList,
  RepliesProps,
  RepliesInputFromProps,
  RepliesListProps,
  ReplyItemProps,
  ReplierProps,
  EditAndDeleteParameterType,
  ExtendsTypeUsedInAPI as PostParameterType,
};
