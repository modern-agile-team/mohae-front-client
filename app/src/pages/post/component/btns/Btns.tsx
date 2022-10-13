import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Img } from '../../../../components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  minusLikeCount,
  plusLikeCount,
  setIsLike,
} from '../../../../redux/post/reducer';
import { RootState } from '../../../../redux/root';
import { PageComponetsProps as BtnsProps } from '../../../../types/post/type';
import styled from '@emotion/styled';
import { requestPostLike } from '../../../../apis/post';

function Btns(props: BtnsProps) {
  const { handleReportModalView } = props;
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
      return handleReportModalView();
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
      <WhiteButton able={authorization} onClick={handleLikeButtonClick}>
        <div className="imgWrap">
          <Img src={likeButtonImg} />
        </div>
      </WhiteButton>
      <WhiteButton
        able={reportButtonState.able}
        onClick={handleReportButtonClick}
      >
        <div className="imgWrap">
          <Img src={reportButtonState.img} />
        </div>
      </WhiteButton>
    </Container>
  );
}

export default Btns;

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  width: 128px;
  .imgWrap {
    width: 32px;
    height: 32px;
  }
`;

const WhiteButton = styled.button<{ able: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  &:hover {
    background-color: ${props => (props.able ? '#FCF3F4' : 'white')};
  }
  &:active {
    background-color: ${props => (props.able ? '#FFA1AF' : 'white')};
  }
`;