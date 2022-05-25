import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { Box } from '../../components';
import ArrowBtn from '../arrowbtn/ArrowBtn';
import Img from '../img/Img';
import { animation } from './modalAnimation';

interface Props {
  [key: string]: any;
}

function BasicModal({
  visible,
  close,
  big,
  preBtn,
  noCloseBtn,
  contents,
}: Props) {
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    let timer: any;
    if (visible) {
      setModalState(true);
    } else {
      timer = setTimeout(() => setModalState(false), 800);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  if (!modalState) return null;

  const box = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 12;
    ${visible ? animation.basicAppear : animation.basicDissappear}
  `;

  const arrowBtn = css`
    top: 24px;
    left: 24px;
    position: absolute;
  `;

  const closeBtn = css`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 24px;
    right: 24px;
  `;

  const cursor = css`
    cursor: pointer;
  `;

  const overlay = css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 11;
    ${modalState || animation.dissappearOverlay};
  `;

  return (
    <div>
      <Box
        light
        bigRadius
        size={big ? [1128, 630] : [936, 560]}
        className={box}>
        {preBtn && (
          <div className={cx(arrowBtn, cursor)}>
            <ArrowBtn left dark onClick={() => alert('이전')} />
          </div>
        )}
        {noCloseBtn || (
          <div className={cx(closeBtn, cursor)}>
            <Img src={'img/close.png'} onClick={close} />
          </div>
        )}
        {contents}
      </Box>
      <div onClick={close} className={cx(overlay)}></div>
    </div>
  );
}

export default BasicModal;
