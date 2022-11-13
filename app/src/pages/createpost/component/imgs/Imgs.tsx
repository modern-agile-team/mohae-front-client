import React from 'react';
import { Box, Carousel, ImageInput } from '../../../../components';
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
        <ImageInput edit imgs={editImgArr} />
      </Box>
    </>
  );
}

export default PostImgs;
