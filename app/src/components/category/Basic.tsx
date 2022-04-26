import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  [key: string]: boolean | any | string;
}

function Basic(props: Props): ReactElement {
  const commonStyle = css`
    ${radius.circle};
    width: 100%;
    height: 100%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    ${shadow.normal}
    & + & {
      margin-bottom: 12px;
    }
  `;

  const text = css`
    height: 16px;
    color: ${color.dark1};
    ${font.size[16]}
    ${font.weight.regular}
  `;
  const img = {
    big: css`
      background: url(${props.img}) no-repeat center/contain;
      width: 25%;
      height: 25%;
    `,
  };

  const size = {
    big: css`
      width: 100%;
      height: 100%;
    `,
  };
  const eventStyle = {
    big: css`
      :hover {
        background-color: ${color.subtle};
      }
      :active {
        background-color: ${color.lighter};
      }
    `,
  };

  return (
    <Link
      to={`/board/${props.name}`}
      // url 이동 경로
      className={cx(commonStyle, size.big, eventStyle.big)}
    >
      <div className={cx(img.big)} />
      <span className={cx(text)}>{props.name || 'Category'}</span>
    </Link>
  );
}

export default Basic;
