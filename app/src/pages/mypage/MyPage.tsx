/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
import {
  Img,
  Poster,
  NewPost,
  Box,
  Profile,
  FocusBar,
  Category,
} from '../../components';

export default function MyPage() {
  const text: { [key: string]: any } = {
    sir: '님',
    registerDate: '가입일 :',
    logout: '로그아웃',
    interesting: '관심사',
    resume: {
      spec: '내 스펙 관리',
      give: '해줄래요 이력',
      got: '받을래요 이력',
    },
    rating: '총 평점',
  };
  const [num, setNum] = useState(100);
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
      .box {
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
        justify-content: space-between;
        align-items: center;
      }
      > .boards {
        width: 748px;
        height: fit-content;

        > :not(:last-child) {
          margin-bottom: 32px;
        }
        .section {
          width: 100%;
          height: fit-content;
          > .title {
            color: ${color.dark1};
            ${font.weight[700]}
            line-height: 170%;
            margin-bottom: 16px;
          }
          .slide {
            width: 100%;
            height: 177px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }

    > .review {
      width: 100%;
      height: fit-content;
      margin-bottom: 64px;
      .score {
        color: ${color.main};
        margin: 0 4px;
      }
      .title {
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        * {
          ${font.weight[700]}
        }
        .star {
          width: 30px;
          height: 30px;
          margin-right: 8px;
        }
        .number {
          color: ${color.dark3};
        }
      }
      .each {
        width: 100%;
        height: fit-content;
        margin: 32px 0;
        display: flex;
        justify-content: space-between;
        .profile {
          width: fit-content;
          display: flex;
          width: 931px;
          margin-bottom: 16px;
        }
        .info-box {
          margin-left: 16px;
        }
        .name {
          width: fit-content;
          ${font.weight[700]}
          font-size: 14px;
        }
        .stars {
          justify-content: flex;
          flex-direction: row;
          align-items: center;
          height: 20px;
          > :not(:last-child) {
            margin-right: 4px;
          }
          * {
            display: inline-block;
            width: 20px;
            height: 20px;
          }
        }
        .description {
          display: flex;
          width: 100%;
          padding-right: 24px;
          height: 69px;
          font-size: 14px;
          overflow: hidden;
        }
      }
    }
  `;

  return (
    <div className={cx(style)}>
      <div className={'user'}>
        <Box className={'box'} size={[304, 724]}>
          <div className={'name'}>
            <div>{'모던 애자일'}</div>
            <div>{text.sir}</div>
          </div>
          <div className={'profile'}>
            <Profile img={null} size={146} />
          </div>
          <div className={'register'}>
            <div>{text.registerDate}</div>
            <div className={'date'}>{'2022.01.01'}</div>
          </div>
          <button className={'logout'}>{text.logout}</button>
          <div className={'privacy'}>
            <div className={'item'}>
              <Img src={'/img/post.png'} />
              <span>{`${'하하하'} ${123}`}</span>
            </div>
            <div className={'item'}>
              <Img src={'/img/heart-main.png'} />
              <span>{`${'하하하'} ${123}`}</span>
            </div>
            <div className={'item'}>
              <Img src={'/img/heart-main.png'} />
              <span>{`${'하하하'} ${123}`}</span>
            </div>
            <div className={'item'}>
              <Img src={'/img/heart-main.png'} />
              <span>{`${'하하하'} ${123}`}</span>
            </div>
          </div>
          <FocusBar thin light3 />
          <div className={'interest'}>{text.interesting}</div>
          <div className={'categories'}>
            <Box size={[80, 80]}>
              <Category
                shape={'square'}
                img={'/img/heart-main.png'}
                name={'카테1'}
              />
            </Box>
            <Box size={[80, 80]}>
              <Category
                shape={'square'}
                img={'/img/heart-main.png'}
                name={'카테2'}
              />
            </Box>
            <Box size={[80, 80]}>
              <Category
                shape={'square'}
                img={'/img/heart-main.png'}
                name={'카테3'}
              />
            </Box>
          </div>
        </Box>
        <div className={'boards'}>
          <div className={'section'}>
            <div className={'title'}>{text.resume.spec}</div>
            <div className={'slide'}>
              <Box size={[228, 177]}>
                <NewPost page={'inSpec'} />
              </Box>
              <Box size={[228, 177]}></Box>
              <Box size={[228, 177]}></Box>
            </div>
          </div>
          <div className={'section'}>
            <div className={'title'}>{text.resume.give}</div>
            <div className={'slide'}>
              <Box size={[228, 177]}></Box>
              <Box size={[228, 177]}></Box>
              <Box size={[228, 177]}></Box>
            </div>
          </div>
          <div className={'section'}>
            <div className={'title'}>{text.resume.got}</div>
            <div className={'slide'}>
              <Box size={[228, 177]}></Box>
              <Box size={[228, 177]}></Box>
              <Box size={[228, 177]}></Box>
            </div>
          </div>
        </div>
      </div>
      <div className={'review'}>
        <div className={'title'}>
          <div className={'star'}>
            <Img src={'/img/star-filled.png'} />
          </div>
          <div className={'rating'}>{text.rating}</div>
          <div className={'score'}>{'3.0'}</div>
          <div className={'number'}>{`(${3})`}</div>
        </div>
        <FocusBar thin light3 />
        <div className={'each'}>
          <div className={'column'}>
            <div className={'profile'}>
              <Profile size={45} isLogin={false} />
              <div className={'info-box'}>
                <div className={'name'}>{'이름입니다'}</div>
                <div className={'stars'}>
                  <Img src={'/img/star-filled.png'} />
                  <Img src={'/img/star-filled.png'} />
                  <Img src={'/img/star-filled.png'} />
                  <Img src={'/img/star-filled.png'} />
                  <Img src={'/img/star-filled.png'} />
                </div>
              </div>
            </div>
            <div className={'description'}></div>
          </div>
          <Poster inReview title={'123'} />
        </div>
        <FocusBar thin light3 />
        <div className={'each'}>
          <div className={'column'}>
            <div className={'profile'}>
              <Profile size={45} isLogin={false} />
              <div className={'info-box'}>
                <div className={'name'}>{'이름입니다'}</div>
                <div className={'stars'}>
                  <Img src={'/img/star-filled.png'} />
                  <Img src={'/img/star-filled.png'} />
                  <Img src={'/img/star-filled.png'} />
                  <Img src={'/img/star-filled.png'} />
                  <Img src={'/img/star-filled.png'} />
                </div>
              </div>
            </div>

            <div className={'description'}>
              {
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati quaerat et nesciunt suscipit quis iusto, aperiam harum iste, excepturi illum officia facilis modi debitis esse provident consequatur, similique quasi ipsum.or sit amet consectetur adipisicing elit. Obcaecati quaerat et nesciunt suscipit quis iusto, aperiam harum iste, excepturi illum officia facilis modi debitis esse provident consequatur, similique quasi ipsum'
              }
            </div>
          </div>
          <Poster inReview title={'123'} />
        </div>
        <FocusBar thin light3 />
      </div>
    </div>
  );
}
