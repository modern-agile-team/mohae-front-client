import React from 'react';
import styled from '@emotion/styled';
import { HotBoardsFilterProps } from '../../../../../../types/main/fourthPage/type';

function HotBoardsFilter({ focus, setFocus }: HotBoardsFilterProps) {
  const text: { [key: string]: string } = {
    0: 'All',
    1: '진행 중',
    2: '마감',
  };

  const clickFocus = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFocus(Number(e.currentTarget.id));
  };

  const hotBoardFilter = () => {
    return Object.keys(text).map((_: string, index: number) => (
      <button key={index} id={`${index}`} onClick={clickFocus}>
        {text[index]}
      </button>
    ));
  };

  return (
    <Container focus={focus}>
      <div className="focus" />
      {hotBoardFilter()}
    </Container>
  );
}

export default HotBoardsFilter;

const Container = styled.div<{ focus: number }>`
  padding: 4px;
  width: fit-content;
  display: flex;
  justify-content: space-between;
  background-color: #e7e7e8;
  position: relative;
  border-radius: 6px;
  margin: 0 0 40px;

  .focus {
    width: 150px;
    height: 32px;
    background-color: white;
    position: absolute;
    border-radius: 6px;
    transition: 0.3s all ease-in-out;
    transform: translate(${props => props.focus * 154}px, -50%);
    top: 50%;
  }

  & > :not(:last-of-type) {
    margin-right: 4px;
  }

  button {
    border-radius: 6px;
    z-index: 2;
    width: 150px;
    padding: 3px 0 2px;
    line-height: 27px;
    background-color: unset;
  }
`;
