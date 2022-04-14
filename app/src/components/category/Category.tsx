import { css, cx } from '@emotion/css';
import { color, font, radius } from '../../styles';
import { ReactElement } from 'react';

type Props = {
  largeCircle?: boolean;
  mediumCircle?: boolean;
  smallCircle?: boolean;
  smallSquare?: boolean;
  mediumSquare?: boolean;
  largeSquare?: boolean;
  className?: any;
  children?: any;
};

function Basic(props: Props): ReactElement {
  return <div>13</div>;
}

export default Basic;
