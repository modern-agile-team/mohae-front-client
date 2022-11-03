import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { PresenterProps } from '../../../../types/main/snapScroll/type';

function Presenter(props: PresenterProps) {
  const { contents, wheelHandler, snapPageNumber, setSnapPageNumber } = props;
  const clickCircle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSnapPageNumber(Number(e.currentTarget.name));
  };

  const circleButtons = contents.map((_, index) => {
    return index ? (
      <CircleButton
        key={index}
        name={String(index)}
        target={snapPageNumber === index}
        onClick={clickCircle}
      />
    ) : (
      <Fragment key={index}></Fragment>
    );
  });

  const showSnap = contents.map((_, index) => {
    return (
      <PageContentWrap index={index} key={String(index)}>
        {contents[index]}
      </PageContentWrap>
    );
  });

  return (
    <Container>
      <CircleWrapper snapPageNumber={snapPageNumber}>
        {circleButtons}
      </CircleWrapper>
      <div className="snap-container" onWheel={wheelHandler}>
        <ContentsBox contents={contents} snapPageNumber={snapPageNumber}>
          {showSnap}
        </ContentsBox>
      </div>
    </Container>
  );
}

export default Presenter;

const Container = styled.div`
  overflow: auto;
  height: fit-content;
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;

  .snap-container {
    overflow: hidden;
    height: calc(100vh - 59px);
    &::-webkit-scrollbar {
      display: none;
    }
    position: relative;
  }
`;

const ContentsBox = styled.div<{
  contents: React.ReactNode[];
  snapPageNumber: number;
}>`
  height: calc(100% * ${props => props.contents.length});
  transition: all 0.8s cubic-bezier(0.61, 0.31, 0.36, 0.69);
  transform: translateY(
    calc(calc(100vh - 59px) * ${props => -Number(props.snapPageNumber)})
  );
`;

const PageContentWrap = styled.div<{ index: number }>`
  height: calc(100vh - 59px);
  text-align: center;
  background-color: ${props => (props.index % 2 ? '#EDEDEF' : '#F9F9F9')};
`;

const CircleWrapper = styled.div<{ snapPageNumber: number }>`
  position: fixed;
  z-index: 3;
  top: 50%;
  right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 27px;
  height: 74px;
  visibility: ${props => (props.snapPageNumber ? 'visible' : 'hidden')};
`;

const CircleButton = styled.button<{ target: boolean }>`
  width: ${props => (props.target ? '14px' : '8px')};
  height: ${props => (props.target ? '14px' : '8px')};
  border-radius: 50%;
  background-color: ${props => (props.target ? '#ff445e' : '#e7e7e8')};
  transition: all 0.5s;
`;
