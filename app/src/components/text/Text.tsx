import { css, cx } from '@emotion/css';
import { color, font } from '../../styles';
import { ReactElement } from 'react';

type Props = {
  [props: string]: any;
};

export default function Text(props: Props): ReactElement {
  const fontSize =
    (Number(props.warnning) >= 10 && `${props.warnning}px`) ||
    (Number(props.star) >= 10 && `${props.star}px`) ||
    '14px';
  // const size = `${props.warnning}px` || `${props.star}px` || '14px';

  const commonStyle = css`
    color: ${color.error};
    ${font.weight.regular}
    font-size: ${fontSize};
  `;

  const star: string = css`
    color: ${color.dark1};
    position: relative;
    :after {
      content: '*';
      position: relative;
      top: -4px;
      color: ${color.error};
    }
  `;

  interface Check {
    [key: string]: string;
  }

  const check: Check = {
    star: star,
  };

  const finalStyles = Object.keys(props).map(prop => {
    return check[prop];
  });

  return (
    <span className={cx(commonStyle, [...finalStyles])}>{props.children}</span>
  );
}
