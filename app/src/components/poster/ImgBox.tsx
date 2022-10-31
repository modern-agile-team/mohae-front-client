import { keyframes } from '@emotion/css';
import { Box } from '../../components';
import MarkBox from '../markbox/MarkBox';
import styled from '@emotion/styled';

interface Props {
  img: string | null;
  state: number;
  shape: number;
  size: 'large' | 'medium';
}

function ImgBox({ img, state, shape, size }: Props) {
  const posterImg =
    img && img !== null
      ? `https://d2ffbnf2hpheay.cloudfront.net/${img}?w=264&h152`
      : '/img/logo.png';

  const zoomIn = keyframes`
  from {
    background-size: 100%;
  }
  to {
    background-size: 120%;
  }
  `;
  const containerSize = size === 'large' ? [360, 208] : [264, 152];

  return (
    <Container
      img={img}
      posterImg={posterImg}
      animation={zoomIn}
      size={containerSize}
    >
      <div className="markBox">
        <MarkBox shape={shape} state={state} size={'small'} />
      </div>
      {state ? <div id="find" className={'mosaic'} /> : <></>}
    </Container>
  );
}

export default ImgBox;

const Container = styled(Box)<{
  img: string | null;
  posterImg: string;
  animation: string;
}>`
  background: white url(${props => props.posterImg}) no-repeat center/cover;
  background-size: ${props => (props.img ? '100%' : '30%')};
  border-radius: 6px 6px 0px 0px;
  position: relative;

  ${props =>
    props.img !== null &&
    `:hover {
      animation: ${props.animation} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
    }`}

  .mosaic {
    height: inherit;
    background: #4f4e5c;
    opacity: 0.5;
    border-radius: 6px 6px 0px 0px;
  }
  .markBox {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
  }
`;
