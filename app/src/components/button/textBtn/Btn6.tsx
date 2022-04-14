import { css, cx } from '@emotion/css';
import { color, btnStyle, font, shadow, Props } from '../index';

function Btn6(props: Props) {
  const commonStyle = css`
    ${btnStyle.square}
    width: 100px;
    height: 43px;
    ${font.size[14]}
    ${font.weight.regular}
    ${shadow.normal}
  `;

  interface difStyle {
    [style: string]: {
      [color: string]: string;
    };
  }

  const difStyle: difStyle = {
    main: {
      able: css`
        background-color: ${color.main};
        color: white;
        &:active {
          background-color: ${color.darker};
        }
      `,
      disable: css`
        cursor: unset;
        background-color: ${color.light4};
        color: white;
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
        color: ${color.main};
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
        color: ${color.light4};
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
      ? difStyle[color].able
      : difStyle[color].disable;

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

export default Btn6;
