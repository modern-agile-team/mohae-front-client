import { css, cx, colors, btnStyle, font, shadows, propsType } from '../index';

function Btn8(props: propsType) {
  const commonSt = css`
    ${btnStyle.square}
    height: 52px;
    background-color: ${colors.main};
    color: ${colors.white};
    ${font.size[14]}
    ${font.weight.regular}
    ${shadows.normal}

    &:active {
      background-color: ${colors.darker};
    }
  `;

  interface sizeType {
    [attr: string]: string;
  }

  const attrProps: sizeType = {
    big: css`
      width: 534px;
    `,
    small: css`
      width: 480px;
    `,
    disable: css`
      cursor: unset;
      background-color: ${colors.light4};
      &:active {
        background-color: ${colors.light4};
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

export default Btn8;
