import { css, cx } from '@emotion/css';
import { color, shadow, font, btnStyle, radius } from '../../../styles';
import MarkBox from '../../markbox/MarkBox';
import { Props } from '../index';

function FilterBtn(props: Props) {
  const { big, small, disable, children, onClick } = props;

  const commonStyle = css`
    ${btnStyle.square}
    background-color: white;
    ${shadow.button}
    position: relative;
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
      height: 44px;
      ${radius[6]}
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
    big: css`
      input[type='checkbox'] {
        width: 138px;
      }
      span {
        width: 90px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `,
    small: css`
      input[type='checkbox'] {
        width: 87px;
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

  const show = () => (
    <label className={cx(commonStyle, attrProps)}>
      <input type='checkbox' onClick={onClick} />
      <span>{children}</span>
    </label>
  );

  return show();
}

export default FilterBtn;
