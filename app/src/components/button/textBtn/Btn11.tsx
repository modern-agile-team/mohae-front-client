import { css, cx } from '@emotion/css';
import { color, btnStyle, font, shadow, Props } from '../index';

function Btn11(props: Props) {
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

  interface DifStyles {
    [attr: string]: string;
  }

  const difStyles: DifStyles = {
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

  const attrProps = [...Object.keys(props).map(attr => difStyles[attr])];

  const show = () => (
    <button className={cx(commonStyle, attrProps)}>{props.children}</button>
  );

  return show();
}

export default Btn11;