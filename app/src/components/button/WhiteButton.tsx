import React from 'react';
import styled from '@emotion/styled';

interface Props {
  able: boolean;
  type?: 'button' | 'reset' | 'submit' | undefined;
  children: React.ReactNode;
  onClick?: () => void;
}

function WhiteButton(props: Props) {
  const { able, type, children, onClick } = props;
  return (
    <Container able={able} onClick={onClick} type={type}>
      {children}
    </Container>
  );
}

export default WhiteButton;

const Container = styled.button<{ able: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
  color: ${props => (props.able ? '#ff445e' : '#E7E7E8')};
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  &:hover {
    background-color: ${props => (props.able ? '#FCF3F4' : 'white')};
  }
  &:active {
    background-color: ${props => (props.able ? '#FFA1AF' : 'white')};
  }
  *:not(:last-child, source) {
    margin-right: 8px;
  }
`;
