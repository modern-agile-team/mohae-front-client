import React from 'react';
import { css, cx } from '@emotion/css';
import PostInfo from './PostInfo';
import PostWriter from './PostWriter';

interface Props {
  close: () => void;
  data?: {
    date: string;
    msg: string;
    response: {
      authorization: boolean;
      board: {
        areaName: string;
        areaNo: number;
        boardPhotoUrls: string | null;
        categoryName: string;
        categoryNo: number;
        decimalDay: number | null;
        description?: string;
        hit: number;
        isDeadline: number;
        isLike?: number;
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
      };
    };
  };
}

function QuickMenu(props: Props) {
  const { close, data } = props;

  const style = css`
    width: 1128px;
    height: 92px;
    background-color: white;
    border-radius: 0px 0px 6px 6px;
    box-shadow: 0px 4px 4px 0px #0000001a;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0px 24px 20px 24px;
    .userData {
      margin-right: 16px;
    }
  `;

  return (
    <div className={cx(style)}>
      <PostInfo quickMenu data={data} />
      <PostWriter close={close} data={data} />
    </div>
  );
}

export default QuickMenu;
