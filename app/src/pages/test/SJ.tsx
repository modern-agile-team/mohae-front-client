import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { SelectBtn } from '../../components/button';
import { color, radius } from '../../styles';
import { Box, Report, ReportModal, Btn, BasicModal } from '../../components';

function SJ() {
  const wrap = css`
    width: 1128px;
    height: 1000px;
  `;
  const btn = css`
    width: 100px;
    height: 40px;
    border: 1px solid ${color.main};
    ${radius[6]}
  `;

  return (
    <>
      <div className={cx(wrap)}></div>
    </>
  );
}

export default SJ;
