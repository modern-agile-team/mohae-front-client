import { css, cx } from '@emotion/css';
import { color, btnStyle, font, shadow, Props } from '../index';

function Btn10(props: Props) {
  const commonStyle = css`
    ${btnStyle.square}
    width: 100px;
    height: 36px;
    background-color: white;
    color: ${color.main};
    ${font.size[14]}
    ${font.weight.regular}
    ${shadow.normal}

    &:hover {
      background-color: ${color.subtle};
    }
    &:active {
      background-color: ${color.lighter};
    }
  `;

  const disable = css`
    color: ${color.light4};
    cursor: unset;
    &:hover {
      background-color: white;
    }
    &:active {
      background-color: white;
    }
  `;

  const show = () =>
    props.disable ? (
      <button className={cx(commonStyle, disable)}>{props.children}</button>
    ) : (
      <button className={cx(commonStyle)}>{props.children}</button>
    );

  return show();
}

export default Btn10;
