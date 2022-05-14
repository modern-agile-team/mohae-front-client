import ReactDOM from 'react-dom';
import { css, cx } from '@emotion/css';
import { radius, shadow, font, color } from '../../styles';
import ArrowBtn from '../arrowbtn/ArrowBtn';
import Img from '../img/Img';

interface Props {
  [key: string]: any;
}

function BasicModal({ state, close, big, preBtn, closeBtn, contents }: Props) {
  const size = {
    big: css`
      width: 1128px;
      height: 630px;
    `,
    medium: css`
      width: 936px;
      height: 540px;
    `,
  };

  const modalWrapper = css`
    visibility: ${state ? 'visible' : 'hidden'};
  `;

  const wrapper = css`
    background-color: ${color.light1};
    ${radius[24]}
    ${big ? size.big : size.medium}
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
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
    z-index: 888;
  `;

  const modal = document.getElementById('modal')!;

  return ReactDOM.createPortal(
    <div className={cx(modalWrapper)}>
      <div className={cx(wrapper)}>
        {preBtn && (
          <div
            className={cx(
              css`
                top: 24px;
                left: 24px;
                position: absolute;
              `,
              cursor
            )}>
            <ArrowBtn left dark onClick={() => alert('이전')} />
          </div>
        )}
        {closeBtn && (
          <div
            className={cx(
              css`
                width: 24px;
                height: 24px;
                position: absolute;
                top: 24px;
                right: 24px;
              `,
              cursor
            )}>
            <Img src={'img/close.png'} onClick={close} />
          </div>
        )}
        {contents}
      </div>
      <div onClick={close} className={cx(overlay)}></div>
    </div>,
    modal
  );
}

export default BasicModal;
