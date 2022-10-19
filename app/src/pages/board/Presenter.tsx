import React from 'react';
import { PresenterProps } from '../../types/board/type';
import { Contents, InteractionPart } from './components';

function Presenter(props: PresenterProps) {
  const { resetPageNation, setTarget } = props;

  return (
    <>
      <InteractionPart resetPageNation={resetPageNation} />
      <Contents setTarget={setTarget} />
    </>
  );
}

export default Presenter;
