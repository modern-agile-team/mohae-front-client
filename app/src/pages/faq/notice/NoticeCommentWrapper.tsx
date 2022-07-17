import SubArticle from './NoticeWriteSubAriticle';

interface Props {
  notices: NoticeTYPE[];
}

export interface NoticeTYPE {
  no: number;
  title: string;
  description: string;
  createdAt: string;
}
const CommentContainer = ({ notices }: Props) => {
  return (
    <section>
      {notices.map((notice: NoticeTYPE, index: number) => (
        <SubArticle key={index} notice={notice} />
      ))}
    </section>
  );
};
export default CommentContainer;
