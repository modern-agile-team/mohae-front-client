/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
import { Box, FocusBar, BasicModal, Carousel, PostIt } from '../../components';

export default function Visit() {
  const text: { [key: string]: any } = {
    sir: '님',
  };

  const style = css`
    width: 100%;
    height: 100%;
    ${radius[24]};
    padding: 48px 84px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > .title {
      height: 36px;
      color: ${color.dark1};
      line-height: 130%;
      font-size: 28px;
      .user {
        ${font.weight[700]};
        margin-right: 8px;
      }
    }
    > .wrapper {
      display: flex;
      justify-content: space-between;
      > .box {
        width: 100%;
        height: 100%;
        padding: 8px;
      }
      .carousel {
        width: 504px;
        height: 438px;
        margin: 0 auto;
      }
      > .postit {
        width: 600px;
        height: 470px;
        background-color: lightblue;
      }
      .texts {
        padding: 8px;
        > * {
          margin: 8px;
          color: ${color.dark1};
        }

        .title {
          font-size: 18px;
          display: flex;
          align-items: center;
          height: 23px;
          margin-bottom: 16px;
        }
        .wrapper {
          padding-right: 8px;
          overflow: auto;
          > .description {
            width: 304px;
            height: 316px;
            /* margin: 8px 0 calc(24px - 8px) 8px; */
            /* padding-right: 16px; */
            font-size: 14px;
          }
        }
        > .footer {
          .complete {
            width: 74px;
            height: 43px;
          }
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  `;

  const description =
    '가나다라마바사아자차카타파하~가나다라마바사아자차카타파하~가나다라마바사아자차카타~';

  const title = '제목입니다~';

  const contents = (
    <div className={cx(style)}>
      <div className={'title'}>
        <span className={'user'}>{'모던애자'}</span>
        <span>{text.sir}</span>
      </div>
      <div className={'wrapper'}>
        <PostIt big>
          <div className={'carousel'}>
            <Carousel
              outsideBtn
              imgs={[
                'img/camera.png',
                'img/edit.png',
                'img/filter.png',
                'img/heart-main.png',
                'img/study.png',
                'img/send.png',
                'img/star-unfilled.png',
              ]}
            />
          </div>
        </PostIt>
        <Box size={[336, 470]}>
          <div className={'box texts'}>
            <div className={'title'}>{'제목입니다~'}</div>
            <div>
              <FocusBar light thin />
            </div>
            <div className={'wrapper'}>
              <div className={'description'}>{description}</div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );

  return (
    <BasicModal big visible={true}>
      {contents}
    </BasicModal>
  );
}
