import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { SelectBtn } from '../../components/button';
import { color, radius } from '../../styles';
import {
  Box,
  Report,
  ReportModal,
  Btn,
  BasicModal,
  TextEditor,
} from '../../components';
import EmptySpinner from '../../components/emptySpinner/EmptySpinner';
import { useLocation } from 'react-router-dom';
import { Editor } from 'draft-js';

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
      <TextEditor />
    </div>
    // </div>
  );
}

export default SJ;
