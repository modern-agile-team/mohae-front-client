import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import { color, shadow, font, btnStyle, radius } from '../../styles';
import MarkBox from '../markbox/MarkBox';

interface Props {
  large?: boolean;
  medium?: boolean;
  small?: boolean;
  children: React.ReactNode;
  checked: boolean | undefined;
  setShow?: Dispatch<SetStateAction<boolean>>;
  onChange: () => void;
  type: string;
}

function SelectBtn(props: Props) {
  const { large, medium, small, children, checked, type, setShow, onChange } =
    props;

  const commonStyle = css`
    background-color: white;
    position: relative;
    cursor: pointer;

    &:hover {
      background-color: ${color.subtle};
    }
    span {
      color: ${color.dark1};
      ${font.size[14]}
      ${font.weight.regular}
      position: absolute;
    }
    input[type='checkbox'],
    input[type='radio'] {
      cursor: pointer;
      -webkit-appearance: none;
      transition: 0.2s all linear;

      :checked {
        background-color: ${color.main};
        + span {
          color: white;
        }
      }
    }
  `;

  interface Attrs {
    [attr: string]: string;
  }

  const attrs: Attrs = {
    large: css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 182px;
      height: 60px;
      input[type='checkbox'],
      input[type='radio'] {
        width: 182px;
        height: 60px;
      }
      span {
        width: 84px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `,

    medium: css`
      ${btnStyle.square}
      ${shadow.button}
      width: 138px;
      height: 44px;
      input[type='checkbox'],
      input[type='radio'] {
        width: 138px;
        height: 44px;
        ${radius[6]}
      }
      span {
        width: 90px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `,
    small: css`
      ${btnStyle.square}
      ${shadow.button}
      width: 87px;
      height: 44px;
      input[type='checkbox'],
      input[type='radio'] {
        width: 87px;
        height: 44px;
        ${radius[6]}
      }
    `,
    disable: css`
      cursor: unset;
      color: ${color.light4};
      background-color: white;
      &:hover {
        background-color: white;
      }
    `,
  };

  const attrProps = Object.keys(props).map(attr => attrs[attr]);

  const createInput = () => {
    return type === 'radio' || type === '정렬' ? (
      <input type='radio' name='radio' checked={checked} onChange={onChange} />
    ) : (
      <input
        type='checkbox'
        name={`${children}`}
        checked={checked}
        onChange={onChange}
      />
    );
  };

  return (
    <label className={cx(commonStyle, attrProps)}>
      {createInput()}
      <span>{children}</span>
    </label>
  );
}

export default SelectBtn;
