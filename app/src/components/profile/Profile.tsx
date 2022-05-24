import { css, cx } from '@emotion/css';
import { shadow, radius } from '../../styles';

interface Props {
  [key: string]: boolean | number | any;
}

function Profile(props: Props) {
  const { img, size, smallShadow, noneClick } = props;
  const profileImg = img !== null ? img : '/img/profile.png';

  const editBtn = size === 160 ? true : false;

  const commonStyle = css`
    background: white url(${profileImg}) no-repeat center/cover;
    ${radius.circle};
    ${shadow.normal};
    width: ${size}px;
    height: ${size}px;
    :hover {
      cursor: ${noneClick || 'pointer'};
    }
  `;

  const smallShadowStyle = css`
    ${shadow.button}
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
      <div
        onClick={!noneClick ? () => alert('프로필 클릭') : undefined}
        className={cx(commonStyle, smallShadow && smallShadowStyle)}></div>
      {editBtn && (
        <div
          className={cx(imgUpdateBtn)}
          onClick={() => alert('이미지 수정 버튼 클릭')}>
          <img
            className={cx(editPhotoImg)}
            alt="editPhoto"
            src="/img/camera.png"
          />
        </div>
      )}
    </>
  );
}

export default Profile;
