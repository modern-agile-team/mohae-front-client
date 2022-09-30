import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, Img } from '../../components';
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
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isLikeState, setIsLikeState] = useState(isLike);

  const body = (prevIsLikeState: number | boolean | null | undefined) => {
    return {
      judge: !prevIsLikeState,
    };
  };

  useEffect(() => {
    setIsLikeState(isLike);
  }, [isLike]);

  const header = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const debouncingRequest = async (
    prevIsLikeState: number | boolean | null | undefined,
  ) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      try {
        await setInterceptors(customAxios)
          .post(
            `https://mo-hae.site/like/board/${no}`,
            body(prevIsLikeState),
            header,
          )
          .then(_ => {
            dispatch(setIsLike(!prevIsLikeState));
            !prevIsLikeState
              ? dispatch(plusLikeCount(likeCount + 1))
              : dispatch(minusLikeCount(likeCount - 1));
          });
      } catch (e) {
        console.error('error', e);
      }
    }, 800);
    setTimer(newTimer);
  };

  const handleLikeButtonClick = () => {
    setIsLikeState(prev => {
      debouncingRequest(prev);
      return !prev;
    });
  };

  const createLikeBtnUI = () => {
    return token !== null ? (
      <Btn white onClick={handleLikeButtonClick}>
        <div className="imgWrap">
          <Img
            src={
              !isLike || !isLikeState
                ? '/img/heart-main.png'
                : '/img/heart-filled-main.png'
            }
          />
        </div>
      </Btn>
    ) : (
      <Btn white disable>
        <div className="imgWrap">
          <Img src="/img/heart-light1.png" />
        </div>
      </Btn>
    );
  };

  const createReportBtnUI = () => {
    return token === null ||
      (decoded && decoded.userNo === response.board.userNo) ? (
      <Btn white disable>
        <div className="imgWrap">
          <Img src="/img/report-light1.png" />
        </div>
      </Btn>
    ) : (
      <Btn white onClick={() => close()}>
        <div className="imgWrap">
          <Img src="/img/report-main.png" />
        </div>
      </Btn>
    );
  };

  return (
    <div className={cx(style)}>
      <div className="btnWrap">{createLikeBtnUI()}</div>
      <div className="btnWrap">{createReportBtnUI()}</div>
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
