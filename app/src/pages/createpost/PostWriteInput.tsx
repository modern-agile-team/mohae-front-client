import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { radius, shadow } from '../../styles';

interface Props {
  state: {
    value: { [note: string]: string };
    setValue: (e: React.ChangeEvent<HTMLTextAreaElement>, i: number) => void;
    i: number;
  };
}

function PostWriteInput(props: Props) {
  const value = props.state.value;
  const setValue = props.state.setValue;
  const i = props.state.i;

  const style = css`
    width: 1096px;
    min-height: 151px;
    margin: 4px 0px 16px 0px;
    padding: 16px;
    ${radius[6]}
    ${shadow.inputGray}
    resize: none;
  `;

  function axiosFunc() {
    console.log(`${i} : `, value);
  }

  useEffect(() => {
    const timerForFirst = setTimeout(axiosFunc, 1000);
    return () => clearTimeout(timerForFirst);
  }, [value]);

  return <textarea className={cx(style)} onChange={e => setValue(e, i)} />;
}

export default PostWriteInput;
