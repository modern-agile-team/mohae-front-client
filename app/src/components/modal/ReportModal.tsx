import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import CheckBox from '../check-label/CheckLabel';
import { Box } from '../../components';
import { animation } from './modalAnimation';
import { Btn } from '../button';
import Report from '../check-label/CheckLabel';
import Img from '../img/Img';
import { color, font } from '../../styles';

interface Props {
  visible: boolean;
  close: () => void;
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
    z-index: 14;
    padding: 16px 67px 24px 67px;
    ${visible ? animation.basicAppear : animation.basicDissappear}
    .wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        width: fit-content;
        height: 23px;
        color: ${color.dark1};
        ${font.size[16]}
        ${font.weight[400]}
      }
      .warring {
        width: fit-content;
        height: 14px;
        color: ${color.main};
        ${font.size[10]}
        ${font.weight[300]}
        margin-bottom: 12px;
      }
    }

    .close-btn {
      width: 15px;
      height: 15px;
      margin: 0px 0px 0px 286px;
    }

    .send-btn {
      width: 74px;
      height: 44px;
    }

    label {
      height: 20px;
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
      <Box light size={[384, 480]} className={box}>
        <div className={'close-btn'} onClick={close}>
          <Img src='/img/close.png' />
        </div>
        <div className='wrap'>
          <p className='title'>신고 사유 선택</p>
          <p className='warring'>최대 3개 항목까지 선택 가능합니다.</p>
        </div>
        <Report
          list={[
            '욕설 / 비방',
            '개인정보 요구',
            '사기',
            '사적인 연락',
            '도배',
            '선정적인 게시물',
            '위협',
          ]}
        />
        <div className='wrap'>
          <div className={'send-btn'}>
            <Btn main able>
              {'전송'}
            </Btn>
          </div>
        </div>
      </Box>
      <div onClick={close} className={cx(overlay)}></div>
    </>
  );
}

export default ReportModal;
