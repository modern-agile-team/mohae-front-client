import { css, cx } from '@emotion/css';
import { shadow, radius } from '../../styles';

interface Props {
  [key: string]: boolean;
}

function Profile(props: Props) {
  //  더미 사용
  const profileImg = props.isLogin
    ? 'https://i.ibb.co/qjtcKYZ/profile.png'
    : '/dummyUser.png';

  const commonStyle = css`
    background: no-repeat center/cover;
    background-image: url(${profileImg});
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
      position: relative;
    `,
  };

  const imgUpdateBtn = css`
    width: 30px;
    height: 30px;
    ${radius.circle};
    background-color: red;
    position: absolute;
    right: 2px;
    bottom: 0;
  `;

  return (
    <>
      {props.size43 && <div className={cx(size[43], hover)}></div>}
      {props.size45 && <div className={cx(size[45], hover)}></div>}
      {props.size60 && <div className={cx(size[60], hover)}></div>}
      {props.size146 && <div className={cx(size[146])}></div>}
      {props.size150 && <div className={cx(size[150])}></div>}
      {props.size160 && (
        <div className={cx(size[160])}>
          <div className={cx(imgUpdateBtn, hover)}></div>
        </div>
      )}
    </>
  );
}

export default Profile;
