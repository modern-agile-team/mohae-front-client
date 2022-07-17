import { css, cx } from '@emotion/css';
import SideBar from '../notice/NoticeWriteSidebar';
import ArticleTitle from '../notice/NoticeWriteAriticleTitle';
import HeaderSearch from '../notice/NoticeWriteSearchHeader';
import CommetContainer from '../notice/NoticeCommentWrapper';
import TextArea from '../notice/NoticeWriteTextArea';
import { useEffect, useState } from 'react';
import { createNoticePost, getNotices } from '../../../redux/notice/reducer';
import { createNotice, getNoticePost } from '../../../apis/notice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/root';
import { RootState } from '../../../redux/root';
import { NoticeTYPE } from '../notice/NoticeCommentWrapper';

const Notice = () => {
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const [form, setForm] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  });
  const dispatch = useDispatch<AppDispatch>();
  const notices: any = useSelector((state: RootState) => state.notice.post);

  const onSubmit = () => {
    if (form.title === '' || form.description === '') {
      alert('내용을 입력해주세요');
      return;
    }
    const { title, description } = form;
    dispatch(createNoticePost({ title, description, params: 'notices' }));
    setIsWrite(false);
  };

  useEffect(() => {
    dispatch(getNotices('notices'));
  }, [dispatch, isWrite]);

  return (
    <div className={cx(wholeStyle)}>
      <HeaderSearch isWrite={isWrite} setIsWrite={setIsWrite} />
      <section className={cx(sectionStyle)}>
        <SideBar />
        <article className={cx(container)}>
          {isWrite && (
            <>
              <ArticleTitle form={form} setForm={setForm} onSubmit={onSubmit} />
              <TextArea form={form} setForm={setForm} />
            </>
          )}
          <CommetContainer notices={notices} />
        </article>
      </section>
    </div>
  );
};
export default Notice;

const wholeStyle = css`
  margin: 0 auto;
  width: 1190px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 1128px;
`;
const container = css`
  width: 936px;
  height: fit-content;
  max-height: 696px;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  border-radius: 6px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-left: 24px;
  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
    position: relative;
    left: 300px;
    top: 50px;
    height: 183px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 68, 94, 1);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(231, 231, 232, 1);
    border-radius: 10px;
  }
`;
const sectionStyle = css`
  display: flex;
  margin-top: 24px;
`;
