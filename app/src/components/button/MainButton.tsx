import React from 'react';
import styled from '@emotion/styled';

interface Props {
  able: boolean;
  children: React.ReactNode;
  type: string;
  onClick?: (e: React.MouseEvent) => void;
}

function MainButton(props: Props) {
  const { able, children, onClick } = props;
  return (
    <Container able={able} onClick={onClick}>
      {children}
    </Container>
  );
}

export default MainButton;

const Container = styled.button<{ able: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${props => (props.able ? '#ff445e' : '#E7E7E8')};
  color: white;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  &:active {
    background-color: ${props => props.able && '#D12A41'};
  }
  p,
  span {
    margin-right: 8px;
  }
`;
