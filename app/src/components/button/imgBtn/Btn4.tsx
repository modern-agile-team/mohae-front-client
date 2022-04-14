import { css, cx, colors, btnStyle, shadows, font, propsType } from '../index';

function Btn4(props: propsType) {
  const commonSt = css`
    ${btnStyle.square}
    ${shadows.normal}
  `;

  const size = () => {
    return props.big
      ? [
          css`
            ${commonSt}
            width: 60px;
            height: 60px;
          `,
        ]
      : [
          css`
            ${commonSt}
            width: 43px;
            height: 43px;
          `,
        ];
  };

  interface btnStateType {
    [color: string]: {
      [state: string]: string;
    };
  }

  const btnState: btnStateType = {
    main: {
      able: css`
        background-color: ${colors.main};
        &:active {
          background-color: ${colors.darker};
        }
      `,
      disable: css`
        cursor: unset;
        background-color: ${colors.light4};
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
        &:hover {
          background-color: ${colors.white};
        }
        &:active {
          background-color: ${colors.white};
        }
      `,
    },
  };

  const attrProps = (color: string) => {
    return props.disable === undefined
      ? [...[btnState[color].able], size()]
      : [...[btnState[color].disable], size()];
  };

  const show = () => {
    return props.main ? (
      <button className={cx(commonSt, attrProps('main'))}>
        {props.children}
      </button>
    ) : (
      <button className={cx(commonSt, attrProps('white'))}>
        {props.children}
      </button>
    );
  };

  return <>{show()}</>;
}

export default Btn4;
