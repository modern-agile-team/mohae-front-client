import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Box, Btn, Img, TextEditor } from '..';
import { color, font, radius } from '../../styles';

// 본문, 거래 참고 사항
interface Props {
  view?: boolean;
  getValue?: boolean;
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

function PostBody(props: Props) {
  const { view, getValue, data } = props;
  const datas = data?.response;

  const style = css`
    margin: 32px 0px 16px 0px;
    .body {
      padding: ${view && '16px 0px 16px 24px'};
      ${font.size[14]}
      ${font.weight[400]}
      word-break: break-all;
    }

    .description-scrollBox {
      width: 1080px;
      height: 365px;
      overflow-y: auto;
    }
    .description-box {
      height: fit-content;
    }
  `;

  const body = () => {
    return view ? (
      <div className='description-scrollBox'>
        <div className='description-box'>
          {datas?.board.description && datas.authorization
            ? datas?.board.description
            : '게시글 상세 조회는 로그인을 하고 이용 하시길 바랍니다.'}
        </div>
      </div>
    ) : (
      <TextEditor size={379} />
    );
  };

  return (
    <div className={cx(style)}>
      <Box size={[1128, 397]} className='body'>
        {body()}
      </Box>
    </div>
  );
}

export default PostBody;
