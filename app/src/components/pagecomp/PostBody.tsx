import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Box, Btn, Img, TextEditor } from '..';
import { color, font, radius } from '../../styles';

// 본문, 거래 참고 사항
interface Props {
  view?: boolean;
  getValue?: boolean;
  data?: { [key: string]: any };
}

function PostBody(props: Props) {
  const { view, getValue, data } = props;

  const style = css`
    margin: 32px 0px 16px 0px;
    .body {
      padding: ${view && '16px 0px 16px 24px'};
      ${font.size[14]}
      ${font.weight[400]}
      word-break:break-all;
    }

    .description {
      width: 1080px;
      height: 365px;
      overflow-y: scroll;
    }
  `;

  const body = () => {
    return view ? (
      <div className='description'>{data?.description}</div>
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
