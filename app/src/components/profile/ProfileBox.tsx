/** @format */

import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import { useState } from 'react';
import { shadow, radius } from '../../styles';

interface Props {
  [key: string]: boolean | number | any;
  profileForm: FormData;
}

function ProfileBox(props: Props) {
  const { img, size, smallShadow, noneClick, profileForm } = props;
  const [profileImage, setProfileImage] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;

    if (file) {
      setProfileImage(URL.createObjectURL(file[0]));
      profileForm.append('image', file[0]);
    }
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
      <Input
        type="file"
        id="files"
        accept="image/jpeg,image/gif,image/png"
        onChange={onChange}
      />
      <label htmlFor="files" className={cx(imgUpdateBtn)}>
        <img
          className={cx(editPhotoImg)}
          alt="editPhoto"
          src="/img/camera.png"
        />
      </label>
    </>
  );
}

const Input = styled.input`
  display: none;
`;

export default ProfileBox;
