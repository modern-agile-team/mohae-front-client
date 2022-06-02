import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import ArrowBtn from '../arrowbtn/ArrowBtn';
import Img from '../img/Img';
import { Box } from '../../components';
import { animation } from './modalAnimation';

interface Props {
  [key: string]: any;
}

function AlarmModal({ visible, preBtn, close, contents }: Props) {
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
    right: 40px;
    bottom: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 11;
    ${visible ? animation.alarmAppear : animation.alarmDisappear}
  `;

  const alarmBtn = css`
    width: 27.5px;
    height: 30.5px;
    top: 11px;
    left: 11px;
    position: absolute;
  `;

  const arrowBtn = css`
    top: 16px;
    left: 16px;
    position: absolute;
  `;

  const closeBtn = css`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 16px;
    right: 16px;
  `;

  const cursor = css`
    cursor: pointer;
  `;

  return (
    <div>
      <Box light bigRadius size={[364, 500]} className={box}>
        {preBtn ? (
          <div className={cx(arrowBtn, cursor)}>
            <ArrowBtn left dark onClick={() => alert('이전')} />
          </div>
        ) : (
          <div className={cx(alarmBtn, cursor)}>
            <Img src={'img/alarm-bell.png'} onClick={() => alert('알람로고')} />
          </div>
        )}
        <div className={cx(closeBtn, cursor)}>
          <Img src={'img/close.png'} onClick={close} />
        </div>
        {contents}
      </Box>
    </div>
  );
}

export default AlarmModal;
