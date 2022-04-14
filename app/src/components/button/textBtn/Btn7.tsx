import { css, cx } from '@emotion/css';
import { color, btnStyle, font, shadow, Props } from '../index';

function Btn7(props: Props) {
  const commonStyle = css`
    ${btnStyle.square}
    width: 170px;
    height: 43px;
    background-color: ${color.main};
    color: white;
    ${font.size[14]}
    ${font.weight.regular}
    ${shadow.normal}

    &:active {
      background-color: ${color.darker};
    }
  `;

  const disable = css`
    cursor: unset;
    background-color: ${color.light4};
    &:active {
      background-color: ${color.light4};
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

export default Btn7;
