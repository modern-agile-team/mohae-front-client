/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
import Review from './Review';
import {
  Img,
  Poster,
  NewPost,
  Box,
  Profile,
  FocusBar,
  Category,
  BasicModal,
  MarkBox,
  Btn,
} from '../../components';

export default function OtherPage() {
  const text: { [key: string]: any } = {
    sir: '님',
    board: '게시물',
    like: '좋아요',
    resume: {
      spec: '스펙',
      give: '해줄래요 이력',
      got: '받을래요 이력',
    },
  };

  const style = css`
    width: calc(1128px - 36px);
    height: 100%;
    overflow: scroll;
    padding: 20px calc(84px - 36px) 0 84px;
    margin: 20px 36px 20px 0;
    line-height: 170%;
    .row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .column {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    > div {
      margin-bottom: 32px;
    }
    > .header {
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .title {
        width: 100%;
        height: 43px;
        justify-content: space-between;
        margin-bottom: 16px;
        .name {
          ${font.weight[700]}
          font-size: 24px;
        }
        > div > div:not(:last-child) {
          margin-right: 8px;
        }
        .sir {
          margin-right: 16px;
        }
        > div {
          width: fit-content;
        }
        .btns {
          > div {
            width: 43px;
            height: 43px;
          }
        }
      }
      .info-box {
        width: 100%;
        height: 100%;
        justify-content: space-around;
      }
      .info {
        height: fit-content;
      }
      .icon {
        width: 30px;
        height: 30px;
      }
      .item {
        width: 120px;
      }
      .text {
        > :not(:last-child) {
          margin-right: 4px;
        }
      }
    }

    > .resume {
      width: 100%;
      height: fit-content;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .hidden {
        overflow: hidden;
      }
      > .title {
        width: 100%;
        ${font.weight[700]}
        margin-bottom: 16px;
      }
    }
  `;

  const resume = (title: string) => (
    <div className={'resume'}>
      <div className={'title'}>{title}</div>
      {[1, 2, 3, 4].map((post: any, index: number) => (
        <Box className={'hidden'} size={[228, 177]}>
          <NewPost page={'inSpec'} />
        </Box>
      ))}
    </div>
  );

  const component = (
    <div className={cx(style)}>
      <div className="header">
        <Profile size={150} />
        <div>
          <div className="row title">
            <div className={'row'}>
              <div className={'name'}>{'모던 애자일'}</div>
              <div className={'sir'}>{text.sir}</div>
              <Box size={[100, 36]}>
                <Category shape={'row'} name={'카테 1'} />
              </Box>
              <Box size={[100, 36]}>
                <Category shape={'row'} name={'카테 2'} />
              </Box>
              <Box size={[100, 36]}>
                <Category shape={'row'} name={'카테 3'} />
              </Box>
            </div>
            <div className={'row btns'}>
              <div>
                <Btn />
              </div>
              <div>
                <Btn white />
              </div>
            </div>
          </div>
          <Box size={[768, 90]}>
            <div className={'row info-box '}>
              <div className={'column item'}>
                <div className={'icon'}>
                  <Img src={'/img/study.png'} />{' '}
                </div>
                <span>{'대학교'}</span>
              </div>
              <div className={'column item'}>
                <div className={'icon'}>
                  <Img src={'/img/study.png'} />{' '}
                </div>
                <span>{'대학교'}</span>
              </div>
              <div className={'column item'}>
                <div className={'icon'}>
                  <Img src={'/img/study.png'} />{' '}
                </div>
                <div className={'text'}>
                  <span>{text.board}</span>
                  <span>{1}</span>
                </div>
              </div>
              <div className={'column item'}>
                <div className={'icon'}>
                  <Img src={'/img/study.png'} />{' '}
                </div>
                <div className={'text'}>
                  <span>{text.like}</span>
                  <span>{2}</span>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
      {resume(text.resume.spec)}
      {resume(text.resume.give)}
      {resume(text.resume.got)}
      <Review />
    </div>
  );

  return (
    <BasicModal preBtn big visible={true} contents={component}>
      {component}
    </BasicModal>
  );
}
