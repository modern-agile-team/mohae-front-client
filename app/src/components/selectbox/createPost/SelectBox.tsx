import React, { useState } from 'react';
import SelectList from './SelectList';
import { color, font, shadow } from '../../../styles';
import Img from '../../img/Img';
import { WhiteButton } from '../../button';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root';

interface Contents {
  no: string;
  name: string;
}
interface Props {
  view: boolean;
  used: string;
  handleView: () => void;
  placeholder?: string;
  style: string;
}

function SelectBox(props: Props) {
  const { view, handleView, placeholder, style, used } = props;
  const { deadline, areaNo, categoryNo } = useSelector(
    (state: RootState) => state.createPost.data,
  );

  const [selected, setSelected] = useState<string>(
    placeholder ? placeholder : '전체지역',
  );

  const contentsStyle = () => {
    return (
      <div className="placeholderWrap">
        <div className="category">
          {style !== '카테고리' ? (
            <WhiteButton able>{selected}</WhiteButton>
          ) : (
            { selected }
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Wrap view={view} onClick={handleView}>
        {contentsStyle()}
        <div className="opener">
          <Img src="/img/arrow-down-dark3.png" />
        </div>
      </Wrap>
      {view && (
        <>
          <SelectList
            contents={list[style]}
            style={style}
            setSelected={setSelected}
            handleView={handleView}
            used={used}
          />
          <Overlay onClick={handleView} />
        </>
      )}
    </>
  );
}

export default SelectBox;

const Overlay = styled.div`
  background-color: inherit;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Wrap = styled.div<{ view: boolean }>`
  position: relative;
  ${shadow.button}
  ${props => (props.view ? 'border-radius: 6px 6px 0px 0px;' : '6px')}
      padding: 0px 8px;
  .placeholderWrap {
    width: 106px;
    display: flex;
    justify-content: center;
  }
  width: 368px;
  height: 62px;
  display: flex;
  align-items: center;
  ${font.size[14]}
  ${font.weight[400]}
  cursor: pointer;
  .opener {
    width: 24px;
    height: 24px;
  }
  .category {
    width: 100px;
    height: 36px;
  }
  .placeholderWrap {
    width: 344px;
    display: flex;
    align-items: center;
  }
  .placeholder {
    color: ${color.dark3};
  }
`;

const list: { [placeholder: string]: Contents[] } = {
  카테고리: [
    { no: '1', name: '디자인' },
    { no: '2', name: 'IT/개발' },
    { no: '3', name: '사진/영상' },
    { no: '4', name: '기획/마케팅' },
    { no: '5', name: '번역/통역' },
    { no: '6', name: '문서작업' },
    { no: '7', name: '컨설팅' },
    { no: '8', name: '법률' },
    { no: '9', name: '과외/레슨' },
    { no: '10', name: '상담/운세' },
    { no: '11', name: '이벤트' },
    { no: '12', name: '핸드메이드' },
    { no: '13', name: '취미' },
    { no: '14', name: '생활서비스' },
    { no: '15', name: '기타' },
  ],
  '전체 지역': [
    { no: '1', name: '서울' },
    { no: '2', name: '경기도' },
    { no: '3', name: '강원도' },
    { no: '4', name: '대전' },
    { no: '5', name: '세종시' },
    { no: '6', name: '전라도' },
    { no: '7', name: '광주' },
    { no: '8', name: '경상도' },
    { no: '9', name: '부산' },
    { no: '10', name: '울산' },
    { no: '11', name: '제주도' },
  ],
  기간: [
    { no: '7', name: '일주일' },
    { no: '30', name: '1개월' },
    { no: '60', name: '3개월' },
    { no: '0', name: '상시' },
  ],
};
