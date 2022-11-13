import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useInput } from '../../customhook/useInput';
import { FileUpload } from '../../components/FileUpload/FileUpload';
import { Img } from '../../components';
import { getByteSize } from '../../utils/getByteSize';
import { postQuestion } from '../../apis/postQuestion';
import { useNavigate } from 'react-router-dom';
import QuestionModal from '../../components/modal/QuestionModal';
import getToken from '../../utils/getToken';
import { color } from '../../styles';
import { ACCESS_TOKEN } from '../../consts/tokenKey';

const Inquire = () => {
  const title = useInput(45);
  const contents = useInput(500);
  const [fileData, setFileData] = useState<{
    formData: FormData;
    fileName: string;
    size: number;
  }>({
    formData: new FormData(),
    fileName: '',
    size: 0,
  });
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = getToken(ACCESS_TOKEN);

  const onSubmit = async () => {
    if (!token) {
      setModal(true);
      return;
    }
    if (title.value.length && contents.value.length === 0) return;
    fileData.formData.set(`title`, JSON.stringify(title.value));
    fileData.formData.set('description', JSON.stringify(contents.value));

    try {
      setLoading(true);
      const response = await postQuestion(fileData.formData);

      if (response.success) navigate('/success');
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setModal(true);
    }
  }, [token]);

  return (
    <>
      {loading ? (
        <LoadingWrapper>
          <LoadingImg>
            <Img src="/img/loading.gif" alt="loading" />
          </LoadingImg>
        </LoadingWrapper>
      ) : (
        <Wrapper>
          <h3>문의하기</h3>
          {token ? (
            <span>Modern@gmail.com</span>
          ) : (
            <span>로그인 후 이용할 수 있는 서비스입니다</span>
          )}
          <TitleInput
            placeholder="문의제목을 입력해주세요. (3~45자)"
            {...title}
          />
          <Contents>
            <TextWrapper>
              <Text
                placeholder="문의내용을 입력해주세요. (최대 500자)"
                {...contents}
              />
            </TextWrapper>
            <TextLength>
              <span>{`${contents.value.length}/500`}</span>
            </TextLength>
          </Contents>

          {fileData.fileName !== '' ? (
            <FileStorage>
              <span>{fileData.fileName}</span>
              <p>{getByteSize(fileData.size)}</p>
              <CloseImg
                onClick={() =>
                  setFileData({
                    formData: new FormData(),
                    fileName: '',
                    size: 0,
                  })
                }
              >
                <Img src="/img/close.png" alt="close-modal" />
              </CloseImg>
            </FileStorage>
          ) : (
            <FileWrapper>
              <AddFile>
                <span>첨부파일을 추가해주세요.</span>
              </AddFile>
              <FileUpload fileData={fileData} setFileData={setFileData} />
            </FileWrapper>
          )}

          <ExplainWrapper>
            <span>첨부한 파일의 전체 크기는 5Mbyte 미만이어야 합니다.</span>
            <span>
              파일첨부는 JPG, GIF, PSD, MS Office 파일, 한글, PDF만 가능합니다.
            </span>
          </ExplainWrapper>
          <SubmitButton
            titleValue={title.value}
            contentsValue={contents.value}
            onClick={() => onSubmit()}
          >
            제출
          </SubmitButton>
          <QuestionModal visible={modal} close={() => setModal(false)} />
        </Wrapper>
      )}
    </>
  );
};

export default Inquire;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32px;

  h3 {
    font-size: 28px;
    font-weight: 700;
    display: block;
    margin-bottom: 30px;
    color: #4f4e5c;
  }

  span {
    display: block;
    font-weight: 700;
    font-size: 14px;
    color: #4f4e5c;
  }
`;

const TitleInput = styled.input`
  width: 540px;
  height: 56px;
  border-radius: 6px;
  padding: 16px;
  margin-top: 25px;
  box-shadow: 0px 0px 8px 0px rgba(132, 131, 141, 0.2);
  font-weight: 400;
  font-size: 14px;
  color: #4f4e5c;

  ::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: #84838d;
  }
`;

const Contents = styled.div`
  width: 540px;
  height: 156px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px rgba(132, 131, 141, 0.2);
  background-color: #ffffff;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 80%;
  padding: 15px;
`;

const Text = styled.textarea`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 7px;
  font-weight: 400;
  font-size: 14px;
  color: #4f4e5c;
`;

const TextLength = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  span {
    font-size: 12px;
    font-weight: 400;
    color: #84838d;
    margin-right: 13px;
  }
`;
const FileWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const AddFile = styled.div`
  width: 438px;
  height: 49px;
  box-shadow: 0px 0px 8px 0px rgba(132, 131, 141, 0.2);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border-radius: 6px;
  margin-right: 13px;
  span {
    color: #84838d;
    font-size: 12px;
    font-weight: 400;
    margin-left: 16px;
  }
`;

const ExplainWrapper = styled.div`
  width: 540px;
  margin-top: 15px;
  span {
    display: block;
    font-weight: 400;
    font-size: 12px;
    color: #84838d;
  }
`;

const SubmitButton = styled.button<{
  titleValue: string;
  contentsValue: string;
}>`
  width: 480px;
  height: 52px;
  background-color: ${props =>
    props.titleValue.length && props.contentsValue.length > 0
      ? '#FF445E'
      : '#E7E7E8'};
  border-radius: 6px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  margin-top: 70px;
  margin-bottom: 90px;
  &:active {
    background-color: ${color.lighter};
  }
`;

const FileStorage = styled.div`
  width: 540px;
  height: 56px;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 0px rgba(132, 131, 141, 0.2);
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding-left: 20px;

  span {
    color: #4f4e5c;
    font-size: 14px;
    font-weight: 400;
    flex: 1;
  }

  p {
    color: #84838d;
    font-size: 14px;
    font-weight: 400;
    margin-right: 19px;
  }
`;

const CloseImg = styled.div`
  width: 22px;
  height: 22px;
  color: #4f4e5c;
  cursor: pointer;
  margin-right: 12px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoadingImg = styled.div`
  width: 350px;
  height: 450px;
`;
