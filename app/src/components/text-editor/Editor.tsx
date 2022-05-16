import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { css, cx } from '@emotion/css';

interface Props {
  [key: string]: any;
}

export default function TextEditor(props: Props) {
  const style = css`
    .wrapper-class {
      width: 50%;
      margin: 0 auto;
      margin-bottom: 4rem;
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
    }

    .rdw-dropdown-carettoopen {
      display: none !important;
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
    // console.log('e :>> ', e);
    setText(editorToHtml(editorState));
    // console.log('  ', editorToHtml(editorState));
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
              'inline',
              // 'blockType',
              // 'fontSize',
              // 'fontFamily',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              // 'emoji',
              // 'image',
              // 'textIndent',
            ],
            inline: {
              options: [
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'monospace',
                // 'superscript',
              ],
              inDropdown: true,
              bold: {
                icon: '/img/hello.png',
              },
              italic: {
                visible: false,
                // icon: 'xxx.png'
              },
              underline: {
                visible: false,
                // icon: 'xxx.png'
              },
              strikeThrough: {
                visible: false,
                // icon: 'xxx.png'
              },
              monospace: {
                visible: false,
                // icon: 'xxx.png'
              },
            },
            fontSize: {
              // icon: 'xxx.png'
            },
            list: {
              inDropdown: true,
              unordered: {
                // icon: 'xxx.png'
              },
              ordered: {
                // icon: 'xxx.png'
              },
              indent: {
                // icon: 'xxx.png'
              },
              outdent: {
                // icon: 'xxx.png'
              },
            },
            textAlign: {
              inDropdown: true,
              left: {
                // icon: 'xxx.png'
              },
              center: {
                // icon: 'xxx.png'
              },
              right: {
                // icon: 'xxx.png'
              },
              justify: {
                // icon: 'xxx.png'
              },
            },
            colorPicker: {
              // icon: 'xxx.png'
            },
            link: {
              inDropdown: true,
              addLink: {
                // icon: 'xxx.png'
              },
              removeLink: {
                // icon: 'xxx.png'
              },
            },
          }}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
    </>
  );
}
