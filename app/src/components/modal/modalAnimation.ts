import { css, keyframes } from '@emotion/css';

const disappearOverlay = keyframes`
from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const basicAppearAni = keyframes`
from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%);
  }
`;

const basicDisappearAni = keyframes`
from {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
`;

const alarmAppearAni = keyframes`
from {
  transform: scale(0.5);
  opacity: 0;
  transform-origin: 100% 100%;
}
to {
  transform: scale(1);
  opacity: 1;
  transform-origin: 100% 100%;
}
`;

const alarmDisappear = keyframes`
from {
  transform: scale(1);
  opacity: 1;
  transform-origin: 100% 100%;
}
to {
  transform: scale(0.5);
  opacity: 0;
  transform-origin: 100% 100%;
}
`;

export const animation = {
  dissappearOverlay: css`
    animation: ${disappearOverlay} 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  `,
  basicAppear: css`
    animation: ${basicAppearAni} 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  `,
  basicDissappear: css`
    animation: ${basicDisappearAni} 0.8s cubic-bezier(0.77, 0, 0.175, 1)
      forwards;
  `,
  alarmAppear: css`
    animation: ${alarmAppearAni} 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955)
      0.2s both;
  `,
  alarmDisappear: css`
    animation: ${alarmDisappear} 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955)
      0.2s both;
  `,
};
