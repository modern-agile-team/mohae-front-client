import React, { useState } from 'react';
import styled from '@emotion/styled';
import SelectList from './SelectList';
import Img from '../../img/Img';
import { lists } from '../../../consts/listStore';

interface Props {
  view: boolean;
  selected: string;
  handleView: () => void;
}

function FilterSelectBox(props: Props) {
  const { view, handleView, selected } = props;
  const [placeholder, setPlaceholder] = useState<string>(
    lists.areaNo
      .map(area => (selected === area.no ? area.name : false))
      .filter(el => el)[0] || '전체 지역',
  );

  return (
    <>
      <Container view={view} onClick={handleView}>
        <div className="placeholder-wrap">{placeholder}</div>
        <div className="opener">
          <Img
            src={view ? '/img/arrow-up-dark3.png' : '/img/arrow-down-dark3.png'}
            alt="filter-select-box-opener"
          />
        </div>
      </Container>
      {view && (
        <>
          <SelectList
            contents={lists.areaNo}
            setPlaceholder={setPlaceholder}
            handleView={handleView}
          />
          <Overlay onClick={handleView} />
        </>
      )}
    </>
  );
}

export default FilterSelectBox;

const Overlay = styled.div`
  background-color: inherit;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div<{ view: boolean }>`
  position: relative;
  width: 138px;
  height: 44px;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: 'Regular';
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
  border-radius: ${props => (props.view ? '6px 6px 0px 0px;' : '6px')};

  .placeholder-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .opener {
    width: 24px;
    height: 24px;
  }
`;
