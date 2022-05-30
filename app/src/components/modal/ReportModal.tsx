import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import CheckBox from '../check-label/CheckLabel';
import { Box } from '../../components';
import { animation } from './modalAnimation';
import { Btn5 } from '../../components/button';

interface Props {
  [key: string]: any;
}

function ReportModal({ visible, close }: Props) {
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
    z-index: 14;
    ${visible ? animation.basicAppear : animation.basicDissappear}

    .btnWrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      & > :not(:last-child) {
        margin-right: 8px;
      }
    }
  `;
  const overlay = css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 13;
    ${modalState || animation.dissappearOverlay};
  `;

  return (
    <>
      <Box light size={[360, 470]} className={box}>
        <CheckBox />
        <div className={'btnWrapper'}>
          <Btn5 main>전송</Btn5>
          <Btn5 onClick={close} main>
            취소
          </Btn5>
        </div>
      </Box>
      <div onClick={close} className={cx(overlay)}></div>
    </>
  );
}

export default ReportModal;
