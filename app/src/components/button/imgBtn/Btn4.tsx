import { css, cx } from '@emotion/css';
import { color, btnStyle, shadow, Props } from '../index';

function Btn4(props: Props) {
  const commonStyle = css`
    ${btnStyle.square}
    ${shadow.normal}
  `;

  const size = () =>
    props.big
      ? [
          css`
            ${commonStyle}
            width: 60px;
            height: 60px;
          `,
        ]
      : [
          css`
            ${commonStyle}
            width: 43px;
            height: 43px;
          `,
        ];

  interface BtnState {
    [color: string]: {
      [state: string]: string;
    };
  }

  const btnState: BtnState = {
    main: {
      able: css`
        background-color: ${color.main};
        &:active {
          background-color: ${color.darker};
        }
      `,
      disable: css`
        cursor: unset;
        background-color: ${color.light4};
        &:hover {
          background-color: ${color.light4};
        }
        &:active {
          background-color: ${color.light4};
        }
      `,
    },
    white: {
      able: css`
        background-color: white;
        &:hover {
          background-color: ${color.subtle};
        }
        &:active {
          background-color: ${color.lighter};
        }
      `,
      disable: css`
        cursor: unset;
        background-color: white;
        &:hover {
          background-color: white;
        }
        &:active {
          background-color: white;
        }
      `,
    },
  };

  const attrProps = (color: string) =>
    props.disable === undefined
      ? [...[btnState[color].able], size()]
      : [...[btnState[color].disable], size()];

  const show = () =>
    props.main ? (
      <button className={cx(commonStyle, attrProps('main'))}>
        {props.children}
      </button>
    ) : (
      <button className={cx(commonStyle, attrProps('white'))}>
        {props.children}
      </button>
    );

  return show();
}

export default Btn4;
