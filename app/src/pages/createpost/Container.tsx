import React, { useState } from 'react';
import Presenter from './Presenter';

function CreateAndEditPost() {
  const [view, setView] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
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
    setChecked({ 0: false, 1: false, [i]: !checked[i] });
  };

  return (
    <Presenter
      view={view}
      checked={checked}
      selectBoxClick={selectBoxClick}
      selectedList={selectedList}
      setTargetCheck={setTargetCheck}
    />
  );
}

export default CreateAndEditPost;
