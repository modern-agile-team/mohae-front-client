/** @format */

import { useState, useEffect, useCallback, useRef } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { Snap, Category, Img } from '../../components';

interface Props {
  [key: string]: any;
}

export default function Part1(props: Props) {
  const style = css`
    padding: calc((100vh - 59px - 647px) / 2) calc((100% - 1128px) / 2);
    height: 100vh;
    display: flex;
    flex-direction: column;
  `;

  const page = (
    <div className={cx(style)}>
      <div
        className={cx(css`
          width: 1128px;
          padding: 0 0 78px;
          text-align: start;
        `)}
      >
        <span
          className={cx(css`
            line-height: 130%;
            font-size: 28px;
            color: ${color.dark2};
          `)}
        >
          {'도움이 필요할 땐,'}
        </span>
        <div
          className={cx(css`
            line-height: 87px;
            font-size: 40px;
            color: ${color.dark1};
            margin-bottom: 24px;
          `)}
        >
          <span
            className={cx(
              css`
                font-size: 60px;
                color: ${color.main};
              `
            )}
          >
            모
          </span>
          <span>두의</span>
          <span
            className={cx(
              css`
                font-size: 60px;
                color: ${color.main};
              `
            )}
          >
            {' '}
            해
          </span>
          <span>결사</span>
        </div>
        <div
          className={cx(
            css`
              width: 409px;
              font-size: 20px;
              line-height: 170%;
              color: ${color.dark2};
              margin-bottom: 48px;
            `
          )}
        >
          {
            '자신의 재능으로 도움이 필요한 사람들을 도와주고 나에게 없는 재능이 필요할 때 도움을 받아요.'
          }
        </div>
        <div
          className={cx(
            css`
              width: 648px;
              height: 63px;
              position: relative;
            `
          )}
        >
          <input
            placeholder={'인풋창 글씨 크기임'}
            className={cx(css`
              width: 100%;
              height: 100%;
              ${radius[6]}
              ${shadow.normal}
              font-size: 24px;
            `)}
          />
          <div
            className={cx(css`
              width: 552px;
              height: 391px;
              position: absolute;
              top: -290px;
              right: -480px;
              background: url('/img/main.png') no-repeat center/contain;
            `)}
          />
        </div>
      </div>
      <Category num={8} />
      <div
        className={cx(css`
          margin: 32px auto 0;
          font-size: 14px;
          line-height: 170%;
          color: ${color.dark4};
        `)}
      >
        Scroll
      </div>
      <div
        className={cx(
          css`
            margin: 0 auto;
            width: 24px;
            height: 24px;
          `
        )}
      >
        <Img src={'img/scroll.png'} />
      </div>
    </div>
  );

  return <>{page}</>;
}
