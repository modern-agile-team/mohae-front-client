import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { Box } from '../../components';
import Img from '../img/Img';
import { animation } from './modalAnimation';
import { close_all } from '../../redux/modal/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/root';

interface Props {
  visible: any;
  children: any;
  big: any;
  setPart?: React.Dispatch<React.SetStateAction<number>>;
}

function AuthModal({ visible, big, children, setPart }: Props) {
  const [modalState, setModalState] = useState(visible);
  const dispatch = useDispatch<AppDispatch>();
  const isRegister = useSelector(
    (state: RootState) => state.modal.openRegister,
  );
  useEffect(() => {
    let timer: any;
    if (isRegister) setPart && setPart(1);
    if (visible) {
      setModalState(true);
    } else {
      timer = setTimeout(() => setModalState(false), 200);
    }
    return () => {
      clearTimeout(timer);
      setPart && setPart(0);
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
    z-index: 12;
    ${visible ? animation.basicAppear : animation.basicDissappear}
  `;

  const closeBtn = css`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 24px;
    right: 24px;
    border-radius: 50%;
    :hover {
      background-color: rgba(231, 231, 232, 0.7);
    }
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
    z-index: 11;
    ${modalState || animation.dissappearOverlay};
  `;

  const close = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(close_all(false));
    setModalState(false);
  };

  return (
    <div
      className={cx(
        css`
          height: fit-content;
          overflow: hidden;
        `,
      )}
    >
      <Box
        light
        bigRadius
        size={big ? [1128, 630] : [936, 540]}
        className={box}
      >
        <div className={cx(closeBtn, cursor)}>
          <Img src={'/img/close.png'} onClick={close} />
        </div>
        {children}
      </Box>
      <div onClick={close} className={cx(overlay)}></div>
    </div>
  );
}

export default AuthModal;