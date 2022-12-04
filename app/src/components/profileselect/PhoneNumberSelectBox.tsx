import React from 'react';
import styled from '@emotion/styled';
import Img from '../img/Img';

interface Props {
  onSelect: (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  userInfo: any;
}

const PhoneNumberSelectBox = ({ onSelect, userInfo }: Props) => {
  const phoneNumbers = ['010', '011', '02', '031'];
  return (
    <Container>
      <SelectButton>
        <PlaceHolder>
          {userInfo.phone ? userInfo.phone.slice(0, 3) : <span>선택</span>}
        </PlaceHolder>
        <Arrow>
          <Img src="/img/arrow-down-dark3.png" alt="select-box-opener" />
        </Arrow>
      </SelectButton>
      <Option>
        <List>
          {phoneNumbers.map((phoneNumber: string, index: number) => (
            <ListButton
              key={index}
              value={phoneNumber}
              name="phoneNumber"
              onClick={e => onSelect(index, e)}
            >
              {phoneNumber}
            </ListButton>
          ))}
        </List>
      </Option>
    </Container>
  );
};
const Container = styled.div`
  width: 100px;
  height: 240px;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 10px;
`;

const SelectButton = styled.button`
  color: #84838d;
  width: 100%;
  height: 52px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    color: #ff445e;
  }
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
`;

const PlaceHolder = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  > :not(:last-of-type) {
    margin-right: 8px;
  }
`;

const Arrow = styled.div`
  width: 20px;
  height: 20px;
`;

const Option = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 52px;
  left: 0;
  padding: 8px 0 0 0;
  height: 180px;
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  width: 100%;
  padding: 8px 8px;
  height: 100%;
  background-color: white;
  overflow: scroll;
  > :nth-of-type(2n-1) {
    background-color: #f9f9f9;
  }
`;

const ListButton = styled.button`
  width: 100%;
  display: flex;
  line-height: 20px;
  padding: 8px 0;
  justify-content: center;
  align-items: center;
`;

export default PhoneNumberSelectBox;
