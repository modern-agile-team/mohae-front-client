import ReactDOM from 'react-dom';
import { css, cx } from '@emotion/css';
import { radius, shadow, color } from '../../styles';
import ArrowBtn from '../arrowbtn/ArrowBtn';
import Img from '../img/Img';

interface Props {
  [key: string]: any;
}

function AlarmModal({ leftBtn, close, contents }: Props) {
  const wrapper = css`
    background-color: ${color.light1};
    ${radius[24]}
    ${shadow.normal}
    width: 364px;
    height: 500px;
    position: fixed;
    right: 40px;
    bottom: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
    overflow: hidden;
  `;

  const cursor = css`
    cursor: pointer;
  `;

  const modal = document.getElementById('modal')!;

  return ReactDOM.createPortal(
    <>
      <div className={cx(wrapper)}>
        {leftBtn === 'alarm' ? (
          <div
            className={cx(
              css`
                width: 27.5px;
                height: 30.5px;
                top: 11px;
                left: 11px;
                position: absolute;
              `,
              cursor
            )}>
            <Img src={'img/alarm-bell.png'} onClick={() => alert('알람로고')} />
          </div>
        ) : (
          <div
            className={cx(
              css`
                top: 16px;
                left: 16px;
                position: absolute;
              `,
              cursor
            )}>
            <ArrowBtn left dark onClick={() => alert('이전')} />
          </div>
        )}

        <div
          className={cx(
            css`
              width: 24px;
              height: 24px;
              position: absolute;
              top: 16px;
              right: 16px;
            `,
            cursor
          )}>
          <Img src={'img/close.png'} onClick={close} />
        </div>
        {contents}
      </div>
    </>,
    modal
  );
}

export default AlarmModal;
