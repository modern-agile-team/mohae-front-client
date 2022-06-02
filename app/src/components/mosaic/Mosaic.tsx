import { css, cx } from '@emotion/css';
import { useEffect, useState } from 'react';
import { font, radius } from '../../styles';
import { Props } from '../button';
import Img from '../img/Img';

function Mosaic(props: Props) {
  const { body, img, childeren } = props;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => setScrollY(window.pageYOffset));
    window.removeEventListener('scroll', () => setScrollY(window.pageYOffset));
  }, [scrollY]);

  const bodyMosaic = css`
    width: 100%;
    height: calc(${scrollY}px + 70px);
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
    ${radius[6]}
    backdrop-filter: blur(8px);
    background-color: rgba(79, 78, 92, 0.5);
    position: absolute;
    top: 99px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #centerWrap {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    #centerWrap > div {
      width: 35px;
      height: 40px;
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

  return body ? (
    <div className={cx(bodyMosaic)} />
  ) : (
    <div className={cx(imgsMosaic)}>
      <div id='centerWrap'>
        <div>
          <Img src='img/lock-white.png' />
        </div>
        <p>
          로그인 후<br />
          서비스를 이용해 주세요.
        </p>
      </div>
    </div>
  );
}

export default Mosaic;
