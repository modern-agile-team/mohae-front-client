import React, { useMemo, useState } from 'react';
import SelectList from './SelectList';
import Img from '../../img/Img';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root';
import { useParams } from 'react-router-dom';
import { lists } from '../../../consts/listStore';
import { PosterInfomation } from '../../../types/createAndEditPost/type';

interface Props {
  view: boolean;
  handleView: () => void;
  using: keyof PosterInfomation;
  selected: boolean;
}

function CreateEditSelectBox(props: Props) {
  const { view, handleView, using, selected } = props;
  const { no } = useParams();
  const reduxData: PosterInfomation = useSelector(
    (state: RootState) => state.createPost.data,
  );

  const initialPlaceholder = useMemo(() => {
    return lists[using]
      .map(list => Number(list.no) === Number(reduxData[using]) && list.name)
      .filter(el => el)[0];
  }, []);

  const handleInitialPlaceholder = () => {
    switch (using) {
      case 'categoryNo':
        return '카테고리';
      case 'areaNo':
        return '전체 지역';
      case 'deadline':
        return '기간';
    }
  };

  const [placeholder, setPlaceholder] = useState(
    no ? initialPlaceholder : handleInitialPlaceholder(),
  );

  return (
    <>
      <Wrap selected={selected} view={view} onClick={handleView}>
        <div className="placeholder-wrap">{placeholder}</div>
        <Opener>
          <Img
            src={view ? '/img/arrow-up-dark3.png' : '/img/arrow-down-dark3.png'}
            alt="select-box-opener"
          />
        </Opener>
      </Wrap>
      {view && (
        <>
          <SelectList
            contents={lists[using]}
            using={using}
            setPlaceholder={setPlaceholder}
            handleView={handleView}
          />
          <Overlay onClick={handleView} />
        </>
      )}
    </>
  );
}

export default CreateEditSelectBox;

const Overlay = styled.div`
  background-color: inherit;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Wrap = styled.div<{ view: boolean; selected: boolean }>`
  border-radius: 6px 6px 0px 0px;
  box-shadow: ${props => props.view && '0px 0px 4px rgba(132, 131, 141, 0.25)'};
  border-bottom: 2px solid #e7e7e8;
  position: relative;
  padding: 0px 8px;
  width: 368px;
  height: 62px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: 'Regular';
  cursor: pointer;

  .placeholder-wrap {
    width: 344px;
    display: flex;
    justify-content: center;
    color: ${props => (props.selected ? '#4f4e5c' : '#a7a7ad')};
  }
`;

const Opener = styled.div`
  width: 24px;
  height: 24px;
`;
