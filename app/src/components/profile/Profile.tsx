import { css, cx } from '@emotion/css';
import { shadow, radius } from '../../styles';

interface Props {
  [key: string]: boolean | string;
}

function Profile(props: Props) {
  //  더미 사용
  const profileImg = props.isLogin
    ? 'https://i.ibb.co/qjtcKYZ/profile.png'
    : '/img/profile.png';

  const commonStyle = css`
    background: white url(${profileImg}) no-repeat center/cover;
    ${radius.circle};
    ${shadow.normal};
  `;

  const hover = css`
    &:hover {
      cursor: pointer;
    }
  `;

  const size = {
    '43': css`
      ${commonStyle}
      width:43px;
      height: 43px;
    `,
    '45': css`
      ${commonStyle}
      ${shadow.button}
      width:45px;
      height: 45px;
    `,
    '60': css`
      ${commonStyle}
      width:60px;
      height: 60px;
    `,
    '146': css`
      ${commonStyle}
      width:146px;
      height: 146px;
    `,
    '150': css`
      ${commonStyle}
      width:150px;
      height: 150px;
    `,

    '160': css`
      ${commonStyle}
      width:160px;
      height: 160px;
    `,
  };

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
  `;

  const editPhotoImg = css`
    width: 20px;
    height: 20px;
  `;

  const inMyPageEdit = () => {
    return (
      <>
        <div className={cx(size[160])}></div>
        <div
          className={cx(imgUpdateBtn, hover)}
          onClick={() => alert('이미지 수정 버튼 클릭')}>
          <img
            className={cx(editPhotoImg)}
            alt="editPhoto"
            src="/img/camera.png"
          />
        </div>
      </>
    );
  };

  interface Check {
    [key: string]: string | string[];
  }

  const check: Check = {
    inHeader: [size[43], hover],
    inReview: [size[45], hover],
    inWriterInfo: [size[60], hover],
    inMyPage: size[146],
    inOtherProfile: size[150],
  };

  const finalStyle = Object.keys(props)
    .filter((prop) => Object.keys(check).includes(prop))
    .map((attr) => check[attr]);

  const show = () => {
    return Object.keys(props).includes('inMyPageEdit') ? (
      inMyPageEdit()
    ) : (
      <div className={cx(...finalStyle)}></div>
    );
  };

  return show();
}

export default Profile;
