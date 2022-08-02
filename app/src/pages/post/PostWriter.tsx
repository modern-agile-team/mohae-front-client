import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import Profile from '../../components/profile/Profile';
import { Btn, Img, PostIt } from '../../components';
import { color, font } from '../../styles';
import Btns from './Btns';
import { Props } from './Container';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

interface PostWriterProps {
  close: () => void;
}

function PostWriter({ close }: PostWriterProps) {
  const reduxData = useSelector(
    (state: RootState) => state.post.data.response.board,
  );

  const userImg =
    reduxData.userPhotoUrl !== null
      ? `https://d2ffbnf2hpheay.cloudfront.net/${reduxData.userPhotoUrl}`
      : // + '?w=60'
        null;

  const style = css`
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    p {
      color: ${color.dark1};
      &:nth-child(1) {
        ${font.size[14]}
        ${font.weight[700]}
        margin-bottom: 4px;
      }
      &:nth-child(2) {
        ${font.size[14]}
        ${font.weight[400]}
      }
    }
    .btnContainer {
      display: flex;
      justify-content: space-between;
      width: 128px;
    }
    .btnWrap {
      width: 60px;
      height: 60px;
    }
    .imgWrap {
      width: 32px;
      height: 32px;
    }
    .userData {
      display: flex;
      align-items: center;
      > :nth-child(2) {
        margin-left: 16px;
      }
    }
  `;

  return (
    <>
      <div className={cx(style)}>
        <div className="userData">
          <Profile img={userImg} size={60} smallShadow />
          <div>
            <p>{reduxData.nickname}</p>
            <p>{reduxData.majorName}</p>
          </div>
        </div>
        <Btns close={close} />
      </div>
    </>
  );
}

export default PostWriter;
