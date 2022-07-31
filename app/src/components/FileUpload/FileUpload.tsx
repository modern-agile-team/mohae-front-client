import React, { useState } from 'react';
import styled from '@emotion/styled';

interface Props {
  fileData: {
    formData: FormData;
    fileName: string;
    size: number;
  };
  setFileData: React.Dispatch<
    React.SetStateAction<{
      formData: FormData;
      fileName: string;
      size: number;
    }>
  >;
}

export const FileUpload = ({ fileData, setFileData }: Props) => {
  const [fileSize, setFileSize] = useState<number>(0);
  const fileForm = new FormData();
  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files || [];
    if (fileSize + files[0].size > 5 * 1024 * 1024) {
      alert('5MB이상 업로드 할 수 없습니다');
      return;
    } else {
      setFileSize(prev => prev + files[0].size);
    }
    for (let count = 0; count < files.length; count++) {
      fileForm.append('image', files[count]);
      setFileData({
        ...fileData,
        formData: fileForm,
        size: fileSize + files[0].size,
        fileName: files[count].name,
      });
    }
  };

  return (
    <>
      <Input id="input-file" type="file" onChange={e => addImage(e)} multiple />
      <UpLoadButton htmlFor="input-file">
        <span>첨부파일</span>
      </UpLoadButton>
    </>
  );
};
