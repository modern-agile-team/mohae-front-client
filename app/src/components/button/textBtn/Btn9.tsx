import { css, cx } from '@emotion/css';
import { color, shadow, font } from '../../../styles';
import { btnStyle, Props } from '../index';

function Btn9(props: Props) {
  const { disable, children, onClick } = props;
  const commonStyle = css`
    ${btnStyle.square}
    width: 80px;
    height: 28px;
    background-color: white;
    color: ${color.main};
    ${font.size[12]}
    ${font.weight.regular}
    ${shadow.normal}

    &:hover {
      background-color: ${color.subtle};
    }
    &:active {
      background-color: ${color.lighter};
    }
  `;

  const disableState = css`
    cursor: unset;
    color: ${color.light4};
    &:hover {
      background-color: white;
    }
    &:active {
      background-color: white;
    }
  `;

  const show = () =>
    disable ? (
      <button onClick={onClick} className={cx(commonStyle, disableState)}>
        {children}
      </button>
    ) : (
      <button onClick={onClick} className={cx(commonStyle)}>
        {children}
      </button>
    );

  return show();
}

export default Btn9;
