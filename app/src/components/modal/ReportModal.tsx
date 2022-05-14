import ReactDOM from 'react-dom';
import { css, cx } from '@emotion/css';
import { radius, shadow, color } from '../../styles';
import CheckBox from '../check-label/CheckLabel';

interface Props {
  [key: string]: any;
}

function ReportModal({ state, close }: Props) {
  const modalWrapper = css`
    visibility: ${state ? 'visible' : 'hidden'};
  `;

  const wrapper = css`
    background-color: ${color.light1};
    ${radius[6]}
    ${shadow.normal}
    width: 360px;
    height: 470px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  const overlay = css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 8888;
  `;

  const modal = document.getElementById('modal')!;

  return ReactDOM.createPortal(
    <div className={modalWrapper}>
      <div className={cx(wrapper)}>
        <CheckBox />
      </div>
      <div onClick={close} className={cx(overlay)}></div>
    </div>,
    modal
  );
}

export default ReportModal;
