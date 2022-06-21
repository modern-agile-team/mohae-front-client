/** @format */

import { useState, useEffect, Suspense } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../../styles';
import Review from '../Review';
import Slide from './Slide';
import { Img, Box, Profile, FocusBar, Category } from '../../../components';

interface Props {
  [key: string]: any;
}

export default function MyPage({ text, userInfo }: Props) {
  const style = css`
    width: 100%;
    height: fit-content;

    > .column {
      display: flex;
      flex-direction: column;
    }

    > .user {
      display: flex;
      width: 100%;
      justify-content: space-between;
      height: fit-content;
      margin: 40px 0 64px;
      > .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px 24px 73px;
        .name {
          padding-bottom: 24px;
          width: fit-content;
          * {
            display: inline-block;
          }
          > :nth-child(1) {
            font-size: 22px;
            line-height: 170%;
            ${font.weight[700]}
          }
        }
        .profile {
          padding-bottom: 16px;
        }

        .register {
          * {
            display: inline-block;
          }
          padding-bottom: 16px;
          font-size: 12px;
          color: ${color.dark3};
        }
        .date {
          margin-left: 4px;
        }
      }
      .logout {
        font-size: 12px;
        color: ${color.dark3};
        padding-bottom: 32px;
      }
      .privacy {
        width: 100%;
        height: fit-content;
        padding: 0 calc(56px - 24px) 32px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        > :first-child {
          margin-bottom: 24px;
        }
        .item {
          width: 80px;
          height: 52px;
          color: ${color.dark1};
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          line-height: 170%;
        }
      }
      .interest {
        padding: 32px 0 16px;
        font-size: 14px;
        ${font.weight[700]}
      }
      .categories {
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        > :not(:last-child) {
          margin-right: 8px;
        }
      }
      > .boards {
        width: 748px;
        height: fit-content;

        > :not(:last-child) {
          margin-bottom: 32px;
        }
        > .section {
          width: 100%;
          height: fit-content;
          > .title {
            color: ${color.dark1};
            ${font.weight[700]}
            line-height: 170%;
            margin-bottom: 16px;
          }
          > .slide {
            width: 100%;
            height: 177px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  `;

  // console.log('userInfo :>> ', userInfo);

  const interested =
    userInfo &&
    userInfo.categories.map((category: any, index: number) => (
      <Box key={index} size={[80, 80]}>
        <Category
          shape={'square'}
          img={`/img/category-${category.no - 1}.png`}
          name={category.name}
        />
      </Box>
    ));

  return (
    <div className={cx(style)}>
      <div className={'user'}>
        <Box className={'box'} size={[304, 724]}>
          <div className={'name'}>
            <div>{userInfo && userInfo.nickname}</div>
            <div>{text.sir}</div>
          </div>
          <div className={'profile'}>
            <Profile img={null} size={146} />
          </div>
          <div className={'register'}>
            <div>{text.registerDate}</div>
            <div className={'date'}>{userInfo && userInfo.createdAt}</div>
          </div>
          <button className={'logout'}>{text.logout}</button>
          <div className={'privacy'}>
            <div className={'item'}>
              <Img src={'/img/post.png'} />
              <span>{`${text.boards} ${userInfo && userInfo.boardNum}`}</span>
            </div>
            <div className={'item'}>
              <Img src={'/img/heart-main.png'} />
              <span>{`${text.like} ${userInfo && userInfo.likedUserNum}`}</span>
            </div>
            <div className={'item'}>
              <Img src={'/img/university.png'} />
              <span>{userInfo && userInfo.schoolName}</span>
            </div>
            <div className={'item'}>
              <Img src={'/img/study.png'} />
              <span>{userInfo && userInfo.majorName}</span>
            </div>
          </div>
          <FocusBar thin light />
          <div className={'interest'}>{text.interesting}</div>
          <div className={'categories'}>{interested}</div>
        </Box>
        <div className={'boards'}>
          <div className={'section'}>
            <div className={'title'}>{text.resume.spec}</div>
            <Slide outsideBtn spec />
          </div>
          <div className={'section'}>
            <div className={'title'}>{text.resume.give}</div>
            <Slide outsideBtn spec />
          </div>
          <div className={'section'}>
            <div className={'title'}>{text.resume.got}</div>
            <Slide outsideBtn spec />
          </div>
        </div>
      </div>
    </div>
  );
}
