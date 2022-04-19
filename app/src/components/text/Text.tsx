import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { ReactElement } from 'react';
import { start } from 'repl';

type Props = {
  [props: string]: boolean | undefined | string | number[] | JSX.Element;
};

export default function Text(props: Props): ReactElement {
  const commonStyle = css`
    ${font.weight.regular}
  `;
  const warnning: string = css`
    ${commonStyle}
    color: ${color.error};
    ${font.size[14]}
  `;

  const star: string = css`
    ${commonStyle}
    color: ${color.dark1};
    ${font.size[16]}
    position: relative;
    :after {
      content: '*';
      position: absolute;
      top: -4px;
      right: -8px;
      color: ${color.error};
    }
  `;

  interface Check {
    [key: string]: string;
  }

  const check: Check = {
    warnning: warnning,
    star: star,
    undefined: warnning,
  };

  const finalStyles = Object.keys(props).map((prop) => check[prop]);

  return <span className={cx([...finalStyles])}>{props.children}</span>;
}
