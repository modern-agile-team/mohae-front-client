import { css, cx, colors, btnStyle, font, shadows, propsType } from '../index';

function Btn12(props: propsType) {
  const commonSt = css`
    ${btnStyle.square}
    height: 44px;
    background-color: ${colors.white};
    color: ${colors.dark1};
    ${font.size[14]}
    ${font.weight.regular}
    ${shadows.button}
    &:hover {
      background-color: ${colors.subtle};
    }
    &:active {
      background-color: ${colors.main};
      color: ${colors.white};
    }
  `;

  interface sizeType {
    [attr: string]: string;
  }

  const attrProps: sizeType = {
    big: css`
      width: 138px;
    `,
    small: css`
      width: 87px;
    `,
    disable: css`
      cursor: unset;
      color: ${colors.light4};
      background-color: ${colors.white};
      &:hover {
        background-color: ${colors.white};
      }
      &:active {
        background-color: ${colors.white};
        color: ${colors.light4};
      }
    `,
  };

  const styles = [...Object.keys(props).map(attr => attrProps[attr])];

  const show = () => {
    return (
      <>
        <button className={cx(commonSt, styles)}>{props.children}</button>
      </>
    );
  };

  return <>{show()}</>;
}

export default Btn12;
