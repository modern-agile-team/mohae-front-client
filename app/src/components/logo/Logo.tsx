import { css, cx } from '@emotion/css';
import { Link } from 'react-router-dom';

interface Props {
  [key: string]: boolean;
}

interface Check {
  [key: string]: string;
}

function Logo(props: Props) {
  const commonStyle = css`
    background: url('/img/logo.png') no-repeat center/cover;
  `;

  const place = {
    inReport: css`
      ${commonStyle}
      width: 53px;
      height: 40px;
    `,
    inHeader: css`
      ${commonStyle}
      width: 57px;
      height: 43px;
    `,
    inModal: css`
      ${commonStyle}
      width: 66px;
      height: 50px;
    `,
    inSpec: css`
      ${commonStyle}
      width: 105px;
      height: 80px;
    `,
    inPost: css`
      ${commonStyle}
      width: 160px;
      height: 121px;
    `,
  };

  const inHeader = () => {
    return (
      <Link to="/">
        <div className={cx(place.inHeader)}></div>
      </Link>
    );
  };

  const check: Check = {
    inReport: place.inReport,
    inHeader: place.inHeader,
    inModal: place.inModal,
    inSpec: place.inSpec,
    inPost: place.inPost,
  };

  const finalStyle = Object.keys(props)
    .filter((prop) => Object.keys(check).includes(prop))
    .map((attr) => check[attr]);

  const show = () => {
    return Object.keys(props).includes('inHeader') ? (
      inHeader()
    ) : (
      <div className={cx(...finalStyle)}></div>
    );
  };

  return show();
}

export default Logo;
