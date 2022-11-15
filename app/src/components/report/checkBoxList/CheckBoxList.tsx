import React from 'react';
import styled from '@emotion/styled';
import { CheckBoxListProps, List } from '../../../types/report/type';

function CheckBoxList(props: CheckBoxListProps) {
  const { checkList, setCheckList } = props;

  const selectList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList = [...checkList.list];
    const targetValue = newList[Number(e.currentTarget.id)];
    const selectedList = checkList.list.reduce((acc: number, cur: List) => {
      return cur.checked ? acc + 1 : acc;
    }, 0);

    if (selectedList < 3 || !e.currentTarget.checked) {
      targetValue.checked = !targetValue.checked;
      setCheckList({ ...checkList, list: newList });
    } else {
      e.currentTarget.checked = false;
      alert('3개 이하만 선택 가능합니다');
    }
  };

  return (
    <>
      {checkList.list.map((report: List, index: number) => (
        <CheckBoxLabel key={index}>
          <CheckBox type="checkbox" onChange={selectList} id={`${index}`} />
          {report.title}
        </CheckBoxLabel>
      ))}
    </>
  );
}

export default CheckBoxList;

const CheckBoxLabel = styled.label`
  height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  user-select: none;
  color: #84838d;
  font-size: 14px;
  margin: 0 0 8px;
  position: relative;
  :hover,
  :active {
    color: #4f4e5c;
  }
`;

const CheckBox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background-color: white;
  margin: 0 8px 0 0;
  border-radius: 2px;
  box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
  cursor: pointer;
  :hover {
    background-color: #f9f9f9;
  }
  :active {
    background-color: white;
  }
  :checked {
    background: #ff445e url('/img/check.png') no-repeat center/cover;
    background-size: 8px 8px;
  }
`;
