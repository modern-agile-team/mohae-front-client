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
    height: calc(${scrollY}px + 100vh);
    background: linear-gradient(
      180.11deg,
      rgba(250, 251, 252, 0) 4.81%,
      rgba(152, 152, 152, 0.016) 30.04%,
      rgba(78, 78, 78, 0.8) 99.9%
    );
    position: fixed;
    top: calc(542px - ${scrollY}px);
    left: 0px;
    backdrop-filter: blur(8px);
  `;

  const imgsMosaic = css`
    width: 360px;
    height: 449px;
    z-index: 1;
    ${radius[6]}
    backdrop-filter: blur(8px);
    background: linear-gradient(
      180.11deg,
      rgba(250, 251, 252, 0) 4.81%,
      rgba(152, 152, 152, 0.016) 30.04%,
      rgba(78, 78, 78, 0.8) 99.9%
    );
    position: absolute;
    top: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
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
      <p>
        로그인 후<br />
        서비스를 이용해 주세요.
      </p>
    </div>
  );
}

export default Mosaic;
