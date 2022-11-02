import SubArticle from './NoticeWriteSubAriticle';

interface Props {
  notices: NoticeTYPE[];
  onEdit: (no: number, title: string, description: string) => void;
  onDelete: (no: number) => void;
}
const response = 1;

export interface NoticeTYPE {
  no: number;
  title: string;
  description: string;
  createdAt: string;
}
const CommentContainer = ({ notices, onEdit, onDelete }: Props) => {
  return (
    <section>
      {notices.map((notice: NoticeTYPE, index: number) => (
        <SubArticle
          key={index}
          notice={notice}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};
export default CommentContainer;
