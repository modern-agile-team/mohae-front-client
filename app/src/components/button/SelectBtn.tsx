import { css, cx } from '@emotion/css';
import { color, shadow, font, btnStyle, radius } from '../../styles';
import MarkBox from '../markbox/MarkBox';
import { Props } from './index';

function SelectBtn(props: Props) {
  const { large, medium, small, disable, children, onClick } = props;

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
    input[type='checkbox'] {
      cursor: pointer;
      -webkit-appearance: none;
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
      input[type='checkbox'] {
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
      input[type='checkbox'] {
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
      input[type='checkbox'] {
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

  return (
    <label className={cx(commonStyle, attrProps)}>
      <input type='checkbox' onClick={onClick} />
      <span>{children}</span>
    </label>
  );
}

export default SelectBtn;
