import React from 'react';
import styled from '@emotion/styled';
import { Img } from '../../components';
import { Link } from 'react-router-dom';

const InquireSuccess = () => {
  return (
    <Wrapper>
      <h4>문의완료</h4>
      <CheckImg>
        <Img src="img/complete.png" alt="complete-inquiry" />
      </CheckImg>
      <p>문의하신 내용이 접수되었습니다</p>
      <TextWrapper>
        <span>문의하신 내용이 정상 접수되었습니다</span>
        <span>해당 답변은 가능한 빠르게 답변드리도록 하겠습니다</span>
      </TextWrapper>
      <ReportImg>
        <Img src="img/report.png" alt="report-img" />
      </ReportImg>
      <Link to="/">
        <Button>
          <span>메인 바로가기</span>
          <MoveIcon>
            <Img src="img/move.png" alt="move-to-main" />
          </MoveIcon>
        </Button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;

  h4 {
    font-weight: 700;
    font-size: 24px;
    color: #ff445e;
    margin-top: 58px;
  }

  p {
    font-size: 24px;
    font-weight: 400;
    color: #4f4e5c;
    margin-top: 15px;
  }
`;

const CheckImg = styled.div`
  width: 41.67px;
  height: 41.67px;
  margin-top: 14px;
`;

const TextWrapper = styled.div`
  width: 394px;
  height: 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 19px;

  span {
    font-weight: 400;
    font-size: 18px;
    margin-top: 5px;
  }
`;

const ReportImg = styled.div`
  width: 83px;
  height: 111px;
  margin-top: 40px;
`;

const Button = styled.button`
  width: 170px;
  height: 43px;
  background-color: #ff445e;
  color: #ffffff;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const MoveIcon = styled.div`
  width: 16.67px;
  height: 16.67px;
  margin-left: 10px;
`;

export default InquireSuccess;
