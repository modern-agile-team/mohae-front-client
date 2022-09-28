import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { decodeToken } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInitialState as setInitialPostState,
  setIsDeadline,
  setPostData,
} from '../../redux/post/reducer';
import getToken from '../../utils/getToken';
import { RootState } from '../../redux/root';
import EmptySpinner from '../../components/emptySpinner/EmptySpinner';
import setInterceptors from '../../apis/common/setInterceptors';
import { customAxios } from '../../apis/instance';
import { open_login } from '../../redux/modal/reducer';
import { setInitialState as setInitialCommentState } from '../../redux/comment/reducer';
import { Btn, Popup } from '../../components';
import { css, cx } from '@emotion/css';

export interface Props {
  data: {
    date: string;
    msg: string;
    token: string;
    decoded: Decoded;
    response: Response;
  };
}

interface Decoded {
  email: string;
  exp: number;
  expiration: string;
  iat: number;
  issuer: string;
  nickname: string;
  photoUrl: string;
  userNo: number;
}

interface Response {
  authorization: boolean;
  board: Board;
}

export interface Board {
  areaName: string;
  areaNo: number;
  boardPhotoUrls: string | null;
  categoryName: string;
  categoryNo: number;
  decimalDay: number | null;
  description?: string;
  hit: number;
  createdAt: string;
  endDate: string | null;
  deadline: number;
  isDeadline: number;
  isLike?: boolean | null | number;
  likeCount: number;
  majorName: string;
  nickname: string;
  no: number;
  price: number;
  summary: null | string;
  target: number;
  title: string;
  userNo: number;
  userPhotoUrl: string;
}

function Post() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { no } = useParams();
  const dispatch = useDispatch();
  const token = getToken() || null;
  const decoded = useSelector((state: RootState) => state.user.user);
  const [view, setView] = useState<{ [key: string]: boolean }>({
    report: false,
    isDeadline: false,
  });
  const loading = useSelector((state: RootState) => state.post.loading);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [runOutRefreshToken, setRunOutRefreshToken] = useState(false);
  const location = useLocation();

  const btnClick = {
    redirectBoard: () => window.location.replace('/boards/categories/1'),
    opneLoginModal: () => dispatch(open_login(true)),
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getPostingData = async () => {
    try {
      await setInterceptors(customAxios)
        .get(`boards/${no}`, config)
        .then(res => {
          const visitor = res.data.msg
            .replace(/[^회원|^비회원]/g, '')
            .substring(1, 4);
          dispatch(
            setPostData({
              ...res.data,
              msg: visitor,
              decoded: decoded,
              token: token,
            }),
          );
        });
    } catch (err: any) {
      if (err.response.status === 410 || err.response.status === 401) {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        window.location.replace(location.pathname);
        setRunOutRefreshToken(true);
      }
    }
  };

  useEffect(() => {
    getPostingData();
    return () => {
      dispatch(setInitialPostState());
      dispatch(setInitialCommentState());
    };
  }, []);

  const requestHandleDeadline = (data: Board) => {
    const URL = !data.isDeadline ? `boards/close/${no}` : `boards/cancel/${no}`;

    const date = new Date().toISOString();
    if (data.endDate && data.endDate < date) {
      return;
    } else {
      setInterceptors(customAxios)
        .patch(URL, null, config)
        .then(res => {
          setView({ ...view, isDeadline: true });
          getPostingData();
        })
        .catch(err => console.log('err', err));
    }
  };

  const returnComp = () => {
    return !loading ? (
      <Presenter
        redirectLogin={redirectLogin}
        setRedirectLogin={setRedirectLogin}
        view={view}
        setView={(str: string) => {
          setView({ ...view, [str]: !view[str] });
        }}
        requestHandleDeadline={requestHandleDeadline}
      />
    ) : (
      <>
        <EmptySpinner loading />
        <Popup
          visible={redirectLogin}
          text1={'로그인 후 이용 부탁드립니다.'}
          overlay={() => btnClick.redirectBoard()}
        >
          <div className={cx(popupBtn)}>
            <Btn white onClick={btnClick.redirectBoard}>
              닫기
            </Btn>
          </div>
          <div className={cx(popupBtn)}>
            <Btn main onClick={btnClick.opneLoginModal}>
              로그인
            </Btn>
          </div>
        </Popup>
      </>
    );
  };

  return <>{returnComp()}</>;
}

export default Post;

const popupBtn = css`
  width: 100px;
  height: 43px;
`;
