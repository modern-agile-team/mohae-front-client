import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import Profile from '../../components/profile/Profile';
import { Btn, Img, PostIt } from '../../components';
import { color, font } from '../../styles';
import Btns from './Btns';
import { Props } from './Container';

interface PostWriterProps extends Props {
  close: () => void;
}

function PostWriter({ close, data }: PostWriterProps) {
  const datas = data.response.board;

  const userImg =
    datas.userPhotoUrl !== null
      ? `https://d2ffbnf2hpheay.cloudfront.net/${datas.userPhotoUrl}`
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
            <p>{datas.nickname}</p>
            <p>{datas.majorName}</p>
          </div>
        </div>
        <Btns data={data} close={close} />
      </div>
    </>
  );
}

export default PostWriter;
