import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import SideBar from '../notice/NoticeWriteSidebar';
import ArticleTitle from '../notice/NoticeWriteAriticleTitle';
import HeaderSearch from '../notice/NoticeWriteSearchHeader';
import CommetContainer from '../notice/NoticeCommentWrapper';
import { useCallback, useEffect, useState } from 'react';
import {
  createNoticePost,
  getNotices,
  searchNotices,
} from '../../../redux/notice/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/root';
import { RootState } from '../../../redux/root';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { deleteNoticePost } from '../../../apis/notice';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const Notice = () => {
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const [form, setForm] = useState<{
    title: string;
    description: string;
    postNo: number;
    editForm: boolean;
  }>({
    title: '',
    description: '',
    postNo: 0,
    editForm: false,
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const notices: any = useSelector((state: RootState) => state.notice.post);
  const navigate = useNavigate();
  const searchItem = searchParams.get('title');

  const onSubmit = useCallback(() => {
    if (form.title === '' || form.description === '') {
      alert('내용을 입력해주세요');
      return;
    }
    const { title, description, editForm, postNo } = form;
    dispatch(
      createNoticePost({ title, description, params: name!, editForm, postNo }),
    ).then(res => {
      if (res.payload.success) setIsWrite(false);
    });
  }, [form]);

  const onEdit = (no: number, title: string, description: string) => {
    setForm({
      ...form,
      title,
      description,
      editForm: true,
      postNo: no,
    });
    const blocksFromHtml = htmlToDraft(description);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap,
    );
    const newState = EditorState.createWithContent(contentState);
    setEditorState(newState);
    setIsWrite(true);
  };

  const onDelete = async (no: number) => {
    const data = { params: name, postNo: no };
    await deleteNoticePost(data).then(res => {
      if (res.data.success) dispatch(getNotices(name!));
    });
  };

  const onSearch = (searchBy: string) => {
    navigate({
      pathname: `/support/${name}`,
      search: `?title=${searchBy}`,
    });
  };
  const editorToHtml = (editorState: any) => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  const onEditorChange = (editorState: EditorState) => {
    const value = editorToHtml(editorState);
    setEditorState(editorState);
    setForm({
      ...form,
      description: value,
    });
  };

  useEffect(() => {
    if (searchItem) {
      dispatch(
        searchNotices({
          params: name,
          search: searchItem,
        }),
      );
    } else {
      if (name) {
        dispatch(getNotices(name));
      }
    }
  }, [dispatch, isWrite, name, searchItem]);

  return (
    <div className={cx(wholeStyle)}>
      <HeaderSearch
        isWrite={isWrite}
        setIsWrite={setIsWrite}
        form={form}
        setForm={setForm}
        param={name}
        onSearch={onSearch}
        setEditorState={setEditorState}
      />
      <section className={cx(sectionStyle)}>
        <SideBar name={name!} />
        <article className={cx(container)}>
          {isWrite && (
            <>
              <ArticleTitle form={form} setForm={setForm} onSubmit={onSubmit} />
              <DraftEditor>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={onEditorChange}
                  editorClassName="editor"
                  localization={{
                    locale: 'ko',
                  }}
                  placeholder="본문 내용을 작성해주세요."
                />
              </DraftEditor>
            </>
          )}
          <CommetContainer
            notices={notices}
            onEdit={onEdit}
            onDelete={onDelete}
          />
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
  min-height: 80vh;
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

const DraftEditor = styled.div`
  padding: 20px;
  box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);
  .rdw-editor-wrapper {
    overflow-y: auto;
    height: 100px;
  }
  .rdw-editor-toolbar {
    display: none;
  }
  .rdw-editor-main {
    font-weight: 400;
    font-size: 14px;
  }
`;
