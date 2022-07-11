import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { SelectBtn } from '../../components/button';
import { color, radius } from '../../styles';
import { Box, Report, ReportModal, Btn, BasicModal } from '../../components';
import Comments from '../../components/comments/Comments';
import EmptySpinner from '../../components/spinner/Spinner';
import { useLocation } from 'react-router-dom';

function SJ() {
  const wrap = css`
    display: flex;
    flex-direction: column;
  `;
  const url = useLocation().pathname;
  console.log('url :>> ', url);
  return (
    // <div className={cx(wrap)s}>
    <div className={cx(wrap)}>
      <EmptySpinner searchNone text={'안녕'} />
      {/* <Comments reply>
        으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아
      </Comments>
      <Comments>
        으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아
      </Comments>
      <Comments>으아아아으아아아으아아아으아</Comments>
      <Comments>
        으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아으아아아
      </Comments> */}
    </div>
    // </div>
  );
}

export default SJ;
