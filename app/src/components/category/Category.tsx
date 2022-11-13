/** @format */

import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { ReactElement } from 'react';
import Img from '../img/Img';
import { Link, useLocation, useParams } from 'react-router-dom';

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
  const { no } = useParams();
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
      overflow: hidden;
      > .category-name {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        top: 100%;
        left: 0;
        transition: 0.15s all ease-in-out;
        line-height: 170%;
        color: ${color.dark1};
        ${font.weight[700]};
        background-color: rgba(255, 255, 255, 0.65);
      }

      :hover {
        .category-name {
          transition: 0.2s all ease-in-out;
          transform: translateY(-100%);
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
      font-size: 14px;
      color: ${color.main} !important;
      width: 100px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      ${className};
      :hover {
        background-color: ${color.subtle};
      }
    `,
  };

  return !(shape === 'row') ? (
    <Link to={`/boards/categories/${id}`} className={cx(style[shape])}>
      {!(shape === 'row') && (
        <>
          <div className={'icon'}>
            <Img src={img} alt={`category-icon-${id}`} />
          </div>
          {shape === 'square' && <div className={'category-name'}>{name}</div>}
        </>
      )}
      {!(shape === 'square') && <div>{name || 'Category'}</div>}
    </Link>
  ) : (
    <div id={id} onClick={onClick} className={cx(style[shape])}>
      {name || 'Category'}
    </div>
  );
}
