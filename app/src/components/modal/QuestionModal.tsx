import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import { Box } from '../../components';
import { color, font } from '../../styles';

interface Props {
  visible: boolean;
  close: () => void;
}

function QuestionModal({ visible, close }: Props) {
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
  `;

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    P {
      font-size: 14px;
      font-weight: 400;
      margin-top: 39px;
    }
  `;

  const Buttons = styled.div`
    display: flex;
    margin-top: 20px;
  `;

  const Login = styled.button`
    width: 74px;
    height: 43px;
    border-radius: 6px;
    background-color: #ff445e;
    box-shadow: rgba(132, 131, 141, 0.5);
    color: #ffffff;
    margin-left: 15px;

    &:active {
      background-color: ${color.lighter};
    }
  `;

  const Close = styled.button`
    width: 74px;
    height: 43px;
    border-radius: 6px;
    background-color: #ff445e;
    box-shadow: 0px 0px 8px 0px #84838d;
    color: #ffffff;

    &:active {
      background-color: ${color.lighter};
    }
  `;

  return (
    <>
      <Box light size={[360, 205]} className={box}>
        <Wrapper>
          <p>로그인 후 서비스를 이용해주세요</p>
          <Buttons>
            <Close onClick={close}>닫기</Close>
          </Buttons>
        </Wrapper>
      </Box>
      <div onClick={close} className={cx(overlay)}></div>
    </>
  );
}

export default QuestionModal;
