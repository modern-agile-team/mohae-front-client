import { css, cx } from '@emotion/css';
import { color, btnStyle, shadow, Props } from '../index';

function Alram(props: Props) {
  const commonStyle = css`
    ${btnStyle.circle}
    width: 50px;
    height: 50px;
    padding: 10px;
    ${shadow.normal}
    background-color: white;
    position: fixed;
    bottom: 187px;
    right: 83px;
  `;

  const alram = css`
    ${btnStyle.circle}
    width: 25px;
    height: 25px;
    background-color: ${color.main};
    color: white;
    position: absolute;
    bottom: 33px;
    left: 33px;
  `;

  const able = css`
    &:hover {
      background-color: ${color.subtle};
    }
    &:active {
      background-color: ${color.lighter};
    }
  `;

  const disable = css`
    background-color: ${color.light4};
    &:hover {
      background-color: ${color.light4};
    }
    &:active {
      background-color: ${color.light4};
    }
  `;

  const show = () =>
    props.disable ? (
      <button className={cx(commonStyle, able, disable)}>
        {props.children}
      </button>
    ) : (
      <button className={cx(commonStyle, able)}>
        {props.children}
        <div className={cx(alram)}>{props.msg}</div>
      </button>
    );

  return show();
}

export default Alram;
