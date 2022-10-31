import React from 'react';
import styled from '@emotion/styled';
import { RecommendProps } from '../../../../../types/main/secondPage/type';

function Recommend(props: RecommendProps) {
  const { imgUrl, text } = props;

  return (
    <Container>
      <ImgContainer imgUrl={imgUrl} />
      <DescriptionContainer>
        <div>{text.first}</div>
        <div>{text.second}</div>
      </DescriptionContainer>
    </Container>
  );
}

export default Recommend;

const Container = styled.article``;

const ImgContainer = styled.div<{ imgUrl: { default: string; hover: string } }>`
  width: 360px;
  height: 270px;
  margin: 0 0 32px;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  background: url(${props => props.imgUrl.default}) no-repeat center/contain;
  transition: 0.3s all ease-in-out;
  :hover {
    background: url(${props => props.imgUrl.hover}) no-repeat center/contain;
  }
`;

const DescriptionContainer = styled.div`
  max-width: 360px;
  max-height: 54px;
  overflow: hidden;
  line-height: 27.2px;
`;
