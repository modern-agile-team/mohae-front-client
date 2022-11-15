/** @format */

import { useParams } from 'react-router-dom';
import { setInitialState as setInitialStateMypageProfile } from '../../redux/mypage/reducer';
import { Presenter } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/root';
import {
  get_user_specs,
  get_user_tohelp,
  get_user_helpme,
  getSpecs,
  setInitialState as setInitialStateSpecData,
  getFindSpecs,
} from '../../redux/spec/reducer';
import getToken from '../../utils/getToken';
import { useEffect } from 'react';
import { ACCESS_TOKEN } from '../../consts/tokenKey';

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
  const TOKEN = getToken(ACCESS_TOKEN);
  const userInfo = useSelector((state: RootState) => state.user.user);
  const isOpenSpecVisit = useSelector(
    (state: RootState) => state.specModal.openSpecVisit,
  );
  const openSpecCreate = useSelector(
    (state: RootState) => state.specModal.openSpecCreate,
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

  return <Presenter posts={posts} actions={actions} checkSelf={checkSelf} />;
}
