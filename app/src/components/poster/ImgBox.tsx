import { css, cx, keyframes } from '@emotion/css';
import { color } from '../../styles';
import { Box } from '../../components';
import MarkBox from '../markbox/MarkBox';

interface Props {
  img: string;
  state: number;
  shape: number;
}

function ImgBox({ img, state, shape }: Props) {
  const size = [264, 152];

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
    border-radius: 6px 6px 0px 0px;

    /* position: relative; */

    /* animation */
    ${img !== null && hover}
    .mosaic {
      height: inherit;
      background: ${color.dark1};
      opacity: 0.5;
    }
    .markBox {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 1;
    }
  `;

  return (
    <Box size={size} className={box}>
      <div className='markBox'>
        <MarkBox shape={shape} state={state} hover />
      </div>
      {state ? <div id='find' className={'mosaic'} /> : <></>}
    </Box>
  );
}

export default ImgBox;
