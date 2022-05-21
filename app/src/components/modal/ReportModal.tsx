import ReactDOM from 'react-dom';
import { css, cx } from '@emotion/css';
import { radius, shadow, color } from '../../styles';
import CheckBox from '../check-label/CheckLabel';
import { Box } from '../../components';

interface Props {
  [key: string]: any;
}

function ReportModal({ visible, close }: Props) {
  const modalWrapper = css`
    visibility: ${visible ? 'visible' : 'hidden'};
  `;

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
  `;

  const overlay = css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 13;
  `;

  return (
    <div className={modalWrapper}>
      <Box light size={[360, 470]} className={box}>
        <CheckBox />
      </Box>
      <div onClick={close} className={cx(overlay)}></div>
    </div>
  );
}

export default ReportModal;
