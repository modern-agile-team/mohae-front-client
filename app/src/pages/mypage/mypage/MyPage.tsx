/** @format */

import { useParams } from 'react-router-dom';
import {
  get_user_info,
  setInitialState as setInitialStateMypageProfile,
} from '../../../redux/mypage/reducer';
import Presenter from './Presenter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/root';
import {
  get_user_specs,
  get_user_tohelp,
  get_user_helpme,
  setInitialState as setInitialStateSpecData,
} from '../../../redux/spec/reducer';
import { useGetRequest } from '../../../redux/axios';
import getToken from '../../../utils/getToken';
import { useEffect } from 'react';

export default function MyPage() {
  const SPEC = `specs/profile?`;
  const BOARDS = `boards/profile?`;
  const target = {
    0: '&target=false',
    // 받을래요
    1: '&target=true',
    // 해줄래요
  };
  const actions = {
    specs: get_user_specs,
    toHelp: get_user_tohelp,
    helpMe: get_user_helpme,
  };
  const TOKEN = getToken();
  const tokenInfo = useSelector((state: RootState) => state.user.user);
  const userNo = TOKEN !== '' && String(tokenInfo.userNo);
  const paramNo = useParams().no;
  const checkSelf = String(userNo === paramNo);
  const take: any = {
    true: 5,
    false: 8,
  };
  const userInfo = useSelector((state: RootState) => state.mypage.user.profile);
  const posts = useSelector((state: RootState) => state.spec);
  const dispatch = useDispatch();
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

  useEffect(() => {
    return () => {
      dispatch(setInitialStateSpecData());
      dispatch(setInitialStateMypageProfile());
    };
  }, []);

  useGetRequest(
    `${SPEC}user=${paramNo}&take=${take[checkSelf]}&page=1`,
    TOKEN,
    get_user_specs,
  );
  useGetRequest(
    `${BOARDS}user=${paramNo}&take=${take[checkSelf]}&page=1${target[1]}`,
    TOKEN,
    get_user_tohelp,
  );
  useGetRequest(
    `${BOARDS}user=${paramNo}&take=${take[checkSelf]}&page=1${target[0]}`,
    TOKEN,
    get_user_helpme,
  );
  useGetRequest(`profile/${paramNo}`, TOKEN, get_user_info);
  return (
    <Presenter
      text={text}
      userInfo={userInfo && userInfo}
      posts={posts}
      actions={actions}
      checkSelf={checkSelf}
    />
  );
}
