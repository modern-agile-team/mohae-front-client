import { css, cx, colors, btnStyle, shadows, font, propsType } from '../index';

function Btn6(props: propsType) {
  const commonSt = css`
    ${btnStyle.square}
    width: 100px;
    height: 43px;
    ${font.size[14]}
    ${font.weight.regular}
    ${shadows.normal}
  `;

  interface difStType {
    [style: string]: {
      [color: string]: string;
    };
  }

  const difSt: difStType = {
    main: {
      able: css`
        background-color: ${colors.main};
        color: ${colors.white};
        &:active {
          background-color: ${colors.darker};
        }
      `,
      disable: css`
        cursor: unset;
        background-color: ${colors.light4};
        color: ${colors.white};
        &:hover {
          background-color: ${colors.light4};
        }
        &:active {
          background-color: ${colors.light4};
        }
      `,
    },
    white: {
      able: css`
        background-color: ${colors.white};
        color: ${colors.main};
        &:hover {
          background-color: ${colors.subtle};
        }
        &:active {
          background-color: ${colors.lighter};
        }
      `,
      disable: css`
        cursor: unset;
        background-color: ${colors.white};
        color: ${colors.light4};
        &:hover {
          background-color: ${colors.white};
        }
        &:active {
          background-color: ${colors.white};
        }
      `,
    },
  };

  function mapFunc(color: string) {
    return props.disable === undefined
      ? difSt[color].able
      : difSt[color].disable;
  }

  const show = () => {
    return props.main ? (
      <button className={cx(commonSt, mapFunc('main'))}>
        {props.children}
      </button>
    ) : (
      <button className={cx(commonSt, mapFunc('white'))}>
        {props.children}
      </button>
    );
  };

  return <>{show()}</>;
}

export default Btn6;
