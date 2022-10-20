import React from 'react';
import styled from '@emotion/styled';

interface SelectBtnProps {
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent) => void;
  attributes: {
    size: 'small' | 'medium' | 'large';
    type: 'radio' | 'checkbox';
    name: string;
  };
}

interface LabelTable {
  [attr: string]: React.ReactNode;
}

function SelectBtn(props: SelectBtnProps) {
  const { children, checked, attributes, onChange } = props;

  const labelTable = (children: React.ReactNode): LabelTable => {
    return {
      large: <LargeLabel>{children}</LargeLabel>,
      medium: <MediumLabel>{children}</MediumLabel>,
      small: <SmallLabel>{children}</SmallLabel>,
    };
  };

  return (
    <>
      {
        labelTable(
          <>
            <input
              type={attributes.type}
              name={attributes.name}
              checked={checked}
              onChange={onChange}
            />
            <ChilderenContainer size={attributes.size}>
              {children}
            </ChilderenContainer>
          </>,
        )[attributes.size]
      }
    </>
  );
}

export default SelectBtn;

const ChilderenContainer = styled.span<{ size: string }>`
  display: ${props => props.size !== 'small' && 'flex'};
  justify-content: space-between;
  text-align: center;
  color: #4f4e5c;
  font-size: 14px;
  font-family: 'Regular';
  position: absolute;
  width: ${props => (props.size !== 'large' ? '90px' : '84px')};
`;

const RootStyle = styled.label`
  background-color: white;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #fcf3f4;
  }
  input[type='checkbox'],
  input[type='radio'] {
    cursor: pointer;
    -webkit-appearance: none;
    transition: 0.2s all linear;
    :checked {
      background-color: #ff445e;
      + span {
        color: white;
      }
    }
  }
`;

const LargeLabel = styled(RootStyle)`
  width: 182px;
  height: 60px;
  input[type='checkbox'],
  input[type='radio'] {
    width: 182px;
    height: 60px;
  }
`;

const CommonInFilter = styled(RootStyle)`
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
  input[type='checkbox'],
  input[type='radio'] {
    width: 100%;
    height: 44px;
    border-radius: 6px;
  }
`;

const MediumLabel = styled(CommonInFilter)`
  width: 138px;
  height: 44px;
`;

const SmallLabel = styled(CommonInFilter)`
  width: 87px;
  height: 44px;
`;
