import { useState, useEffect, useCallback, useRef } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { Snap, Category, Img } from '../../components';

interface Props {
  [key: string]: any;
}

export default function Home(props: Props) {
  const part1_CSS = css`
    padding: calc((100vh - 59px - 647px) / 2) calc((100% - 1128px) / 2);
    display: flex;
    flex-direction: column;
  `;

  const part1 = (
    <div className={cx(part1_CSS)}>
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
            className={cx(css`
              width: 100%;
              height: 100%;
              ${radius[6]}
              /* ${shadow.mormal} */
              box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
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
      <Category />
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
            background: url('/img/scroll.png') no-repeat center/contain;
          `
        )}
      />
    </div>
  );

  const part2_CSS = css`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const part2 = (
    <div className={cx(part2_CSS)}>
      <div>
        <span
          className={cx(css`
            font-weight: 700;
            font-size: 28px;
            line-height: 130%;
            color: ${color.dark1};
          `)}
        >
          {'이런 사람들이 사용하면 좋아요!'}
        </span>
        <div
          className={cx(css`
            margin-top: 56px;
            display: flex;
          `)}
        >
          <div
            className={cx(css`
              width: 360px;
              height: 270px;
            `)}
          >
            <Img src={'/img/report-text.png'} />
            <div
              className={cx(
                css`
                  width: 360px;
                  height: 54px;
                  font-size: 16px;
                  overflow: auto;
                `
              )}
            >
              {
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe iure, dignissimos aliquam quisquam ab molestias aut maiores laborum soluta? Molestiae eveniet dicta dolorum itaque repudiandae est perspiciatis consectetur quo rem?'
              }
            </div>
          </div>
          <div
            className={cx(css`
              width: 360px;
              height: 270px;
            `)}
          >
            <Img src={'/img/report-text.png'} />
            <div
              className={cx(
                css`
                  width: 360px;
                  height: 54px;
                  font-size: 16px;
                  overflow: auto;
                `
              )}
            >
              {
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe iure, dignissimos aliquam quisquam ab molestias aut maiores laborum soluta? Molestiae eveniet dicta dolorum itaque repudiandae est perspiciatis consectetur quo rem?'
              }
            </div>
          </div>
          <div
            className={cx(css`
              width: 360px;
              height: 270px;
            `)}
          >
            <Img src={'/img/report-text.png'} />
            <div
              className={cx(
                css`
                  width: 360px;
                  height: 54px;
                  font-size: 16px;
                  overflow: auto;
                `
              )}
            >
              {
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe iure, dignissimos aliquam quisquam ab molestias aut maiores laborum soluta? Molestiae eveniet dicta dolorum itaque repudiandae est perspiciatis consectetur quo rem?'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const part3 = <div>3</div>;

  const part4 = <div>4</div>;

  const contents = [part1, part2, part3, part4];

  return <Snap contents={contents} />;
}
