/** @format */

import { css, cx } from '@emotion/css';
import { useState } from 'react';
import { shadow, radius } from '../../styles';
import ModalProfile from './ModalProfile';

interface Props {
  [key: string]: boolean | number | any;
}

function Profile(props: Props) {
  const { img, size, smallShadow, noneClick, userNumber } = props;
  const [userProfileView, setUserProfileView] = useState(false);

  const profileImg = img !== null ? img : '/img/profile.png';

  const editBtn = size === 160 ? true : false;

  const image = css`
    background: url(${profileImg}) no-repeat center/cover;
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

  const openUserProfile = () => {
    setUserProfileView(prev => !prev);
  };

  return (
    <>
      <div
        onClick={!noneClick ? openUserProfile : undefined}
        className={cx(image)}
      ></div>
      {editBtn && (
        <div
          className={cx(imgUpdateBtn)}
          // onClick={() => alert('이미지 수정 버튼 클릭')}
        >
          <img
            className={cx(editPhotoImg)}
            alt="editPhoto"
            src="/img/camera.png"
          />
        </div>
      )}
      {userProfileView && (
        <ModalProfile
          reset={openUserProfile}
          userNo={userNumber}
          view={userProfileView}
        />
      )}
    </>
  );
}

export default Profile;

const overLay = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  background-color: inherit;
`;
