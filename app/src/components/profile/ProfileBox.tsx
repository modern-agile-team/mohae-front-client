/** @format */

import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import { profile } from 'console';
import { useState } from 'react';
import { shadow, radius } from '../../styles';
import Img from '../img/Img';

interface Props {
  [key: string]: boolean | number | any;
  profileForm: FormData;
}

function ProfileBox(props: Props) {
  const { img, size, smallShadow, noneClick, profileForm } = props;
  const [profileImage, setProfileImage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;

    if (file) {
      setProfileImage(URL.createObjectURL(file[0]));
      profileForm.delete('image');
      profileForm.append('image', file[0]);
    }
  };

  const onBasicImgChange = () => {
    setProfileImage('/img/profile.png');
    profileForm.delete('image');
    const file = new File(['profile.png'], 'profile.png', {
      type: 'image/jpg',
    });
    profileForm.append('image', file);
  };

  const profileImg = img !== null ? img : '/img/profile.png';

  const image = css`
    background: url(${profileImage ? profileImage : profileImg}) no-repeat
      center/cover;
    ${radius.circle};
    ${smallShadow ? shadow.button : shadow.normal};
    width: ${size}px;
    height: ${size}px;

    :hover {
      cursor: ${noneClick || 'pointer'};
    }
  `;

  const imgUpdateBtn = css`
    width: 30px;
    height: 30px;
    ${radius.circle};
    ${shadow.normal};
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
    margin-left: 128px;
    :hover {
      cursor: pointer;
    }
  `;

  const editPhotoImg = css`
    width: 20px;
    height: 20px;
  `;

  return (
    <>
      <div className={cx(image)}></div>
      <div className={cx(imgUpdateBtn)}>
        <img
          className={cx(editPhotoImg)}
          alt="editPhoto"
          src="/img/camera.png"
          onClick={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <ChangeOption>
          <Close onClick={() => setIsOpen(false)}>
            <Img src="/img/close.png" />
          </Close>
          <Option>
            <Input
              type="file"
              id="files"
              accept="image/jpeg,image/gif,image/png"
              onChange={onChange}
            />
            <label htmlFor="files">
              <span>기기에서 이미지 선택</span>
            </label>
          </Option>
          <Option onClick={onBasicImgChange}>
            <span>기본 이미지로 변경</span>
          </Option>
        </ChangeOption>
      )}
    </>
  );
}

const Input = styled.input`
  display: none;
`;

const ChangeOption = styled.div`
  width: 160px;
  height: 80px;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 0px #84838d;
  border-radius: 6px;
  position: absolute;
`;
const Option = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #fcf3f4;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    color: #84838d;
    cursor: pointer;
  }
`;

const Close = styled.div`
  width: 14px;
  height: 14px;
  position: absolute;
  right: 5px;
  top: 3px;
  cursor: pointer;
`;

export default ProfileBox;
