import { css, cx } from '@emotion/css';
import { color } from '../../styles';

interface Props {
  [key: string]: boolean;
}

interface Check {
  [key: string]: string;
}

function FocusBar(props: Props) {
  const commonStyle = css`
    width: 100%;
  `;

  const weight = {
    thiner: css`
      ${commonStyle}
      height: 1px;
    `,
    thin: css`
      ${commonStyle}
      height: 2px;
    `,
    medium: css`
      ${commonStyle}
      height: 3px;
      margin-top: 8px;
    `,
    thick: css`
      ${commonStyle}
      height: 6px;
    `,
  };

  const backColor = {
    main: css`
      background-color: ${color.main};
    `,
    dark4: css`
      background-color: ${color.dark4};
    `,
    light3: css`
      background-color: ${color.light3};
    `,
    light4: css`
      background-color: ${color.light4};
    `,
    mainGray: css`
      background: linear-gradient(
        90deg,
        ${color.main} 50%,
        ${color.light4} 50%
      );
    `,
    grayMain: css`
      background: linear-gradient(
        90deg,
        ${color.light4} 50%,
        ${color.main} 50%
      );
    `,
  };

  const check: Check = {
    thiner: weight.thiner,
    thin: weight.thin,
    medium: weight.medium,
    thick: weight.thick,
    main: backColor.main,
    dark4: backColor.dark4,
    light3: backColor.light3,
    light4: backColor.light4,
    mainGray: backColor.mainGray,
    grayMain: backColor.grayMain,
  };

  const finalStyle = Object.keys(props).map((attr) => check[attr]);

  const result = <div className={cx(...finalStyle)}></div>;

  return result;
}

export default FocusBar;
