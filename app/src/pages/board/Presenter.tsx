import React from 'react';
import { PresenterProps } from '../../types/board/type';
import { Contents, InteractionPart } from './components';

function Presenter(props: PresenterProps) {
  const { resetPageInfo, setTarget } = props;

  return (
    <>
      <InteractionPart resetPageInfo={resetPageInfo} />
      <Contents setTarget={setTarget} />
    </>
  );
}

export default Presenter;
