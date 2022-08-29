/** @format */

import Wrapper from './Wrapper';
import Completion from './Completion';

import Title from './Title';
import { BasicModal } from '../../components';

export default function Resign() {
  return (
    <BasicModal preBtn small visible={true}>
      <Wrapper>
        <Title />
        {/* <Request /> */}
        <Completion />
      </Wrapper>
    </BasicModal>
  );
}
