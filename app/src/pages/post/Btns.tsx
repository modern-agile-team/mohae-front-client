import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, Img } from '../../components';
import axios from 'axios';
import { Props } from './Container';
import { useParams } from 'react-router-dom';

interface BtnsProps extends Props {
  close: () => void;
  likeCount: number;
  setLikeCount: Dispatch<SetStateAction<number>>;
}

function Btns(props: BtnsProps) {
  const { close, data, likeCount, setLikeCount } = props;
  const { no } = useParams();
  const [imgs, setImgs] = useState({
    like: {
      disable: '/img/heart-light1.png',
      userClicked: data.response.board.isLike,
    },
    report: {
      able: '/img/report-main.png',
      disalbe: '/img/report-light1.png',
    },
  });

  const isLike = JSON.stringify({
    judge: imgs.like.userClicked,
  });

  const header = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data?.token}`,
    },
  };

  const onClick = {
    like: () => {
      setImgs({
        ...imgs,
        like: { ...imgs.like, userClicked: !imgs.like.userClicked },
      });
    },
    report: () => {
      close();
    },
  };

  const btnImg = {
    like: () => {
      if (data.token !== null) {
        return !imgs.like.userClicked ? (
          <Btn white onClick={() => onClick.like()}>
            <div className='imgWrap'>
              <Img src='/img/heart-main.png' />
            </div>
          </Btn>
        ) : (
          <Btn white onClick={() => onClick.like()}>
            <div className='imgWrap'>
              <Img src='/img/heart-filled-main.png' />
            </div>
          </Btn>
        );
      } else
        return (
          <Btn white disable>
            <div className='imgWrap'>
              <Img src='/img/heart-light1.png' />
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
          <div className='imgWrap'>
            <Img src='/img/report-light1.png' />
          </div>
        </Btn>
      ) : (
        <Btn white onClick={() => onClick.report()}>
          <div className='imgWrap'>
            <Img src='/img/report-main.png' />
          </div>
        </Btn>
      );
    },
  };

  const handleLikeCount = () => {
    imgs.like.userClicked
      ? setLikeCount(likeCount + 1)
      : setLikeCount(likeCount - 1);
  };

  useEffect(() => {
    if (data.response.board.isLike !== imgs.like.userClicked) {
      const debounceAxios = setTimeout(() => {
        axios
          .post(`https://mo-hae.site/like/board/${no}`, isLike, header)
          .then(res => handleLikeCount());
      }, 250);
      return () => clearTimeout(debounceAxios);
    }
  }, [imgs.like.userClicked]);

  return (
    <div className={cx(style)}>
      <div className='btnWrap'>{btnImg.like()}</div>
      <div className='btnWrap'>{btnImg.report()}</div>
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
