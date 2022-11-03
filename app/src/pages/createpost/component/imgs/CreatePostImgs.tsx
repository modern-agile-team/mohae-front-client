import React from 'react';
import { Box, Carousel, OrderedImg } from '../../../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root';

function PostImgs() {
  const editImgArr = useSelector(
    (state: RootState) => state.createPost.data.imgArr,
  );

  return (
    <>
      <Box size={[360, 360]}>
        <Carousel postEdit />
      </Box>
      <Box size={[360, 72]}>
        <OrderedImg inline edit imgs={editImgArr} postEdit />
      </Box>
    </>
  );
}

export default PostImgs;
