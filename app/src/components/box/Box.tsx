import { css, cx } from '@emotion/css';
import { shadow, radius, color } from '../../styles';

interface Props {
  [key: string]: any;
}

interface StyleObj {
  [index: string]: string;
}

function Box({ colorType, radiusType, shadowType, children }: Props) {
  const commonStyle = css`
    width: fit-content;
    height: fit-content;
  `;

  const colorStyle: StyleObj = {
    white: css`
      background-color: white;
    `,
    light: css`
      background-color: ${color.light1};
    `,
  };

  const radiusStyle: StyleObj = {
    none: css`
      border-radius: 0px;
    `,
    normal: css`
      ${radius[6]}
    `,
    big: css`
      ${radius[24]}
    `,
  };

  const shadowStyle: StyleObj = {
    none: css`
      box-shadow: none;
    `,
    normal: css`
      ${shadow.normal}
    `,
  };

  const show = () => {
    return (
      <div
        className={cx(
          colorStyle[colorType],
          radiusStyle[radiusType],
          shadowStyle[shadowType],
          commonStyle
        )}>
        {children}
      </div>
    );
  };

  return show();
}

export default Box;
