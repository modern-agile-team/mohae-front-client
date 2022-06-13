import React, { useRef, useCallback } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius } from '../../styles';
import { Props } from '../../components/button';

function Input(props: Props) {
  const { small, big } = props;
  const textRef = useRef<HTMLTextAreaElement>(null);

  //***************************************** */
  const resizingHeight = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);
  //***************************************** */

  const common = css`
    &:focus-within input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      visibility: hidden;
    }
  `;

  interface attrStyles {
    [key: string]: string;
  }
  const style: attrStyles = {
    small: css`
      .title {
        ${common}
        padding: 18px 32px;
        border-radius: 6px 0px 0px 0px;

        input::-webkit-input-placeholder {
          background: no-repeat 80.5% 25% / contain url('/img/essential.png');
          background-size: 6px;
        }

        input {
          width: 304px;
          height: 24px;
        }
      }

      .price {
        ${common}
        padding: 18px 64px;
        input[type='number'] {
          width: 174px;
          height: 24px;
          ::-webkit-outer-spin-button,
          ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }

        input::-webkit-input-placeholder {
          background: no-repeat 77% 25% / contain url('/img/essential.png');
          background-size: 6px;
        }

        ::after {
          content: '원';
          margin: 2px 0px 0px 18px;
        }
      }
      .title,
      .price {
        width: 368px;
        height: 62px;
        border-bottom: 2px solid ${color.light4};
      }
    `,
    //***************************************** */
    big: css`
      .big:focus-within textarea::-webkit-input-placeholder {
        visibility: hidden;
      }
      margin: 24px 12px 24px 24px;
      padding-right: 8px;
      height: 218px;
      overflow: auto;
      border-right: 4px solid transparent;
      ::-webkit-scrollbar {
        width: 4px;
        height: 10px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${color.main};
        ${radius[6]}
      }
      ::-webkit-scrollbar-track {
        background-color: ${color.light4};
        ${radius[6]}
      }

      textarea {
        width: 688px;
        height: 210px;
        resize: none;
        overflow: hidden;
        padding-right: 8px;
      }
    `,
    //***************************************** */
  };

  const attrStyle = Object.keys(props).map(el => style[el]);

  const show = () => {
    return small ? (
      <>
        <form className='title'>
          <input type='text' placeholder={`제목을 입력해주세요. (3~15자)`} />
        </form>
        <form className='price'>
          <input type='number' placeholder={'0 ~ 1,000,000'} />
        </form>
      </>
    ) : (
      //***************************************** */
      <form className='big'>
        <textarea
          ref={textRef}
          onInput={resizingHeight}
          placeholder={'한 줄 요약을 입력해주세요. (최대 100자)'}
        />
      </form>
      //***************************************** */
    );
  };

  return <div className={cx(attrStyle)}>{show()}</div>;
}

export default Input;
