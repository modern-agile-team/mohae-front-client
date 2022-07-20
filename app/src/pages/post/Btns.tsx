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

interface BtnsProps extends Props {
  close: () => void;
}

function Btns(props: BtnsProps) {
  const { close, data } = props;
  const { no } = useParams();
  const dispatch = useDispatch();
  const reduxIsLike = useSelector(
    (state: RootState) => state.post.data.response.board.isLike,
  );
  const likeCount = useSelector(
    (state: RootState) => state.post.data.response.board.likeCount,
  );

  const isLike = JSON.stringify({
    judge: reduxIsLike,
  });

  const header = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data?.token}`,
    },
  };

  const onClick = {
    like: () => {
      dispatch(setIsLike(!reduxIsLike));
    },
    report: () => {
      close();
    },
  };

  const handleLikeCount = () => {
    reduxIsLike
      ? dispatch(plusLikeCount(likeCount + 1))
      : dispatch(minusLikeCount(likeCount - 1));
  };

  console.log(data.token);

  useEffect(() => {
    if (data.token !== null) {
      const debounceAxios = setTimeout(() => {
        axios
          .post(`https://mo-hae.site/like/board/${no}`, isLike, header)
          .then(res => {
            console.log('res.data :>> ', res.data);
            handleLikeCount();
          })
          .catch(err => err);
      }, 300);
      return () => clearTimeout(debounceAxios);
    }
  }, [reduxIsLike]);

  const btnImg = {
    like: () => {
      if (data.token !== null) {
        return (
          <Btn white onClick={() => onClick.like()}>
            <div className="imgWrap">
              <Img
                src={
                  !reduxIsLike
                    ? '/img/heart-main.png'
                    : '/img/heart-filled-main.png'
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
      const decoded = data.decoded;
      const getDataValue = data.response.board;
      return data.token === null ||
        (data.decoded && decoded.userNo === getDataValue.userNo) ? (
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
