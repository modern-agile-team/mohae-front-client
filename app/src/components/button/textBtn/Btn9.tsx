import { deflate } from 'zlib';
import { css, cx, colors, btnStyle, font, shadows, propsType } from '../index';

function Btn9(props: propsType) {
  const commonSt = css`
    ${btnStyle.square}
    width: 80px;
    height: 28px;
    background-color: ${colors.white};
    color: ${colors.main};
    ${font.size[12]}
    ${font.weight.regular}
    ${shadows.normal}

    &:hover {
      background-color: ${colors.subtle};
    }
    &:active {
      background-color: ${colors.lighter};
    }
  `;

  const disable = css`
    cursor: unset;
    color: ${colors.light4};
    &:hover {
      background-color: ${colors.white};
    }
    &:active {
      background-color: ${colors.white};
    }
  `;

  const show = () => {
    return (
      <>
        {props.disable ? (
          <button className={cx(commonSt, disable)}>{props.children}</button>
        ) : (
          <button className={cx(commonSt)}>{props.children}</button>
        )}
      </>
    );
  };

  return <>{show()}</>;
}

export default Btn9;
