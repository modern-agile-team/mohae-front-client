import styled from '@emotion/styled';
import Img from '../img/Img';

const Commenter = ({ commenterNickname }: { commenterNickname: string }) => {
  return (
    <Wrapper>
      <div className="left">
        <h3>{commenterNickname}</h3>
        <IconWrapper>
          <Img src="/img/report-main.png" />
        </IconWrapper>
      </div>
      <div className="right">
        <IconWrapper>
          <Img src="/img/group.svg" />
        </IconWrapper>
      </div>
    </Wrapper>
  );
};

export default Commenter;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
  }
  h3 {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 170%;
    color: #4f4e5c;
  }
`;

const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 11px;
`;
