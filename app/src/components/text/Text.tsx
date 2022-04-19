import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { ReactElement } from 'react';
import { start } from 'repl';

type Props = {
  [props: string]: boolean | undefined | string | number[] | JSX.Element;
};

export default function Text(props: Props): ReactElement {
  const fontSize =
    (Number(props.warnning) >= 10 && `${props.warnning}px`) ||
    (Number(props.star) >= 10 && `${props.star}px`) ||
    '14px';
  console.log(`fontSize`, fontSize);

  const commonStyle = css`
    color: ${color.error};
    ${font.weight.regular}
    font-size: ${fontSize};
  `;
  const warnning: string = css``;

  const star: string = css`
    color: ${color.dark1};
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

  const finalStyles = Object.keys(props).map((prop) => {
    return check[prop];
  });

  return (
    <span className={cx(commonStyle, [...finalStyles])}>{props.children}</span>
  );
}
