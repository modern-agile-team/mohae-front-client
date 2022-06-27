import React from 'react';
import { css, cx } from '@emotion/css';
import { color, font, radius } from '../../styles';

// target, 카테고리, 제목, d-day, 지역, 작성자여부, 좋아요, 조회수, 가격
interface Props {
  quickMenu?: boolean;
  data?: { [key: string]: any };
}

function PostInfo(props: Props) {
  const { quickMenu, data } = props;

  const wrap = css`
    border-bottom: ${!quickMenu && ` 1px solid ${color.light4}`};
    width: ${!quickMenu && '736px'};
    display: flex;
    justify-content: space-between;
    color: ${color.dark1};
    ${font.weight[400]}

    .sectionWrap2 {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      ${font.size[12]}

      div:nth-child(1) {
        display: flex;
        justify-content: end;
        margin-top: 4px;
        cursor: pointer;
        p:nth-child(1) {
          margin-right: 8px;
          padding-right: 8px;
          border-right: 1px solid ${color.light4};
        }
      }
      div:nth-child(2) {
        display: flex;
        p:nth-child(1) {
          margin-right: 16px;
        }
      }
    }
  `;

  const showDDAYContent = () => {
    if (!data?.isDeadline) {
      if (data?.decimalDay !== null) {
        return css`
          background-color: ${color.subtle};
          color: ${color.main};
          content: 'D ${data?.decimalDay}';
        `;
      }
      return css`
        background-color: ${color.main};
        color: white;
        content: '상시';
      `;
    } else {
      return css`
        background-color: ${color.dark1};
        color: white;
        content: '마감';
      `;
    }
  };

  const difContents = () => {
    const common = css`
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        align-items: center;
        :after {
          width: 47px;
          height: 24px;
          ${showDDAYContent()}
          ${font.size[14]}
          ${font.weight[400]}
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2px 0px 0px 16px;
        }
      }
      .price {
        :after {
          content: '${data?.price ? '원' : ''}';
          margin: 0px 0px 0px 4px;
        }
      }
    `;

    const sectionWrap1 = () =>
      !quickMenu
        ? css`
            ${common}
            height: 154px;
            .title {
              ${font.weight[700]}
              ${font.size[24]}
            }
            .price {
              margin-bottom: 16px;
              ${font.size[24]}
              ${font.weight[700]}
            :after {
                ${font.size[22]}
                ${font.weight[400]}
              }
            }
          `
        : css`
            ${common}
            .title {
              ${font.weight[700]}
              ${font.size[16]}
            }
            .price {
              height: 21px;
              ${font.size[14]}
              ${font.weight[700]}
            :after {
                ${font.size[14]}
                ${font.weight[400]}
              }
            }
          `;

    return !quickMenu ? (
      <>
        <div className={cx(sectionWrap1())}>
          <div>
            <p className='coordinates'>
              {data?.target ? '구할래요' : '해줄래요'} {'>'} 카테고리 {'>'}{' '}
              {data?.category}
            </p>
            <p className='title'>{data?.title}</p>
            <p className='area'>{data?.areaName}</p>
          </div>
          <p className='price'>
            {data?.price ? data?.price.toLocaleString() : '무료'}
          </p>
        </div>
        <div className='sectionWrap2'>
          <div className='textBtnWrap'>
            <p>수정하기</p>
            <p>삭제하기</p>
          </div>
          <div className='textBtnWrap'>
            <p>좋아요 {data?.likeCount !== null ? data?.likeCount : 0}개</p>
            <p>조회수 {data?.hit !== null ? data?.hit : 0}회</p>
          </div>
        </div>
      </>
    ) : (
      <div className={cx(sectionWrap1())}>
        <p className='title'>{data?.title}</p>
        <p className='price'>
          {data?.price ? data?.price.toLocaleString() : '무료'}
        </p>
      </div>
    );
  };

  return <div className={cx(wrap)}>{difContents()}</div>;
}

export default PostInfo;
