import { css, cx, colors, btnStyle, font, shadows, propsType } from '../index';

function Btn11(props: propsType) {
  const commonSt = css`
    ${btnStyle.square}
    height: 40px;
    background-color: ${colors.main};
    color: ${colors.white};
    ${font.size[12]}
    ${font.weight.bold}
    ${shadows.normal}

    &:active {
      background-color: ${colors.darker};
    }
  `;

  interface type {
    [attr: string]: string;
  }

  const attrProps: type = {
    big: css`
      width: 300px;
    `,
    small: css`
      width: 86px;
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

export default Btn11;
