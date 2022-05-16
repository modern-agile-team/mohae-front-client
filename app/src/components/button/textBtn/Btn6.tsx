import { css, cx } from '@emotion/css';
import { color, shadow, font, btnStyle } from '../../../styles';
import { Props } from '../index';

function Btn6(props: Props) {
  const { main, white, write, disable, children, onClick } = props;
  const commonStyle = css`
    ${btnStyle.square}
    width: 100px;
    height: 43px;
    ${font.size[14]}
    ${font.weight.regular}
    ${shadow.normal}
  `;

  interface Attrs {
    [style: string]: {
      [color: string]: string;
    };
  }

  const attrs: Attrs = {
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
    write: {
      able: css`
        background: no-repeat url('img/write.png');
        background-size: 15px;
        background-position: 74% 45%;
        background-color: ${color.main};
        padding-right: 20px;
        color: white;
        &:active {
          background-color: ${color.darker};
        }
      `,
      disable: css`
        cursor: unset;
        background: no-repeat url('img/write.png');
        background-size: 15px;
        background-position: 74% 45%;
        background-color: ${color.light4};
        padding-right: 20px;
        color: white;
        &:hover {
          background-color: ${color.light4};
        }
        &:active {
          background-color: ${color.light4};
        }
      `,
    },
  };

  const attrProps = (attr: string) =>
    disable === undefined ? attrs[attr].able : attrs[attr].disable;

  const show = () =>
    main ? (
      <button onClick={onClick} className={cx(commonStyle, attrProps('main'))}>
        {children}
      </button>
    ) : (
      <button className={cx(commonStyle, attrProps('white'))}>
        {children}
      </button>
    );

  return write ? (
    <button onClick={onClick} className={cx(commonStyle, attrProps('write'))}>
      {children}
    </button>
  ) : (
    show()
  );
}

export default Btn6;
