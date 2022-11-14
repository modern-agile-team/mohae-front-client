import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { setAreaName, setAreaNo } from '../../../redux/filter/reducer';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';

interface Contents {
  no: string;
  name: string;
}

interface Props {
  contents: Contents[];
  setPlaceholder: Dispatch<SetStateAction<string>>;
  handleView: () => void;
}

function SelectList(props: Props) {
  const { contents, setPlaceholder, handleView } = props;
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent, selected: string) => {
    dispatch(setAreaNo(e.currentTarget.id));
    dispatch(setAreaName(selected));

    setPlaceholder(selected);
    handleView();
  };

  const lists = useCallback(() => {
    return contents.map((content, i: number) => (
      <List key={i} id={content.no} onClick={e => onClick(e, content.name)}>
        {content.name}
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
const Container = styled.article`
  width: 138px;
  height: 176px;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow-y: scroll;
  background-color: white;
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
`;

const List = styled.ul`
  width: 138px;
  height: 44px;
  padding-right: 20px;
  cursor: pointer;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a7a7ad;
  :hover {
    background-color: #fcf3f4;
    color: #4f4e5c;
  }
`;
