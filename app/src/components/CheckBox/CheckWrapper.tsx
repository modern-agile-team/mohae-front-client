import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import Img from '../img/Img';
import { ArticleType } from '../../pages/login/register/Agreement';

interface Props {
  children: JSX.Element;
  article: ArticleType;
  onCheck: (id: number) => void;
  index: number;
  showContent: boolean;
  setShowContent: Dispatch<SetStateAction<{ [key: number]: boolean }>>;
}

const CheckWrapper = ({
  children,
  article,
  onCheck,
  showContent,
  setShowContent,
  index,
}: Props) => {
  const handleContentsOpen = () => {
    setShowContent(prev => {
      return { ...prev, [index]: !showContent };
    });
  };
  return (
    <Wrapper>
      <CheckWrrpaer>
        <CheckItem
          onClick={() => {
            onCheck(article.id);
          }}
        >
          <div id="wrap">
            {article.checked ? (
              <CheckDone>
                <Img src={'/img/check.png'} alt="checking-icon" />
              </CheckDone>
            ) : (
              <CheckBox />
            )}
            <span>{article.title}</span>
          </div>
        </CheckItem>
        <Image>
          <Img
            src={
              showContent
                ? '/img/arrow-up-dark3.png'
                : '/img/arrow-down-dark3.png'
            }
            onClick={handleContentsOpen}
          />
        </Image>
      </CheckWrrpaer>
      <ContentWrapper showContent={showContent}>
        <Content showContent={showContent} onClick={() => console.log('1', 1)}>
          {children}
        </Content>
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
  justify-content: space-between;
`;

const CheckItem = styled.div`
  #wrap {
    display: flex;
    align-items: center;
    flex: 1;
  }

  span {
    font-weight: 400;
    font-size: 14px;
    color: #84838d;
    margin-left: 8px;
    cursor: pointer;
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
  cursor: pointer;

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
const ContentWrapper = styled.div<{ showContent: boolean }>`
  width: 100%;
  margin-top: 7px;
  padding: ${props => (props.showContent ? '3px' : '0px')};
  background-color: #ffffff;
`;
const Content = styled.div<{ showContent: boolean }>`
  width: 469px;
  height: ${props => (props.showContent ? '168px' : '0px')};
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
