import { css, cx, colors, btnStyle, shadows, propsType } from '../index';

function Btn1(props: propsType) {
  const commonSt = css`
    ${btnStyle.circle}
    width: 50px;
    height: 50px;
    padding: 10px;
    ${shadows.normal}
    background-color: ${colors.white};
    position: fixed;
    bottom: 187px;
    right: 83px;
  `;

  const alram = css`
    ${btnStyle.circle}
    width: 25px;
    height: 25px;
    background-color: ${colors.main};
    color: ${colors.white};
    position: absolute;
    bottom: 33px;
    left: 33px;
  `;

  const event = css`
    &:hover {
      background-color: ${colors.subtle};
    }
    &:active {
      background-color: ${colors.lighter};
    }
  `;

  const disable = css`
    background-color: ${colors.light4};
    &:hover {
      background-color: ${colors.light4};
    }
    &:active {
      background-color: ${colors.light4};
    }
  `;

  const show = () => {
    return props.disable ? (
      <button className={cx(commonSt, event, disable)}>{props.children}</button>
    ) : (
      <button className={cx(commonSt, event)}>
        {props.children}
        <div className={cx(alram)}>{props.msg}</div>
      </button>
    );
  };

  return <>{show()}</>;
}

export default Btn1;
