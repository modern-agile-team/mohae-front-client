import { css, cx, keyframes } from '@emotion/css';
import { color } from '../../styles';
import { Box } from '../../components';

interface Props {
  [key: string]: any;
}

interface CheckSize {
  [key: string]: number[];
}

function ImgBox({ place, img, state }: Props) {
  const checkSize: CheckSize = {
    inMain: [360, 208],
    inBoard: [264, 152],
    inSpec: [228, 120],
    inReview: [173, 97],
  };

  const size = checkSize[place];

  const zoomIn = keyframes`
  from {
    background-size: 100%;
  }
  to {
    background-size: 120%;
  }
  `;

  const hover = css`
    :hover {
      animation: ${zoomIn} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
    }
  `;

  const imgUrl = img ? img : '/img/logo.png';

  const box = css`
    background: white url(${imgUrl}) no-repeat center/cover;
    background-size: ${img ? '100%' : '30%'};

    position: relative;

    /* animation */
    ${img !== null && hover}
  `;

  const disableBox = css`
    height: inherit;
    background: ${color.dark1};
    opacity: 0.5;
  `;

  return (
    <Box noRadius size={size} className={box}>
      {state === 'disable' && <div className={cx(disableBox)}></div>}
    </Box>
  );
}

export default ImgBox;
