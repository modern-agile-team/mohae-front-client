/** @format */

import { css, cx } from '@emotion/css';

import {
  Img,
  Box,
  Profile,
  Category,
  BasicModal,
  Btn,
} from '../../../../components';

import { Slide } from './index';
import { useSelector } from 'react-redux';
import { MyPageProps } from '../../../../types/myPage/myPage';
import { RootState } from '../../../../redux/root';

export default function OtherPage({ posts, actions, checkSelf }: MyPageProps) {
  const userInfo = useSelector((state: RootState) => state.user.user);
  const interestedCategories =
    userInfo &&
    userInfo.categories &&
    userInfo.categories.map((category: any, index: number) => (
      <Category key={index} shape={'row'} name={category.name} />
    ));

  return (
    <BasicModal big visible={true}>
      <div className={cx(style)}>
        <div className="header">
          <Profile size={150} />
          <div>
            <div className="row title">
              <div className={'row sub-title'}>
                <div className={'name'}>{userInfo && userInfo.nickname}</div>
                <div className={'sir'}>님</div>
                <div className={'row sub-title'}>{interestedCategories}</div>
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
                    <span>{`게시물 ${userInfo && userInfo.boardNum}`}</span>
                  </div>
                </div>
                <div className={'column item'}>
                  <div className={'icon'}>
                    <Img src={'/img/heart-main.png'} />
                  </div>
                  <div className={'text'}>
                    <span>{`좋아요 ${userInfo && userInfo.likedUserNum}`}</span>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
        <div className={'boards'}>
          <div className={'section'}>
            <div className={'title'}>{'내 스펙 관리'}</div>
            <Slide
              outsideBtn
              viewNumber={4}
              items={posts.profileSpecs}
              action={actions.specs}
              marginRight={16}
              checkSelf={checkSelf}
            />
          </div>
          <div className={'section'}>
            <div className={'title'}>{'해줄래요 이력'}</div>
            <Slide
              outsideBtn
              viewNumber={4}
              items={posts.profileToHelp}
              action={actions.toHelp}
              marginRight={16}
              checkSelf={checkSelf}
            />
          </div>
          <div className={'section'}>
            <div className={'title'}>{'받을래요 이력'}</div>
            <Slide
              outsideBtn
              viewNumber={4}
              items={posts.profileHelpMe}
              action={actions.helpMe}
              marginRight={16}
              checkSelf={checkSelf}
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
      height: 23px;
      justify-content: space-between;
      margin-bottom: 16px;
      .sub-title {
        > * :not(:last-child) {
          margin-right: 8px;
        }
      }
      .name {
        font-weight: 700;
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
    .item {
      width: 120px;
      .icon {
        margin-bottom: 8px;
        width: 30px;
        height: 30px;
        :hover {
          cursor: pointer;
        }
      }
    }
    .text {
      > :not(:last-child) {
        margin-right: 4px;
      }
    }
  }
  > .boards {
    .section {
      height: 216px;
      /* overflow: visible; */
      > .slide {
        height: calc(100% - 23px - 16px);
      }
      > .title {
        height: 23px;
        font-size: 16px;
        margin-bottom: 16px;
      }
      margin-bottom: 32px;
    }
  }
`;
