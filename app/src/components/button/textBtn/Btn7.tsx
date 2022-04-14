import { css, cx, colors, btnStyle, font, shadows, propsType } from '../index';

function Btn7(props: propsType) {
  const commonSt = css`
    ${btnStyle.square}
    width: 170px;
    height: 43px;
    background-color: ${colors.main};
    color: ${colors.white};
    ${font.size[14]}
    ${font.weight.regular}
    ${shadows.normal}

    &:active {
      background-color: ${colors.darker};
    }
  `;

  const disable = css`
    cursor: unset;
    background-color: ${colors.light4};
    &:active {
      background-color: ${colors.light4};
    }
  `;

  const show = () => {
    return props.disable ? (
      <button className={cx(commonSt, disable)}>{props.children}</button>
    ) : (
      <button className={cx(commonSt)}>{props.children}</button>
    );
  };

  return <>{show()}</>;
}

export default Btn7;
