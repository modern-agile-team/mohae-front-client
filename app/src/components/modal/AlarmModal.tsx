import { useState, useEffect } from 'react';
import { css } from '@emotion/css';
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

    .alarmBtn {
      width: 27.5px;
      height: 30.5px;
      top: 11px;
      left: 11px;
      position: absolute;
      cursor: pointer;
    }

    .arrowBtn {
      top: 16px;
      left: 16px;
      position: absolute;
      cursor: pointer;
    }

    .closeBtn {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 16px;
      right: 16px;
      cursor: pointer;
    }
  `;

  return (
    <Box light bigRadius size={[364, 500]} className={box}>
      {preBtn ? (
        <div className={'arrowBtn'}>
          <ArrowBtn left dark onClick={() => alert('이전')} />
        </div>
      ) : (
        <div className={'alarmBtn'}>
          <Img src={'img/alarm-bell.png'} onClick={() => alert('알람로고')} />
        </div>
      )}
      <div className={'closeBtn'}>
        <Img src={'img/close.png'} onClick={close} />
      </div>
      {contents}
    </Box>
  );
}

export default AlarmModal;
