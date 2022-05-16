import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { ReactElement } from 'react';
import Img from '../img/Img';
import { Link } from 'react-router-dom';

interface Props {
  [key: string]: any;
}

function Basic(props: Props): ReactElement {
  const style = css`
    ${radius[6]}
    width: 100%;
    height: 100%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: visible;

    .icon {
      width: 48px;
      height: 48px;
      margin-bottom: 4px;
    }

    span {
      height: 16px;
      color: ${color.dark1};
      ${font.size[16]}
      ${font.weight.regular}
    }
  `;

  const event_style = {
    big: css`
      :hover {
        background-color: white;
      }
      :active {
        background-color: ${color.lighter};
      }
    `,
  };

  return (
    <Link to={`/board/${props.name}`} className={cx(style, event_style.big)}>
      <div className={'icon'}>
        <Img src={props.img} />
      </div>
      <span>{props.name || 'Category'}</span>
    </Link>
  );
}

export default Basic;
