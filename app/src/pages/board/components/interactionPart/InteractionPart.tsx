import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Categories,
  Img,
  MainButton,
  Popup,
  Search,
} from '../../../../components';
import { categoryList } from '../../../../consts/categoryList';
import { useNavigate, useParams } from 'react-router-dom';
import getToken from '../../../../utils/getToken';
import { InteractionPartProps } from '../../../../types/board/type';

function InteractionPart(props: InteractionPartProps) {
  const { resetPageNation } = props;
  const navigation = useNavigate();
  const { no } = useParams();
  const categoryName = categoryList[Number(no) - 1].name;
  const localUserToken = getToken();
  const [loginPlz, setLoginPlz] = useState(false);

  const controlWriteButton = () => {
    if (localUserToken && localUserToken !== null) {
      navigation('/create/post');
    } else setLoginPlz(prev => !prev);
  };

  return (
    <>
      <CategoryBoard>{`${categoryName} 게시판`}</CategoryBoard>
      <Categories num={7} />
      <FlexWrapper>
        <Search used="board" resetPageNation={resetPageNation} />
        <ButtonWrapper>
          <MainButton type="button" able={true} onClick={controlWriteButton}>
            <p>글쓰기</p>
            <div className="imgWrap">
              <Img src="/img/write.png" />
            </div>
          </MainButton>
        </ButtonWrapper>
      </FlexWrapper>
      <Popup
        visible={loginPlz}
        text1={'게시글 작성은 로그인 후 이용 가능합니다.'}
        overlay={controlWriteButton}
      >
        <PopupButtonWrapper>
          <MainButton
            type="button"
            able={true}
            onClick={() => controlWriteButton}
          >
            닫기
          </MainButton>
        </PopupButtonWrapper>
      </Popup>
    </>
  );
}

export default InteractionPart;

const CategoryBoard = styled.p`
  width: 100%;
  height: 36px;
  font-size: 28px;
  font-family: 'Bold';
  color: #4f4e5c;
  display: flex;
  justify-content: center;
  margin: 40px 0px 48px 0px;
`;

const FlexWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 936px;
  margin: 64px auto 0px;
`;

const ButtonWrapper = styled.div`
  width: 100px;
  height: 43px;
  .imgWrap {
    width: 15px;
    height: 15px;
  }
`;

const PopupButtonWrapper = styled.div`
  width: 74px;
  height: 43px;
`;
