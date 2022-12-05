import React from 'react';
import styled from '@emotion/styled';
import { Categories, Img, Search } from '../../../../components';

function Presenter() {
  return (
    <Container>
      <MainWrapper>
        <span className="first-desc">도움이 필요할 땐,</span>
        <SiteTextWrapper>
          <span className="focus">모</span>
          <span>두의</span>
          <span className="focus">해</span>
          <span>결사</span>
        </SiteTextWrapper>
        <div className="description">
          자신의 재능으로 도움이 필요한 사람들을 도와주고 나에게 없는 재능이
          필요할 때 도움을 받아요.
        </div>
        <InputContainer>
          <div className="main-img" />
          <Search used="main" />
        </InputContainer>
      </MainWrapper>
      <div className="category">
        <Categories num={8} />
      </div>
      <div className="scroll">Scroll</div>
      <div className="arrow-down">
        <Img src={'img/scroll.png'} alt="scroll-down" />
      </div>
    </Container>
  );
}

export default React.memo(Presenter);

const Container = styled.section`
  padding: calc((100vh - 59px - 647px) / 2) calc((100% - 1128px) / 2);
  height: 100vh;
  display: flex;
  flex-direction: column;
  > .category {
    margin-top: 70px;
  }
  > .scroll {
    margin: 32px auto 0;
    font-size: 14px;
    line-height: 170%;
    color: #cacace;
  }
  .arrow-down {
    margin: 0 auto;
    width: 24px;
    height: 24px;
  }
`;

const SiteTextWrapper = styled.div`
  width: fit-content;
  line-height: 87px;
  font-size: 40px;
  color: #4f4e5c;
  margin-bottom: 24px;
  .focus {
    font-size: 60px;
    color: #ff445e;
  }
`;

const InputContainer = styled.div`
  width: 648px;
  position: relative;
  .main-img {
    width: 552px;
    height: 391px;
    position: absolute;
    top: -290px;
    right: -480px;
    background: url('/img/main.png') no-repeat center/contain;
  }
`;

const MainWrapper = styled.div`
  width: 1128px;
  padding: 0 0 78px;
  text-align: start;
  color: #84838d;
  .first-desc {
    line-height: 130%;
    font-size: 28px;
  }
  .description {
    width: 409px;
    font-size: 20px;
    line-height: 170%;
    margin-bottom: 48px;
  }
`;
