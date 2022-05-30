/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { Snap, Category, Img } from '../../components';

interface Props {
  [key: string]: any;
}

export default function Part2(props: Props) {
  const style = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: calc((100vh - 59px - 448px) / 2) 0;

    .title {
      font-weight: 700;
      font-size: 28px;
      line-height: 130%;
      color: ${color.dark1};
      margin: 0 0 56px;
    }

    .container {
      width: 100%;
      height: fit-content;
      padding: 0 calc((100% - 1128px) / 2);
      display: flex;
      justify-content: space-between;
    }

    .img {
      width: 360px;
      height: 270px;
      margin: 0 0 32px;
      background-color: white;
      ${radius[6]};
    }

    .description {
      max-width: 360px;
      max-height: 54px;
      overflow: hidden;
      line-height: 27.2px;
    }
  `;

  const page = (
    <div className={cx(style)}>
      <span className={'title'}>{'이런 사람들이 사용하면 좋아요!'}</span>
      <div className={'container'}>
        <div>
          <div className={'img'}>
            <Img src={'img/category-3.png'} />
          </div>
          <div className={'description'}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            dolore obcaecati debitis voluptate, voluptatum vero nobis nemo,
            soluta laborum cum quos, aspernatur rerum perspiciatis aliquam
            tempore incidunt totam sit impedit.
          </div>
        </div>
        <div>
          <div className={'img'}>
            <Img src={'img/category-3.png'} />
          </div>
          <div className={'description'}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            dolore obcaecati debitis voluptate, voluptatum vero nobis nemo,
            soluta laborum cum quos, aspernatur rerum perspiciatis aliquam
            tempore incidunt totam sit impedit.
          </div>
        </div>
        <div>
          <div className={'img'}>
            <Img src={'img/category-3.png'} />
          </div>
          <div className={'description'}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            dolore obcaecati debitis voluptate, voluptatum vero nobis nemo,
            soluta laborum cum quos, aspernatur rerum perspiciatis aliquam
            tempore incidunt totam sit impedit.
          </div>
        </div>
      </div>
    </div>
  );

  return <>{page}</>;
}
