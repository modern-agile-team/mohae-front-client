/** @format */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { color } from '../../styles';
import { css, cx } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { setDescription } from '../../redux/createpost/reducer';
import { RootState } from '../../redux/root';

interface Props {
  [key: string]: any;
}

export default function TextEditor({ size }: Props) {
  const style = css`
    .wrapper-class {
      width: 50%;
      margin: 0 auto;
      margin-bottom: 4rem;
    }
    .rdw-editor-toolbar {
      border: none;
      background-color: ${color.light2};
      margin: 0;
    }
    .editor {
      height: 500px !important;
      border: 1px solid #f1f1f1 !important;
      padding: 5px !important;
      border-radius: 2px !important;
    }

    .rdw-dropdown-wrapper,
    .rdw-inline-dropdown,
    .rdw-option-wrapper {
      border: none !important;
      background-color: #0000;
    }

    .rdw-fontsize-wrapper {
      width: 60px;
      & > * > * > * {
        right: 5px !important;
      }
      position: relative;
      :after {
        content: '';
        width: 1px;
        height: 21px;
        position: absolute;
        top: 5px;
        right: -1px;
        background-color: ${color.dark2};
      }
      .rdw-dropdown-wrapper {
        width: 100%;
      }
    }

    .rdw-inline-wrapper {
      margin-right: 4px;
      position: relative;
      :after {
        content: '';
        width: 1px;
        height: 21px;
        position: absolute;
        top: 5px;
        right: -3px;
        background-color: ${color.dark2};
      }
    }

    .rdw-dropdown-carettoopen,
    .rdw-dropdown-carettoclose {
      width: 21px;
      height: 21px;
      margin-top: -5px;
      border: none !important;
      background: url('/img/text-editor-arrow.png') no-repeat center/contain;
    }

    .editor,
    .rdw-editor-main {
      border: none !important;
      padding: 16px !important;
    }

    .editor,
    .rdw-editor-main,
    .notranslate {
      height: ${`${size}px`} !important;

      .public-DraftEditor-content {
        height: ${`${size - 30}px`} !important;
      }
    }

    .public-DraftStyleDefault-block {
      margin: 0;
      line-height: 23.8px;
    }

    img {
      width: 18px;
      height: 18px;
    }
  `;
  //********************************* */
  // const [editorState, setEditorState] = useState<EditorState>(() =>
  //     EditorState.createEmpty(),
  //   ),
  //   [text, setText] = useState('');
  // const editorToHtml = (editorState: any) => {
  //   return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  // };

  // const onEditorStateChange = (e: any) => {
  //   setEditorState(() => e);
  //   setText(editorToHtml(editorState));
  // };

  // useEffect(() => {
  //   console.log('text :>> ', text);
  // }, [editorState]);
  //******************************** */
  const dispatch = useDispatch();
  const description = useSelector(
    (state: RootState) => state.createPost.data.description,
  );
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const rendered = useRef(false);

  // 리덕스 스토어 연결
  const onChangeField = useCallback(
    payload => dispatch(setDescription(payload)),
    [dispatch],
  );

  // HTML 변환 공통 함수
  const editorToHtml = (editorState: any) => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
    // 리덕스 changeField
    onChangeField({
      key: 'content',
      value: editorToHtml(editorState),
    });
  };

  // useEffect(() => {
  //   if (rendered.current) return;
  //   rendered.current = true;
  //   const blocksFromHtml = htmlToDraft(description);
  //   if (blocksFromHtml) {
  //     const { contentBlocks, entityMap } = blocksFromHtml;
  //     const contentState = ContentState.createFromBlockArray(
  //       contentBlocks,
  //       entityMap,
  //     );
  //     const editorState = EditorState.createWithContent(contentState);
  //     setEditorState(editorState);
  //   }
  // }, [description]);

  return (
    <>
      <div className={cx(style)}>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          editorClassName="editor"
          toolbar={{
            options: ['blockType', 'fontSize', 'inline', 'textAlign', 'emoji'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
              inDropdown: false,
              bold: {
                icon: '/img/text-editor-1.png',
              },
              italic: {
                visible: false,
                icon: '/img/text-editor-2.png',
              },
              underline: {
                visible: false,
                icon: '/img/text-editor-3.png',
              },
              strikethrough: {
                visible: false,
                icon: '/img/text-editor-4.png',
              },
            },
            textAlign: {
              inDropdown: false,
              left: {
                icon: '/img/text-editor-5.png',
              },
              center: {
                icon: '/img/text-editor-6.png',
              },
              right: {
                icon: '/img/text-editor-7.png',
              },
              justify: {
                icon: '/img/text-editor-8.png',
              },
            },
            emoji: { icon: '/img/text-editor-9.png' },
          }}
        />
      </div>
    </>
  );
}
