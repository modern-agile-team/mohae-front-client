import { css, cx } from '@emotion/css';
import { useState } from 'react';
import { color, btnStyle, shadow, Props } from '../index';

function Btn4(props: Props) {
  const { report, bookMark, like, chatting, big, small, disable } = props;
  const [liked, setLiked] = useState(false);

  const commonStyle = css`
    ${btnStyle.square}
    ${shadow.normal}
  `;

  const size = () =>
    big
      ? [
          css`
            ${commonStyle}
            width: 60px;
            height: 60px;
            padding: 16px 16px;
            background-size: 28px;
          `,
        ]
      : [
          css`
            ${commonStyle}
            width: 43px;
            height: 43px;
            padding: 12px 12px;
            background-size: 19px;
          `,
        ];

  interface BtnState {
    [color: string]: {
      [state: string]: string;
    };
  }

  const btnState: BtnState = {
    white: {
      able: css`
        background-color: white;
        &:hover {
          background-color: ${color.subtle};
        }
        &:active {
          background-color: ${color.lighter};
        }
      `,
      disable: css`
        cursor: unset;
        background-color: white;
        &:hover {
          background-color: white;
        }
        &:active {
          background-color: white;
        }
      `,
    },
    main: {
      able: css`
        background-color: ${color.main};
        &:active {
          background-color: ${color.darker};
        }
      `,
      disable: css`
        cursor: unset;
        background-color: ${color.light4};
        &:hover {
          background-color: ${color.light4};
        }
        &:active {
          background-color: ${color.light4};
        }
      `,
    },
  };

  interface Imgs {
    [img: string]: {
      [state: string]: string;
    };
  }
  const imgs: Imgs = {
    report: {
      able: css`
        background: no-repeat center/contain url('img/report-main.png');
        ${btnState.white.able}
      `,
      disable: css`
        background: no-repeat center/contain url('img/report-light1.png');
        ${btnState.white.disable}
      `,
    },
    bookMark: {
      able: css`
        background: no-repeat center/contain url('img/bookmark-main.png');
        ${btnState.white.able}
      `,
      disable: css`
        background: no-repeat center/contain url('img/bookmark-light1.png');
        ${btnState.white.disable}
      `,
    },
    like: {
      able: css`
        background: no-repeat center/contain url('img/heart-main.png');
        ${btnState.white.able}
      `,
      disable: css`
        background: no-repeat center/contain url('img/heart-light1.png');
        ${btnState.white.disable}
      `,
      clicked: css`
        background: no-repeat center/contain url('img/heart-filled-main.png');
        ${btnState.white.able}
      `,
    },
    chatting: {
      able: css`
        background: no-repeat url('img/chatting.png');
        background-position: 55% 60%;
        ${btnState.main.able};
      `,
      disable: css`
        background: no-repeat url('img/chatting.png');
        background-position: 55% 60%;
        ${btnState.main.disable}
      `,
    },
  };

  const contentImg = Object.keys(props)
    .map(attr => imgs[attr])
    .filter(el => el)
    .map(el => (disable ? [...[el.disable], size()] : [...[el.able], size()]));

  const clickLikeBtn = () => (liked ? imgs.like.clicked : imgs.like.able);

  const show = () =>
    like ? (
      <button
        onClick={() => setLiked(!liked)}
        className={cx(
          commonStyle,
          contentImg,
          !disable && clickLikeBtn(),
          size()
        )}
      />
    ) : (
      <button className={cx(commonStyle, contentImg)} />
    );

  return show();
}

export default Btn4;
