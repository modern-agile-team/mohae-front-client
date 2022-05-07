import { css, cx } from '@emotion/css';
import * as palette from '../../styles';

interface Props {
  [key: string]: any;
}

interface StyleObj {
  [index: string]: string;
}

function Box({ color, radius, shadow, children }: Props) {
  const commonStyle = css`
    width: fit-content;
    height: fit-content;
  `;

  const colorStyle: StyleObj = {
    white: css`
      background-color: white;
    `,
    light: css`
      background-color: ${palette.color.light1};
    `,
  };

  const radiusStyle: StyleObj = {
    none: css`
      border-radius: 0px;
    `,
    normal: css`
      ${palette.radius[6]}
    `,
    big: css`
      ${palette.radius[24]}
    `,
  };

  const shadowStyle: StyleObj = {
    none: css`
      box-shadow: none;
    `,
    normal: css`
      ${palette.shadow.normal}
    `,
  };

  const show = () => {
    return (
      <div
        className={cx(
          colorStyle[color],
          radiusStyle[radius],
          shadowStyle[shadow],
          commonStyle
        )}>
        {children}
      </div>
    );
  };

  return show();
}

export default Box;
