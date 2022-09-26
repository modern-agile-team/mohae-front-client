import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, font } from '../../styles';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Btn, Popup } from '../../components';
import PostWriter from './PostWriter';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import getToken from '../../utils/getToken';
import setInterceptors from '../../apis/common/setInterceptors';
import { customAxios } from '../../apis/instance';

interface PostInfoProps {
  quickMenu?: boolean;
  close: () => void;
}

function PostInfo(props: PostInfoProps) {
  const { quickMenu, close } = props;
  const { response, decoded } = useSelector(
    (state: RootState) => state.post.data,
  );

  const { no } = useParams();
  const [popupView, setPopupView] = useState(false);

  const showDDAYContent = () => {
    if (!response.board.isDeadline) {
      if (response.board.decimalDay !== null) {
        return response.board.decimalDay
          ? css`
              background-color: ${color.subtle};
              color: ${color.main};
              content: 'D ${response.board.decimalDay}';
            `
          : css`
              background-color: ${color.main};
              color: white;
              content: 'D-DAY';
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

  const wrap = css`
    border-bottom: ${!quickMenu && ` 1px solid ${color.light4}`};
    width: ${!quickMenu && '736px'};
    display: flex;
    justify-content: space-between;
    color: ${color.dark1};
    ${font.weight[400]}
    .popup-btn {
      width: 74px;
      height: 43px;
    }

    .sectionWrap-1 {
      display: flex;
      flex-direction: column;
      height: 154px;
      .title {
        display: flex;
        align-items: center;
        ${font.weight[700]}
        ${font.size[24]}
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
        margin-bottom: 16px;
        ${font.size[24]}
        ${font.weight[700]}
            :after {
          ${font.size[22]}
          ${font.weight[400]}
        }
        :after {
          content: '${response.board.price ? '원' : ''}';
          margin: 0px 0px 0px 4px;
        }
      }
    }

    .sectionWrap-2 {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      ${font.size[12]}

      div:nth-of-type(1) {
        display: flex;
        justify-content: end;
        margin-top: 4px;
        cursor: pointer;
        visibility: ${decoded && decoded.userNo === response.board.userNo
          ? 'visible'
          : 'hidden'};
        p:nth-of-type(1) {
          margin-right: 8px;
          padding-right: 8px;
          border-right: 1px solid ${color.light4};
        }
      }
      div:nth-of-type(2) {
        display: flex;
        p:nth-of-type(1) {
          margin-right: 16px;
        }
      }
    }
  `;

  const showPopup = () => {
    return (
      popupView && (
        <Popup
          visible={popupView}
          text1={'정말 삭제 하시겠습니까? '}
          text2={'삭제 시 게시판으로 이동합니다.'}
        >
          <div className="popup-btn">
            <Btn white onClick={() => setPopupView(false)}>
              닫기
            </Btn>
          </div>
          <div className="popup-btn">
            <Btn main onClick={deletePost}>
              삭제하기
            </Btn>
          </div>
        </Popup>
      )
    );
  };

  const deletePost = () => {
    setInterceptors(customAxios)
      .delete(`https://mo-hae.site/boards/${no}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    window.location.replace('/boards/categories/1');
  };

  return (
    <>
      <div className={cx(wrap)}>
        <div className="sectionWrap-1">
          {showPopup()}
          <div>
            <p className="coordinates">
              {response.board.target ? '구할래요' : '해줄래요'} {'>'} 카테고리{' '}
              {'>'} {response.board.categoryName}
            </p>
            <p className="title">{response.board.title}</p>
            <p className="area">
              {response.board.areaName
                ? response.board.areaName
                : '지역 선택 없음'}
            </p>
          </div>
          <p className="price">
            {response.board.price
              ? response.board.price.toLocaleString()
              : '무료'}
          </p>
        </div>
        <div className="sectionWrap-2">
          <div className="textBtnWrap">
            <Link to={`/edit/post/${response.board.no}`}>
              <p>수정하기</p>
            </Link>
            <p onClick={() => setPopupView(true)}>삭제하기</p>
          </div>
          <div className="textBtnWrap">
            <p>좋아요 {response.board.likeCount}개</p>
            <p>조회수 {response.board.hit}회</p>
          </div>
        </div>
      </div>
      <PostWriter close={close} />
    </>
  );
}

export default PostInfo;
