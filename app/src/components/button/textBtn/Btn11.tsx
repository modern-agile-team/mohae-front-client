import { css, cx } from '@emotion/css';
import { color, shadow, font } from '../../../styles';
import { btnStyle, Props } from '../index';

function Btn11(props: Props) {
  const { big, small, disable, children, onClick } = props;
  const commonStyle = css`
    ${btnStyle.square}
    height: 40px;
    background-color: ${color.main};
    color: white;
    ${font.size[12]}
    ${font.weight.bold}
    ${shadow.normal}

    &:active {
      background-color: ${color.darker};
    }
  `;

  interface Attrs {
    [attr: string]: string;
  }

  const attrs: Attrs = {
    big: css`
      width: 300px;
    `,
    small: css`
      width: 86px;
    `,
    disable: css`
      cursor: unset;
      background-color: ${color.light4};
      &:active {
        background-color: ${color.light4};
      }
    `,
  };

  const attrProps = Object.keys(props).map(attr => attrs[attr]);

  const show = () => (
    <button onClick={onClick} className={cx(commonStyle, attrProps)}>
      {children}
    </button>
  );

  return show();
}

export default Btn11;
