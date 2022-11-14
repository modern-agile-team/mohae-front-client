import React, { Dispatch, SetStateAction, useCallback } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import {
  setAreaNum,
  setCategoryNum,
  setDeadline,
} from '../../../redux/createpost/reducer';

interface Contents {
  no: string;
  name: string;
}
interface Props {
  contents: Contents[];
  using: string;
  setPlaceholder: Dispatch<SetStateAction<string | false | undefined>>;
  handleView: () => void;
}

interface OnClickType {
  [key: string]: (e: React.MouseEvent, selected: string) => void;
}

function SelectList(props: Props) {
  const { contents, using, setPlaceholder, handleView } = props;
  const dispatch = useDispatch();

  const onClick: OnClickType = {
    categoryNo(e: React.MouseEvent, selected: string) {
      dispatch(setCategoryNum(e.currentTarget.id));
      setPlaceholder(selected);
      handleView();
    },
    areaNo(e: React.MouseEvent, selected: string) {
      dispatch(setAreaNum(e.currentTarget.id));
      setPlaceholder(selected);
      handleView();
    },
    deadline(e: React.MouseEvent, selected: string) {
      dispatch(setDeadline(e.currentTarget.id));
      setPlaceholder(selected);
      handleView();
    },
  };

  const lists = useCallback(() => {
    return contents.map((el, i: number) => (
      <List key={i} id={el.no} onClick={e => onClick[using](e, el.name)}>
        {el.name}
      </List>
    ));
  }, []);

  return (
    <Wrapper>
      <Container>{lists()}</Container>
    </Wrapper>
  );
}

export default SelectList;

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  z-index: 5;
`;

const Container = styled.div`
  width: 368px;
  height: 247px;
  width: 368px;
  height: 247px;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow-y: scroll;
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 368px;
  height: 62px;
  padding-right: 20px;
  cursor: pointer;
  background-color: white;
  color: #a7a7ad;
  :hover {
    background-color: #fcf3f4;
    color: #4f4e5c;
  }
`;
