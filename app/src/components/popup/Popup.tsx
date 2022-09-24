import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { css, cx } from '@emotion/css';
import { font } from '../../styles';
import { Box } from '../../components';
import { animation } from '../modal/modalAnimation';

interface Props {
  text1?: string;
  text2?: string;
  visible: boolean;
  overlay?: () => void;
  alarm?: any;
  children?: React.ReactNode;
}

function Popup({ text1, text2, visible, overlay, alarm, children }: Props) {
  const [popupState, setPopupState] = useState(false);

  useEffect(() => {
    let timer: any;
    if (visible) {
      setPopupState(true);
    } else {
      timer = setTimeout(() => setPopupState(false), 800);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  if (!popupState) return null;

  const size = alarm ? [300, 187] : [360, 205];

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
  `;

  const text = css`
    width: ${alarm ? 284 : 312}px;
    height: fit-content;
    line-height: 23.8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${font.size[14]}
    ${font.weight[400]}
  `;

  const btnWrapper = css`
    width: 156px;
    margin-top: ${alarm ? 16 : 32}px;
    display: flex;
    align-items: center;
    justify-content: center;
    & :not(:first-child) {
      margin-left: 8px;
    }
  `;

  const overlayStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 13;
    ${overlay && 'background-color: rgba(0, 0, 0, 0.3)'}
  `;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        overlay && overlay();
      }}
    >
      <Box size={size} className={box}>
        <div className={cx(text)}>
          {text1}
          <br />
          {text2}
        </div>
        <div className={cx(btnWrapper)}>{children}</div>
      </Box>
      <div
        className={cx(overlayStyle)}
        onClick={() => overlay && overlay()}
      ></div>
    </form>
  );
}

export default Popup;
