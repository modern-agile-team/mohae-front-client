import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Img, WhiteButton } from '../../../../components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  minusLikeCount,
  plusLikeCount,
  setIsLike,
} from '../../../../redux/post/reducer';
import { RootState } from '../../../../redux/root';
import styled from '@emotion/styled';
import { requestPostLike } from '../../../../apis/post';
import { handelReportModal } from '../../../../redux/modal/reducer';

function Btns() {
  const { no } = useParams();
  const dispatch = useDispatch();
  const localUserNo = useSelector((state: RootState) => state.user.user.userNo);
  const { authorization, board } = useSelector(
    (state: RootState) => state.post.data.response,
  );
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isLikeState, setIsLikeState] = useState(board.isLike);

  const likeButtonImg = useMemo(() => {
    if (authorization) {
      return !board.isLike || !isLikeState
        ? '/img/heart-main.png'
        : '/img/heart-filled-main.png';
    } else return '/img/heart-light1.png';
  }, [board.isLike]);

  const reportButtonState = useMemo(() => {
    return authorization && localUserNo !== board.userNo
      ? { img: '/img/report-main.png', able: true }
      : { img: '/img/report-light1.png', able: false };
  }, []);

  const handleReportButtonClick = useCallback(() => {
    if (authorization && localUserNo !== board.userNo)
      return dispatch(handelReportModal('board'));
    else return;
  }, []);

  useEffect(() => {
    setIsLikeState(board.isLike);
  }, [board.isLike]);

  const body = (prevIsLikeState: number | boolean | null | undefined) => {
    return {
      judge: !prevIsLikeState,
    };
  };

  const debouncingRequest = async (
    prevIsLikeState: number | boolean | null | undefined,
  ) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      try {
        await requestPostLike(Number(no), body(prevIsLikeState)).then(_ => {
          dispatch(setIsLike(!prevIsLikeState));
          !prevIsLikeState
            ? dispatch(plusLikeCount(board.likeCount + 1))
            : dispatch(minusLikeCount(board.likeCount - 1));
        });
      } catch (e) {
        console.error('error', e);
      }
    }, 800);
    setTimer(newTimer);
  };

  const handleLikeButtonClick = () => {
    if (authorization) {
      setIsLikeState(prev => {
        debouncingRequest(prev);
        return !prev;
      });
    } else return;
  };

  return (
    <Container>
      <ButtonWrap>
        <WhiteButton able={authorization} onClick={handleLikeButtonClick}>
          <div className="img-wrap">
            <Img src={likeButtonImg} alt="poster-like-button" />
          </div>
        </WhiteButton>
      </ButtonWrap>
      <ButtonWrap>
        <WhiteButton
          able={reportButtonState.able}
          onClick={handleReportButtonClick}
        >
          <div className="img-wrap">
            <Img src={reportButtonState.img} alt="poster-report-button" />
          </div>
        </WhiteButton>
      </ButtonWrap>
    </Container>
  );
}

export default Btns;

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  width: 128px;
  .img-wrap {
    width: 32px;
    height: 32px;
  }
`;

const ButtonWrap = styled.div`
  width: 60px;
  height: 60px;
  .write-img {
    width: 15px;
    height: 15px;
  }
`;
