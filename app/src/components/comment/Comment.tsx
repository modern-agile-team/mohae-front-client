import styled from '@emotion/styled';
import { useState } from 'react';
import Box from '../box/Box';
import { ReportModal } from '../modal';
import CommentInputForm from './CommentInputForm';
import CommentList from './CommentList';

const Comment = () => {
  const [reportModalView, setReportModalView] = useState(false);

  const handleModalView = () => {
    setReportModalView(prev => !prev);
  };
  return (
    <>
      <Box size={[1128]} className="comments-box">
        <CommentInputForm />
        <CommentList handleModalView={handleModalView} />
      </Box>
      <ReportModal visible={reportModalView} close={handleModalView} user />
    </>
  );
};

export default Comment;
