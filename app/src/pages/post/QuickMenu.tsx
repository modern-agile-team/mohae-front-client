import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import { color, font, radius } from '../../styles';
import { Props } from './Container';
import PostWriter from './PostWriter';

// target, 카테고리, 제목, d-day, 지역, 작성자여부, 좋아요, 조회수, 가격
interface PostInfoProps extends Props {
  quickMenu?: boolean;
  close: () => void;
  likeCount: number;
  setLikeCount: Dispatch<SetStateAction<number>>;
}

function PostInfo(props: PostInfoProps) {
  const { data, close, likeCount, setLikeCount } = props;
  const datas = data.response.board;

  const showDDAYContent = () => {
    if (!datas.isDeadline) {
      if (datas.decimalDay !== null) {
        return css`
          background-color: ${color.subtle};
          color: ${color.main};
          content: 'D ${datas.decimalDay}';
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

  const common = css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    width: 1128px;
    background-color: white;
    border-radius: 0px 0px 6px 6px;
    box-shadow: 0px 4px 4px 0px #0000001a;
    padding: 0px 24px 20px 24px;
    color: ${color.dark1};
    .title {
      margin-top: 20px;
      display: flex;
      align-items: center;
      height: 21px;
      ${font.size[16]}
      ${font.weight[700]}
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
      ${font.size[14]}
      ${font.weight[400]}
      height: 24px;
      :after {
        content: '${datas.price ? '원' : ''}';
        margin: 0px 0px 0px 4px;
      }
    }
    .userData {
      margin-right: 16px;
    }
  `;

  return (
    <div className={cx(common)}>
      <div>
        <p className='title'>{datas.title}</p>
        <p className='price'>
          {datas.price ? datas.price.toLocaleString() : '무료'}
        </p>
      </div>
      <PostWriter
        close={close}
        data={data}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
      />
    </div>
  );
}

export default PostInfo;
