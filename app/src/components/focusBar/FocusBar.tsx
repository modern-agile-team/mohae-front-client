import { css, cx } from '@emotion/css';
import { color } from '../../styles';

interface Props {
  [key: string]: boolean;
}

interface Check {
  [key: string]: string;
}

function FocusBar(props: Props) {
  const { thin, thick, dark4, light3, className } = props;

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
    dark4: css`
      background-color: ${color.dark4};
    `,
    light3: css`
      background-color: ${color.light3};
    `,
  };

  const check: Check = {
    thin: weight.thin,
    thick: weight.thick,
    dark4: backColor.dark4,
    light3: backColor.light3,
  };

  const finalStyle = Object.keys(props).map((attr) => check[attr]);

  const result = (
    <div className={cx(commonStyle, ...finalStyle, className)}></div>
  );
  return result;
}

export default FocusBar;
