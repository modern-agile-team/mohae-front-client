import { css, cx } from '@emotion/css';
import { useEffect, useState } from 'react';
import { font, radius } from '../../styles';
import { Props } from '../button';
import Img from '../img/Img';

function Mosaic(props: Props) {
  const { body, img, childeren } = props;
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setscrollX] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setscrollX(window.pageXOffset);
      setScrollY(window.pageYOffset);
    });
    window.removeEventListener('scroll', () => {
      setscrollX(window.pageXOffset);
      setScrollY(window.pageYOffset);
    });
  }, [scrollY]);

  const bodyMosaic = css`
    width: calc(99.5vw + ${scrollX}px);
    height: calc(${scrollY}px + 90px);
    background: linear-gradient(
      180.11deg,
      rgba(250, 251, 252, 0) 4.81%,
      rgba(152, 152, 152, 0.016) 30.04%,
      rgba(78, 78, 78, 0.8) 99.9%
    );
    position: absolute;
    top: 631px;
    left: 0px;
    backdrop-filter: blur(8px);
  `;

  const imgsMosaic = css`
    width: 360px;
    height: 360px;
    z-index: 1;
    ${radius[6]}
    backdrop-filter: blur(8px);
    background-color: rgba(79, 78, 92, 0.5);
    position: absolute;
    top: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
    #centerWrap {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    #centerWrap > div {
      width: 35px;
      height: 40px;
    }
    .img-wrap {
      width: 25px;
      height: 25px;
    }
    p {
      width: 154px;
      height: 48px;
      ${font.size[14]}
      ${font.weight.regular}
      color: white;
      text-align: center;
      padding-top: 0.8em;
    }
  `;

  const oderedMosaic = css`
    position: relative;
    .real-box {
      ${radius[6]}
      width: 360px;
      height: 72px;
      position: absolute;
      top: 416px;
      left: 0px;
      z-index: 1;
      backdrop-filter: blur(8px);
      background-color: rgba(79, 78, 92, 0.5);
    }
  `;

  return body ? (
    <div className={cx(bodyMosaic)} />
  ) : (
    <>
      <div className={cx(imgsMosaic)}>
        <div id='centerWrap'>
          <div className='img-wrap'>
            <Img src='/img/lock-white.png' />
          </div>
          <p>
            로그인 후<br />
            서비스를 이용해 주세요.
          </p>
        </div>
      </div>
      <div className={cx(oderedMosaic)}>
        <div className='real-box'></div>
      </div>
    </>
  );
}

export default Mosaic;
