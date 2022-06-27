/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../../styles';

import {
  Img,
  Box,
  Profile,
  Category,
  BasicModal,
  Btn,
} from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/root';
import Slide from './Slide';

interface Props {
  [key: string]: any;
}

export default function OtherPage({ text, userInfo, posts, actions }: Props) {
  // console.log(`text`, text);
  // console.log('userInfo :>> ', userInfo);
  // console.log('posts :>> ', posts);
  // console.log('actions :>> ', actions);
  const interestedCategories = (
    <div className={'row sub-title'}>
      <Category shape={'row'} name={'카테 1'} />

      <Category shape={'row'} name={'카테 2'} />

      <Category shape={'row'} name={'카테 3'} />
    </div>
  );

  return (
    <BasicModal preBtn big visible={true}>
      <div className={cx(style)}>
        <div className="header">
          <Profile size={150} />
          <div>
            <div className="row title">
              <div className={'row sub-title'}>
                <div className={'name'}>{'모던 애자일'}</div>
                <div className={'sir'}>{text.sir}</div>
                {interestedCategories}
              </div>
              <div className={'row btns'}>
                <div>
                  <Btn white>
                    <Img src={'/img/report-main.png'} />
                  </Btn>
                </div>
              </div>
            </div>
            <Box size={[768, 90]}>
              <div className={'row info-box '}>
                <div className={'column item'}>
                  <div className={'icon'}>
                    <Img src={'/img/university.png'} />
                  </div>
                  <span>{(userInfo && userInfo.schoolName) || '-'}</span>
                </div>
                <div className={'column item'}>
                  <div className={'icon'}>
                    <Img src={'/img/study.png'} />
                  </div>
                  <span>{(userInfo && userInfo.majorName) || '-'}</span>
                </div>
                <div className={'column item'}>
                  <div className={'icon'}>
                    <Img src={'/img/post.png'} />
                  </div>
                  <div className={'text'}>
                    <span>{`${text.boards} ${
                      userInfo && userInfo.boardNum
                    }`}</span>
                  </div>
                </div>
                <div className={'column item'}>
                  <div className={'icon'}>
                    <Img src={'/img/heart-main.png'} />
                  </div>
                  <div className={'text'}>
                    <span>{`${text.like} ${
                      userInfo && userInfo.likedUserNum
                    }`}</span>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
        <div className={'boards'}>
          <div className={'section'}>
            <div className={'title'}>{'SPEC'}</div>
            <Slide
              outsideBtn
              items={posts.profileSpecs}
              action={actions.specs}
            />
          </div>
          <div className={'section'}>
            <div className={'title'}>{'TOHELP'}</div>
            <Slide
              outsideBtn
              items={posts.profileToHelp}
              action={actions.toHelp}
            />
          </div>
          <div className={'section'}>
            <div className={'title'}>{'HELPME'}</div>
            <Slide
              outsideBtn
              items={posts.profileHelpMe}
              action={actions.helpMe}
            />
          </div>
        </div>
      </div>
    </BasicModal>
  );
}

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
      .sub-title {
        > * :not(:last-child) {
          margin-right: 8px;
        }
      }
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
          > button {
            padding: 12px;
          }
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
      .icon {
        margin-bottom: 8px;
      }
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
