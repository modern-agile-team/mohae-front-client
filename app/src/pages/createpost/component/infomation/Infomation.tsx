import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  MarkBox,
  CreateEditSelectBox as SelectBox,
} from '../../../../components';
import { SelectBtn } from '../../../../components/button';
import { Inputs, TextArea } from '../../../../components/input/createPost';
import { setTarget } from '../../../../redux/createpost/reducer';
import { RootState } from '../../../../redux/root';
import { PosterInfomation } from '../../../../types/createAndEditPost/type';

interface StateType {
  [key: number]: boolean;
}

function Infomation() {
  const dispatch = useDispatch();
  const { categoryNo, areaNo, deadline, target } = useSelector(
    (state: RootState) => state.createPost.data,
  );
  const [selectBoxView, setSelectBoxView] = useState<StateType>({
    0: false,
    1: false,
    2: false,
  });
  const [targetChecked, setTargetChecked] = useState<StateType>({
    0: true,
    1: false,
  });

  useEffect(() => {
    setTargetChecked(
      Number(target) ? { 0: false, 1: true } : { 0: true, 1: false },
    );
  }, []);

  const handleSelectBtnClick = (checked: number) => {
    setTargetChecked({
      0: false,
      1: false,
      [checked]: !targetChecked[checked],
    });
    dispatch(setTarget(checked));
  };

  const spitOutButton = () => {
    return contents.map((content, i) => (
      <div className="markBox" key={i}>
        <SelectBtn
          onChange={() => handleSelectBtnClick(i)}
          checked={targetChecked[i]}
          attributes={{
            size: 'large',
            name: 'target',
            type: 'radio',
          }}
        >
          {content}
        </SelectBtn>
      </div>
    ));
  };

  const handleSelectBoxClick = (i: number) => {
    setSelectBoxView({ 0: false, 1: false, 2: false, [i]: !selectBoxView[i] });
  };

  const spitOutBox = () => {
    const propsTable: { using: keyof PosterInfomation; selected: boolean }[] = [
      { using: 'categoryNo', selected: categoryNo ? true : false },
      { using: 'areaNo', selected: areaNo ? true : false },
      { using: 'deadline', selected: deadline ? true : false },
    ];
    return propsTable.map((prop, i) => (
      <SelectBox
        key={`${i}`}
        view={selectBoxView[i]}
        using={prop.using}
        handleView={() => handleSelectBoxClick(i)}
        selected={prop.selected}
      />
    ));
  };

  return (
    <Box size={[736, 448]}>
      <Container>
        <div className="left">
          <Inputs />
          <div className="mark-box-wrap">{spitOutButton()}</div>
        </div>
        <div className="right">{spitOutBox()}</div>
      </Container>
      <TextArea />
    </Box>
  );
}

export default Infomation;

const Container = styled.article`
  display: flex;
  .left,
  .right {
    width: 368px;
    height: calc(62px * 3);
    input {
      text-align: center;
    }
  }
  .mark-box-wrap {
    display: flex;
    margin: none;
    width: 368px;
    height: 62px;
    border-bottom: 2px solid #e7e7e8;
  }
`;

const contents = [
  <>
    <MarkBox shape={0} state={0} size={'small'} />
    해줄래요
  </>,
  <>
    <MarkBox shape={1} state={0} size={'small'} />
    구할래요
  </>,
];
