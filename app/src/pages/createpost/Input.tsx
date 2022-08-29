import React, { useRef, useCallback, useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { color, font, radius, shadow } from '../../styles';
import { Props } from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { setPrice, setSummary, setTitle } from '../../redux/createpost/reducer';

function Input(props: Props) {
  const { small, big } = props;
  const dispatch = useDispatch();
  const { title, price, summary } = useSelector(
    (state: RootState) => state.createPost.data,
  );

  useEffect(() => {
    if (
      price.toString().length > 8 ||
      Number(price.toString().replace(/,/g, '')) > 1000001
    ) {
      dispatch(setPrice('1,000,000'));
    }
    if (title.length > 15) {
      dispatch(setTitle(title.slice(0, 15)));
    }
    if (summary.length > 100) {
      dispatch(setSummary(summary.slice(0, 100)));
    }
  }, [price, title, summary]);

  const onChange = {
    title: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTitle(e.target.value));
    },
    price: (e: React.ChangeEvent<HTMLInputElement>) => {
      const toLocaleStringPrice = Number(
        e.target.value.replace(/\D/g, '').slice(0, 7),
      ).toLocaleString();
      dispatch(setPrice(toLocaleStringPrice));
    },
    summary: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setSummary(e.target.value));
    },
  };

  const textRef = useRef<HTMLTextAreaElement>(null);
  const resizingHeight = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);

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

        ::after {
          content: '원';
          color: ${color.dark1};
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
  };

  const attrStyle = Object.keys(props).map(el => style[el]);

  const show = () => {
    return small ? (
      <>
        <form className="title">
          <input
            value={title}
            type="text"
            placeholder={`제목을 입력해주세요. (3~15자)`}
            onChange={e => onChange.title(e)}
            minLength={3}
            maxLength={16}
          />
        </form>
        <form className="price">
          <input
            value={price === '0' ? '0' : price}
            type="text"
            placeholder={'0원 ~ 1,000,000원'}
            onChange={e => onChange.price(e)}
          />
        </form>
      </>
    ) : (
      <form className="big">
        <textarea
          value={summary}
          onChange={e => onChange.summary(e)}
          ref={textRef}
          onInput={resizingHeight}
          placeholder={'한 줄 요약을 입력해주세요. (최대 100자)'}
        />
      </form>
    );
  };

  return <div className={cx(attrStyle)}>{show()}</div>;
}

export default Input;
