/** @format */

import { color, radius, font, shadow } from '../../styles';
import { css, cx } from '@emotion/css';
import Img from '../img/Img';
import MarkBox from '../markbox/MarkBox';

interface Props {
  [key: string]: any;
}

export default function NewPost({ page, no }: Props) {
  const D_Day = '마감';
  const img = 'img/heart-filled-main.png';
  const check: { [key: string]: any } = {
    inMain: {
      size: '208',
      fontSize: '14',
    },
    inBoard: {
      size: '152',
      fontSize: '12',
      padding: css`
        padding: 8px 12px;
      `,
      maxUser: css`
        max-width: 152px;
      `,
    },
    inSpec: {
      size: '120',
      fontSize: '14',
      padding: css`
        padding: 16px;
      `,
      maxUser: css`
        max-width: 196px;
      `,
    },
    inReview: {
      size: '97',
      fontSize: '12',
      padding: css`
        padding: 8px;
      `,
      maxUser: css`
        max-width: 157px;
        * {
          height: 17px;
        }
      `,
      mark: css`
        top: 8px;
        right: 8px;
      `,
    },
  };

  const style = css`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: visible;

    .mark-box {
      position: absolute;
      top: 16px;
      right: 16px;
      ${check[page].mark}
    }

    .img {
      width: 100%;
      height: ${`${check[page].size}px`};
      overflow: hidden;
      transition: 0.3s all ease-in-out;
      transform: scale(1);
      :hover {
        & > * {
          transition: 0.3s all ease-in-out;
          transform: scale(1.2);
        }
      }
    }

    .info {
      ${shadow.normal}
      height: ${`calc(100% - ${check[page].size}px)`};
      padding: 14px 16px;
      /* ${radius[6]} */
      ${check[page].padding}
      display: flex;
      justify-content: space-between;
      align-items: center;

      * {
        font-size: ${`${check[page].fontSize}px`};
        line-height: 170%;
      }

      .user {
        width: 168px;
        ${check[page].maxUser}
        height: fit-content;
        * {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .title {
          ${font.weight[700]}
          max-width: 168px;
          margin: 0;
        }
      }

      .price {
        width: 90px;
        height: 27px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        * {
          font-size: ${`${Number(check[page].fontSize) + 2}px`};
          ${font.weight[700]}
        }
        .won {
          font-size: ${`${check[page].fontSize}px`};
          ${font.weight[400]}
        }
      }
    }
  `;

  const info = (page === 'inMain' || page === 'inBoard') && (
    <div className={'writer'}>{'한결'}</div>
  );

  const price = (page === 'inMain' || page === 'inBoard') && (
    <div className={'price '}>
      <div>{'1,000,000'}</div>
      <div className={'won'}>{'원'}</div>
    </div>
  );

  const markBox =
    page === 'inMain' || page === 'inBoard' ? (
      <MarkBox small hover style={{ shape: '?', state: 'disable' }} />
    ) : (
      <MarkBox small style={{ shape: '?', state: 'able' }} />
    );

  return (
    <div className={cx(style)}>
      <div className={'img'}>
        <Img src={img || 'img/logo.png'} />
      </div>
      <div className={'info'}>
        <div className={'user'}>
          <div className={'title'}>{'제목입니다~'}</div>
          {info}
        </div>
        {price}
      </div>
      <div className={'mark-box'}>{markBox}</div>
    </div>
  );
}
