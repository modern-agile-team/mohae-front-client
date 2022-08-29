import { css, cx } from '@emotion/css';
import { color } from '../../styles';

interface Props {
  [key: string]: boolean;
}

interface Check {
  [key: string]: string;
}

function FocusBar(props: Props) {
  const { thin, thick, dark, light, className } = props;

  const commonStyle = css`
    width: 100%;
    height: 3px;
    background-color: ${color.main};
  `;

  const weight = {
    thin: css`
      height: 1px;
    `,

    thick: css`
      height: 6px;
    `,
  };

  const backColor = {
    dark: css`
      background-color: ${color.dark4};
    `,
    light: css`
      background-color: ${color.light3};
    `,
  };

  const check: Check = {
    thin: weight.thin,
    thick: weight.thick,
    dark: backColor.dark,
    light: backColor.light,
  };

  const finalStyle = Object.keys(props).map((attr) => check[attr]);

  return <div className={cx(commonStyle, ...finalStyle, className)}></div>;
}

export default FocusBar;
