/** @format */

import { css, cx } from '@emotion/css';
import { color, font } from '../../styles';

import { Img, Box, Profile, Category, BasicModal, Btn } from '../index';

import Slide from '../../pages/mypage/mypage/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { useGetRequest } from '../../redux/axios';
import decodingToken from '../../utils/decodingToken';
import getToken from '../../utils/getToken';
import { useCallback, useEffect, useMemo, useState } from 'react';
import setInterceptors from '../../apis/common/setInterceptors';
import { customAxios } from '../../apis/instance';
import {
  get_user_helpme,
  get_user_specs,
  get_user_tohelp,
} from '../../redux/spec/reducer';
import { get_user_info, setInitialState } from '../../redux/mypage/reducer';

interface Props {
  userNo: number;
  view: boolean;
}

export default function ModalProfile(props: Props) {
  const { userNo, view } = props;
  const userInfo = useSelector((state: RootState) => state.mypage.user.profile);
  const posts = useSelector((state: RootState) => state.spec);
  const dispatch = useDispatch();
  const userInfoInToken = decodingToken();
  const token = getToken() || null;
  const checkSelf = String(userInfoInToken?.userNo === userNo);
  const take: any = {
    true: 5,
    false: 8,
  };
  const actions = {
    specs: 'get_user_specs',
    toHelp: 'get_user_tohelp',
    helpMe: 'get_user_helpme',
  };
  const text: { [key: string]: any } = {
    sir: '님',
    registerDate: '가입일 :',
    logout: '로그아웃',
    interesting: '관심사',
    boards: '게시물',
    like: '좋아요',
    resume: {
      spec: '내 스펙 관리',
      give: '해줄래요 이력',
      got: '받을래요 이력',
    },
    rating: '총 평점',
  };
  const interestedCategories =
    userInfo !== null &&
    userInfo.categories.map((category: any, index: number) => (
      <Category key={index} shape={'row'} name={category.name} />
    ));

  const body = {
    likedUserNo: userInfoInToken?.userNo,
    judge: userInfo?.isLike,
  };

  const config = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const handleIsLike = () => {
    const newUserProfileInfo = {
      ...userInfo,
      isLike: !userInfo?.isLike,
    };
    dispatch(get_user_info(newUserProfileInfo));
  };

  const handleLikeCount = () => {
    const newUserProfileInfo = {
      ...userInfo,
      likedUserNum: userInfo?.isLike
        ? String(Number(userInfo?.likedUserNum) + 1)
        : String(Number(userInfo?.likedUserNum) - 1),
    };
    dispatch(get_user_info(newUserProfileInfo));
  };

  useEffect(() => {
    if (token !== null) {
      const debounceAxios = setTimeout(() => {
        setInterceptors(customAxios)
          .post(`https://mo-hae.site/like/user`, body, config)
          .then(res => handleLikeCount())
          .catch(err => err);
      }, 300);
      return () => clearTimeout(debounceAxios);
    }
  }, [userInfo?.isLike]);

  useEffect(() => {
    setInterceptors(customAxios)
      .get(
        `specs/profile?user=${userNo}&take=${take[checkSelf]}&page=1`,
        config,
      )
      .then(res => dispatch(get_user_specs(res.data.response)));

    setInterceptors(customAxios)
      .get(
        `boards/profile?user=${userNo}&take=${take[checkSelf]}&page=1&target=false`,
        config,
      )
      .then(res => dispatch(get_user_tohelp(res.data.response)));

    setInterceptors(customAxios)
      .get(
        `boards/profile?user=${userNo}&take=${take[checkSelf]}&page=1&target=true`,
        config,
      )
      .then(res => dispatch(get_user_helpme(res.data.response)));

    setInterceptors(customAxios)
      .get(`profile/${userNo}`, config)
      .then(res => dispatch(get_user_info(res.data.response)));

    return () => {
      dispatch(setInitialState());
    };
  }, []);

  return (
    <BasicModal big visible={view}>
      <div className={cx(style)}>
        <div className="header">
          <Profile
            img={'https://d2ffbnf2hpheay.cloudfront.net/' + userInfo?.photo_url}
            size={150}
            noneClick
          />
          <div>
            <div className="row title">
              <div className={'row sub-title'}>
                <div className={'name'}>{userInfo && userInfo.nickname}</div>
                <div className={'sir'}>{text.sir}</div>
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
                    <span>{`${text.boards} ${
                      userInfo && userInfo.boardNum
                    }`}</span>
                  </div>
                </div>
                <div className={'column item'}>
                  <div className={'icon'} onClick={handleIsLike}>
                    <Img
                      src={
                        userInfo?.isLike
                          ? '/img/heart-filled-main.png'
                          : '/img/heart-main.png'
                      }
                    />
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
        font-family: Bold;
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
