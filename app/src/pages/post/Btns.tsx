import React, { useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, Img } from '../../components';
import axios from 'axios';
import { Props } from './Container';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  minusLikeCount,
  plusLikeCount,
  setIsLike,
} from '../../redux/post/reducer';
import { RootState } from '../../redux/root';
import getToken from '../../utils/getToken';
import setInterceptors from '../../apis/common/setInterceptors';
import { customAxios } from '../../apis/instance';

interface BtnsProps {
  close: () => void;
}

function Btns(props: BtnsProps) {
  const { close } = props;
  const { no } = useParams();
  const dispatch = useDispatch();
  const { isLike, likeCount } = useSelector(
    (state: RootState) => state.post.data.response.board,
  );
  const { decoded, response } = useSelector(
    (state: RootState) => state.post.data,
  );
  const token = getToken() || null;

  const body = JSON.stringify({
    judge: isLike,
  });

  const header = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const onClick = {
    like: () => {
      dispatch(setIsLike(!isLike));
    },
    report: () => {
      close();
    },
  };

  const handleLikeCount = () => {
    isLike
      ? dispatch(plusLikeCount(likeCount + 1))
      : dispatch(minusLikeCount(likeCount - 1));
  };

  useEffect(() => {
    if (token !== null) {
      const debounceAxios = setTimeout(() => {
        setInterceptors(customAxios)
          .post(`https://mo-hae.site/like/board/${no}`, body, header)
          .then(res => {
            handleLikeCount();
          })
          .catch(err => err);
      }, 300);
      return () => clearTimeout(debounceAxios);
    }
  }, [isLike]);

  const btnImg = {
    like: () => {
      if (token !== null) {
        return (
          <Btn white onClick={() => onClick.like()}>
            <div className="imgWrap">
              <Img
                src={
                  !isLike ? '/img/heart-main.png' : '/img/heart-filled-main.png'
                }
              />
            </div>
          </Btn>
        );
      } else
        return (
          <Btn white disable>
            <div className="imgWrap">
              <Img src="/img/heart-light1.png" />
            </div>
          </Btn>
        );
    },

    report: () => {
      return token === null ||
        (decoded && decoded.userNo === response.board.userNo) ? (
        <Btn white disable>
          <div className="imgWrap">
            <Img src="/img/report-light1.png" />
          </div>
        </Btn>
      ) : (
        <Btn white onClick={() => onClick.report()}>
          <div className="imgWrap">
            <Img src="/img/report-main.png" />
          </div>
        </Btn>
      );
    },
  };

  return (
    <div className={cx(style)}>
      <div className="btnWrap">{btnImg.like()}</div>
      <div className="btnWrap">{btnImg.report()}</div>
    </div>
  );
}

export default Btns;

const style = css`
  display: flex;
  justify-content: space-between;
  width: 128px;
  .btnWrap {
    width: 60px;
    height: 60px;
  }
  .imgWrap {
    width: 32px;
    height: 32px;
  }
`;
