import ReactDOM from 'react-dom';
import { css, cx } from '@emotion/css';
import { radius, shadow, font } from '../../styles';

interface Props {
  [key: string]: any;
}

const wrapper = css`
  background-color: white;
  ${radius[6]}
  ${shadow.normal}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 205px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const text = css`
  width: 230px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${font.size[14]}
  ${font.weight.regular}
`;

const btnWrapper = css`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const subBtn = css`
  margin-right: 8px;
`;

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 8888;
`;

function Popup({ text1, text2, btnMain, btnSub }: Props) {
  const popup = document.getElementById('popup')!;
  return ReactDOM.createPortal(
    <>
      <div className={cx(wrapper)}>
        <div className={cx(text)}>{text1}</div>
        {text2 && (
          <>
            <div className={cx(text)}>{text2}</div>
          </>
        )}
        <div className={cx(btnWrapper)}>
          {btnSub && <div className={cx(subBtn)}>{btnSub}</div>}
          <div>{btnMain}</div>
        </div>
      </div>
      <div className={cx(overlay)}></div>
    </>,
    popup
  );
}

export default Popup;
