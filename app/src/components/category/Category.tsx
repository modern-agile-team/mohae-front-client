/** @format */

import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { ReactElement } from 'react';
import Img from '../img/Img';
import { Link } from 'react-router-dom';

interface Props {
  [key: string]: any;
}

export default function Category({
  shape,
  name,
  img,
  id,
  className,
  onClick,
}: Props): ReactElement {
  const style: { [key: string]: any } = {
    circle: css`
      ${radius[6]}
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

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
      :hover {
        background-color: white;
      }
      :active {
        background-color: ${color.lighter};
      }
    `,
    square: css`
      ${radius[6]}
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      :hover {
        :after {
          content: '${name}';
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          font-size: 14px;
          line-height: 170%;
          width: 100%;
          height: 100%;
          ${radius[6]}
          line-height: 170%;
          background-color: white;
          top: 0;
          left: 0;
          color: ${color.dark1};

          ${font.weight[700]}
        }
      }
      .icon {
        width: 32px;
        height: 32px;
      }
    `,
    row: css`
      ${radius[6]};
      ${shadow.normal};
      width: 100px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      ${className};
    `,
  };

  return !(shape === 'row') ? (
    <Link to={`/boards/${id}`} className={cx(style[shape])}>
      {!(shape === 'row') && (
        <div className={'icon'}>
          <Img src={img} />
        </div>
      )}
      {!(shape === 'square') && <div>{name || 'Category'}</div>}
    </Link>
  ) : (
    <button id={id} name={name} onClick={onClick} className={cx(style[shape])}>
      {name || 'Category'}
    </button>
  );
}
