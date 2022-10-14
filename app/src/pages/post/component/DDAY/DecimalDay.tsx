import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root';

function DecimalDay() {
  const { isDeadline, decimalDay } = useSelector(
    (state: RootState) => state.post.data.response.board,
  );

  const showDDAYContent = (): { content: string; style: string } => {
    if (!isDeadline) {
      if (decimalDay !== null) {
        return decimalDay
          ? {
              content: `D${decimalDay}`,
              style: `
              background-color: #FCF3F4;
              color: #ff445e;
            `,
            }
          : {
              content: 'D-DAY',
              style: `
              background-color: #ff445e;
              color: white;
            `,
            };
      }
      return {
        content: '상시',
        style: `
        background-color: #ff445e;
        color: white;
      `,
      };
    } else {
      return {
        content: '마감',
        style: `
        background-color: #4f4e5c;
        color: white;
      `,
      };
    }
  };

  return (
    <Container DDAYStyle={showDDAYContent().style}>
      {showDDAYContent().content}
    </Container>
  );
}

export default DecimalDay;

const Container = styled.section<{ DDAYStyle: string }>`
  width: 47px;
  height: 24px;
  font-size: 14px;
  ${props => props.DDAYStyle}
  font-family: 'Regular';
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px 0px 0px 16px;
`;
