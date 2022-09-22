/** @format */

import { useParams } from 'react-router-dom';
import { setInitialState as setInitialStateMypageProfile } from '../../../redux/mypage/reducer';
import Presenter from './Presenter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/root';
import {
  get_user_specs,
  get_user_tohelp,
  get_user_helpme,
  getSpecs,
  setInitialState as setInitialStateSpecData,
  getFindSpecs,
} from '../../../redux/spec/reducer';
import getToken from '../../../utils/getToken';
import { useEffect } from 'react';

export default function MyPage() {
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
  const isOpenSpecVisit = useSelector(
    (state: RootState) => state.modal.openSpecVisit,
  );
  const openSpecCreate = useSelector(
    (state: RootState) => state.modal.openSpecCreate,
  );

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
    dispatch(
      getFindSpecs({ paramNo, takeParam: take[checkSelf], target: target[1] }),
    );

    return () => {
      dispatch(setInitialStateSpecData());
      dispatch(setInitialStateMypageProfile());
    };
  }, []);

  useEffect(() => {
    if (!isOpenSpecVisit || !openSpecCreate)
      dispatch(getSpecs({ paramNo, takeParam: take[checkSelf] }));
  }, [isOpenSpecVisit, openSpecCreate]);

  return (
    <Presenter
      text={text}
      posts={posts}
      actions={actions}
      checkSelf={checkSelf}
    />
  );
}
