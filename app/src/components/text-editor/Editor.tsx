/** @format */

import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { color } from '../../styles';
import { css, cx } from '@emotion/css';

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

  const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
    ),
    [text, setText] = useState('');

  const editorToHtml = (editorState: any) => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  const onEditorStateChange = (e: any) => {
    setEditorState(e);
    setText(editorToHtml(editorState));
  };

  console.log('text :>> ', text);

  return (
    <>
      <div className={cx(style)}>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          editorClassName="editor"
          toolbar={{
            options: [
              'blockType',
              'fontSize',
              'inline',
              // 'fontFamily',
              // 'list',
              'textAlign',
              // 'colorPicker',
              // 'link',
              'emoji',
            ],
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
      {/* <div dangerouslySetInnerHTML={{ __html: text }}></div> */}
    </>
  );
}
