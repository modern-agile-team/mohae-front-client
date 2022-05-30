import { css, cx } from '@emotion/css';
import * as palette from '../../styles';

interface Props {
  [key: string]: any;
}

interface Attrs {
  [attr: string]: string | [string];
}

function Box(props: Props) {
  const { light, noRadius, bigRadius, noShadow, size, children, className } =
    props;
  const commonStyle = css`
    width: ${size[0]}px;
    height: ${size[1]}px;
    background-color: white;
    ${palette.radius[6]}
    ${palette.shadow.normal}
  `;

  const attrs: Attrs = {
    light: css`
      background-color: ${palette.color.light1};
    `,
    noRadius: css`
      border-radius: 0px;
    `,
    bigRadius: css`
      ${palette.radius[24]}
    `,
    noShadow: css`
      box-shadow: none;
    `,
  };

  const finalStyle = Object.keys(props).map((attr) => attrs[attr]);

  return (
    <div className={cx(commonStyle, ...finalStyle, className)}>{children}</div>
  );
}

export default Box;
