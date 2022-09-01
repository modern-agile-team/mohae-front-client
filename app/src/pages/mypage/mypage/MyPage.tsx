/** @format */

import { useParams } from 'react-router-dom';
import {
  get_user_info,
  setInitialState as setInitialStateMypageProfile,
} from '../../../redux/mypage/reducer';
import Presenter from './Presenter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/root';
import {
  get_user_specs,
  get_user_tohelp,
  get_user_helpme,
  getSpecs,
  setInitialState as setInitialStateSpecData,
} from '../../../redux/spec/reducer';
import { BoardGetRequest } from '../../../redux/axios';
import getToken from '../../../utils/getToken';
import { useEffect } from 'react';
import { post } from '../../../redux/post/reducer';
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
  const userInfo = useSelector((state: RootState) => state.user.user);
  const userNo = TOKEN !== '' && String(userInfo.userNo);
  const paramNo = useParams().no;
  const checkSelf = String(userNo === paramNo);
  const take: any = {
    true: 5,
    false: 8,
  };
  const posts = useSelector((state: RootState) => state.spec);
  const dispatch = useDispatch<AppDispatch>();

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
      got: '구할래요 이력',
    },
    rating: '총 평점',
  };

  useEffect(() => {
    dispatch(getSpecs({ paramNo, takeParam: take[checkSelf] }));
    return () => {
      dispatch(setInitialStateSpecData());
      dispatch(setInitialStateMypageProfile());
    };
  }, []);

  const getSpec = () => {
    BoardGetRequest(
      `${SPEC}user=${paramNo}&take=${take[checkSelf]}&page=1`,
      TOKEN,
      get_user_specs,
    );
  };

  const getFindBoard = () => {
    BoardGetRequest(
      `${BOARDS}user=${paramNo}&take=${take[checkSelf]}&page=1${target[1]}`,
      TOKEN,
      get_user_tohelp,
    );
  };
  const getDoitBoard = () => {
    BoardGetRequest(
      `${BOARDS}user=${paramNo}&take=${take[checkSelf]}&page=1${target[0]}`,
      TOKEN,
      get_user_helpme,
    );
  };

  return (
    <Presenter
      text={text}
      posts={posts}
      actions={actions}
      checkSelf={checkSelf}
    />
  );
}
