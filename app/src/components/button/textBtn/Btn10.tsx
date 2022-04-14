import { deflate } from 'zlib';
import { css, cx, colors, btnStyle, font, shadows, propsType } from '../index';

function Btn10(props: propsType) {
  const commonSt = css`
    ${btnStyle.square}
    width: 100px;
    height: 36px;
    background-color: ${colors.white};
    color: ${colors.main};
    ${font.size[14]}
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
    color: ${colors.light4};
    cursor: unset;
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

export default Btn10;
