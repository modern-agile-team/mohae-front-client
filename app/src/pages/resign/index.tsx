/** @format */

import { css, cx } from '@emotion/css';
import Wrapper from './Wrapper';
import Completion from './Completion';
import Request from './Request';
import Title from './Title';
import { BasicModal } from '../../components';

export default function Resign() {
  return (
    <BasicModal
      small
      visible={true}
      contents={
        <Wrapper>
          <Title />
          <Completion />
          {/* <Request /> */}
        </Wrapper>
      }
    />
  );
}
