import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Img, MainButton, Popup } from '../../components';
import {
  Imgs as ImgsComponent,
  Infomation,
  Body as TextEditor,
} from './component';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { useParams } from 'react-router-dom';

interface Props {
  popupView: boolean;
  handleAxios: (e: React.MouseEvent) => void;
}

function Presenter(props: Props) {
  const { popupView, handleAxios } = props;
  const { no } = useParams();
  const { title, price, categoryNo, areaNo, deadline, description } =
    useSelector((state: RootState) => state.createPost.data);

  const writeButtonAble = useMemo(() => {
    return (
      title.length > 2 &&
      16 > title.length &&
      price &&
      categoryNo !== null &&
      areaNo !== null &&
      deadline !== null &&
      description.replace(/<[^>]*>?/g, '').length > 0 &&
      description.replace(/<[^>]*>?/g, '').length < 1000
    );
  }, [title, price, categoryNo, areaNo, deadline, description]);

  const popupClose = () => {
    window.location.replace('/boards/categories/1');
  };

  return (
    <>
      <Container>
        <ImgsWrapper>
          <p className="page-title">게시글 {no ? '수정' : '작성'}</p>
          <ImgsComponent />
        </ImgsWrapper>
        <div>
          <WriteButton>
            <MainButton
              aria-label="write"
              type="button"
              able={Boolean(writeButtonAble)}
              onClick={handleAxios}
            >
              <p>{no ? '수정' : '작성'}</p>
              <div className="img-wrap">
                <Img src="/img/write.png" />
              </div>
            </MainButton>
          </WriteButton>
          <Infomation />
        </div>
      </Container>
      <TextEditor />
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
  .markBox {
    border-right: 2px solid #e7e7e8;
  }
`;

const ImgsWrapper = styled.div`
  width: fit-content;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;
  .page-title {
    height: 36px;
    font-family: 'Bold';
    font-size: 28px;
    color: #4f4e5c;
  }
`;

const WriteButton = styled.div`
  width: 100px;
  height: 42px;
  margin: 0px 0px 16px 636px;
  .img-wrap {
    width: 15px;
    height: 15px;
  }
`;
