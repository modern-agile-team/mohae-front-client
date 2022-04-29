import { css, cx } from '@emotion/css';
import React, { ReactChild } from 'react';
import { color, font, radius, shadow } from '../../styles';
import { btnStyle, Props } from '../button';

function MarkBox(props: Props) {
  const { helpMeAble, helpMeDisable, big, small, hover, disable } = props;
  const imgURL = {
    helpMeAble: 'img/exclamation-mark-main.png',
    helpMeDisable: 'img/exclamation-mark-dark1.png',
    helpMeBtnDisable: 'img/exclamation-mark-light1.png',
    helpUAble: 'img/question-mark-main.png',
    helpUDisable: 'img/question-mark-dark1.png',
    helpUBtnDisable: 'img/question-mark-light1.png',
  };

  const commonStyle = css`
    cursor: pointer;
    border-radius: 1px;
  `;

  const hoverBoxStyle = css`
    width: 212px;
    height: 104px;
    ${btnStyle.square}
    background-color: white;
    color: ${color.dark1};
    ${font.size[14]}
    ${font.weight.regular}
    line-height: 23.8px;
    text-align: center;
    visibility: hidden;
    position: relative;
    padding: 16px;
    ${shadow.normal}
  `;

  const hoverBoxAttr = () =>
    big
      ? css`
          ${hoverBoxStyle}
          bottom: 124px;
          left: 20px;
        `
      : css`
          ${hoverBoxStyle}
          bottom: 120px;
          left: 16px;
        `;

  const markBoxSize = () =>
    big
      ? css`
          width: 30px;
          height: 30px;
        `
      : css`
          width: 24px;
          height: 24px;
        `;

  const wrap = css`
    ${markBoxSize()};
    &:hover p {
      visibility: visible;
    }
  `;

  interface Attrs {
    [state: string]: string;
  }

  const attrs: Attrs = {
    helpMeAble: css`
      background: no-repeat center / contain url(${imgURL.helpMeAble});
    `,
    helpMeDisable: css`
      background: no-repeat center / contain url(${imgURL.helpMeDisable});
    `,
    helpMeBtnAble: css`
      background: no-repeat center / contain url(${imgURL.helpMeAble});
    `,
    helpMeBtnDisable: css`
      background: no-repeat center / contain url(${imgURL.helpMeBtnDisable});
    `,
    helpUAble: css`
      background: no-repeat center / contain url(${imgURL.helpUAble});
    `,
    helpUDisable: css`
      background: no-repeat center / contain url(${imgURL.helpUDisable});
    `,
    helpUBtnAble: css`
      background: no-repeat center / contain url(${imgURL.helpUAble});
    `,
    helpUBtnDisable: css`
      background: no-repeat center / contain url(${imgURL.helpUBtnDisable});
    `,
  };

  const attrProps = [
    ...Object.keys(props).map(attr => attrs[attr]),
    markBoxSize(),
  ];

  const hoverBox = (content: ReactChild) =>
    hover && <p className={cx(hoverBoxAttr())}>{content}</p>;

  const show = () => {
    const helpMeContent = (
      <>
        !필요해요!
        <br />
        나에게 없는 재능이 필요하면
        <br />
        도움을 요청해보세요.
      </>
    );

    const helpUContent = (
      <>
        ?필요해요?
        <br />
        내가 가진 재능이 필요한
        <br />
        사람이 있는지 물어보세요.
      </>
    );

    return (
      <div className={cx(wrap)}>
        <div className={cx(commonStyle, attrProps)} />
        {helpMeAble || helpMeDisable
          ? hoverBox(helpMeContent)
          : hoverBox(helpUContent)}
      </div>
    );
  };

  return show();
}

export default MarkBox;
