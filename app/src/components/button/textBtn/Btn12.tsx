import { css, cx } from '@emotion/css';
import { color, btnStyle, font, shadow, Props } from '../index';

function Btn12(props: Props) {
  const { children } = props;

  const commonStyle = css`
    ${btnStyle.square}
    height: 44px;
    background-color: white;
    color: ${color.dark1};
    font-size: 14px; /* font.size[14] */
    ${font.weight.regular}
    ${shadow.button}
    &:hover {
      background-color: ${color.subtle};
    }
    &:active {
      background-color: ${color.main};
      color: white;
    }
  `;

  interface Attrs {
    [attr: string]: string;
  }

  const attrs: Attrs = {
    big: css`
      width: 138px;
      display: flex;
      justify-content: space-between;
      padding: 10px 24px;
    `,
    small: css`
      width: 87px;
    `,
    disable: css`
      cursor: unset;
      color: ${color.light4};
      background-color: white;

      &:hover {
        background-color: white;
      }
      &:active {
        background-color: white;
        color: ${color.light4};
      }
    `,
  };

  const attrProps = [...Object.keys(props).map(attr => attrs[attr])];

  const show = () => (
    <button className={cx(commonStyle, attrProps)}>{children}</button>
  );

  return show();
}

export default Btn12;
