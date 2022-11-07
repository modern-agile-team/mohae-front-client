import React from 'react';
import styled from '@emotion/styled';
import { Img, MainButton, Popup } from '../../components';
import { Body, Imgs, Infomation } from './component';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { useParams } from 'react-router-dom';

interface Props {
  popupView: boolean;
  postingAxios: (e: React.MouseEvent, type: string) => void;
  type: string;
}

function Presenter(props: Props) {
  const { popupView, postingAxios, type } = props;
  const { no } = useParams();
  const { title, price, categoryNo, areaNo, deadline, description } =
    useSelector((state: RootState) => state.createPost.data);

  const writeButtonAble =
    title.length > 2 &&
    16 > title.length &&
    price &&
    categoryNo !== null &&
    areaNo !== null &&
    deadline !== null &&
    description.replace(/<[^>]*>?/g, '').length > 0 &&
    description.replace(/<[^>]*>?/g, '').length < 1000;

  const creationCompleteAction = (e: React.MouseEvent) => {
    postingAxios(e, type);
  };

  const popupClose = () => {
    window.location.replace('/boards/categories/1');
  };

  return (
    <>
      <Container>
        <div className="imgsSection">
          <p className="pageTitle">{no ? '게시글 수정' : '게시글 작성'}</p>
          <Imgs />
        </div>
        <div>
          <div className="write-btn">
            <MainButton
              type="button"
              able={Boolean(writeButtonAble)}
              onClick={creationCompleteAction}
            >
              <p>{no ? '수정' : '작성'}</p>
              <div className="imgWrap">
                <Img src="/img/write.png" />
              </div>
            </MainButton>
          </div>
          <Infomation />
        </div>
      </Container>
      <Body />
      <Popup
        visible={popupView}
        text1={`게시글이 성공적으로 ${no ? '수정' : '작성'}되었습니다.`}
      >
        <ButtonWrapp>
          <MainButton type="button" able onClick={popupClose}>
            닫기
          </MainButton>
        </ButtonWrapp>
      </Popup>
    </>
  );
}

export default Presenter;

const ButtonWrapp = styled.div`
  width: 74px;
  height: 43px;
`;

const Container = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
  font-family: 'Regular';

  .imgsSection {
    width: fit-content;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 40px;
    .pageTitle {
      height: 36px;
      font-family: 'Bold';
      font-size: 28px;
      color: #4f4e5c;
    }
  }

  .left,
  .right {
    width: 368px;
    height: calc(62px * 3);
    input {
      text-align: center;
    }
  }

  .topWrap {
    display: flex;
  }

  .markBoxWrap {
    width: 368px;
    height: 62px;
    border-bottom: 2px solid #e7e7e8;
  }

  .selectBox {
    width: 368px;
    height: 62px;
    border-bottom: 2px solid #e7e7e8;
  }

  .title,
  .price,
  .markBox {
    border-right: 2px solid #e7e7e8;
  }

  .markBoxWrap {
    display: flex;
    margin: none;
  }

  .summary {
    width: 736px;
    height: 262px;
  }
  .write-btn {
    width: 100px;
    height: 42px;
    margin: 0px 0px 16px 636px;
    .imgWrap {
      width: 15px;
      height: 15px;
    }
  }
`;
