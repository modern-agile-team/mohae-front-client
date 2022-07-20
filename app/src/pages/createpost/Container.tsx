import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import Presenter from './Presenter';

function CreateAndEditPost() {
  const reduxData = useSelector((state: RootState) => state.createPost.data);
  console.log(reduxData);
  const [view, setView] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const [targetChecked, setTargetChecked] = useState<{
    [key: number]: boolean;
  }>({
    0: true,
    1: false,
  });

  const selectBoxClick = (i: number) => {
    setView({ 0: false, 1: false, 2: false, [i]: !view[i] });
  };

  const selectedList = (e?: React.MouseEvent) => {
    console.log(e?.currentTarget.textContent);
    setView({ 0: false, 1: false, 2: false });
  };

  const setTargetCheck = (i: number) => {
    setTargetChecked({ 0: false, 1: false, [i]: !targetChecked[i] });
  };

  return (
    <Presenter
      view={view}
      targetChecked={targetChecked}
      selectBoxClick={selectBoxClick}
      selectedList={selectedList}
      setTargetCheck={setTargetCheck}
    />
  );
}

export default CreateAndEditPost;
