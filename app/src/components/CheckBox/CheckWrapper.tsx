import React, { useState } from 'react';
import styled from '@emotion/styled';
import Img from '../img/Img';
import { FirstArticle } from '../../utils/Article';
import { ArticleType } from '../../pages/login/register/Agreement';
import { on } from 'events';

interface Props {
  children: JSX.Element;
  article: ArticleType;
  onCheck: (id: number) => void;
}

const CheckWrapper = ({ children, article, onCheck }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <Wrapper>
      <CheckWrrpaer>
        <CheckItem>
          {article.checked ? (
            <CheckDone onClick={() => onCheck(article.id)}>
              <Img src={'/img/check.png'} />
            </CheckDone>
          ) : (
            <CheckBox onClick={() => onCheck(article.id)} />
          )}
          <span>{article.title}</span>
        </CheckItem>
        <Image>
          <Img
            src={show ? '/img/arrow-up-dark3.png' : '/img/arrow-down-dark3.png'}
            onClick={() => setShow(!show)}
          />
        </Image>
      </CheckWrrpaer>
      <ContentWrapper show={show}>
        <Content show={show}>{children}</Content>
      </ContentWrapper>
    </Wrapper>
  );
};

export default CheckWrapper;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckWrrpaer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const CheckItem = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  span {
    font-weight: 400;
    font-size: 14px;
    color: #84838d;
    margin-left: 8px;
  }
`;
const CheckBox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px #84838d;
  cursor: pointer;
`;
const CheckDone = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  box-shadow: 0px 0px 4px 0px #84838d;
  background-color: #ff445e;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 8px;
    height: 8px;
  }
`;

const Image = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentWrapper = styled.div<{ show: boolean }>`
  width: 100%;
  margin-top: 7px;
  padding: ${props => (props.show ? '3px' : '0px')};
  background-color: #ffffff;
`;
const Content = styled.div<{ show: boolean }>`
  width: 469px;
  height: ${props => (props.show ? '168px' : '0px')};
  background-color: #ffffff;
  overflow-y: auto;
  transition: height 0.4s;

  span {
    font-weight: 700;
    font-size: 14px;
    color: #84838d;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    color: #84838d;
  }
`;
