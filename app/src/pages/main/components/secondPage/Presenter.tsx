import React from 'react';
import styled from '@emotion/styled';
import Recommend from './component/Recommend';
import { Basket } from '../../../../types/main/secondPage/type';

function Presenter() {
  const imgBasket: Basket = {
    0: {
      default: '/img/recommend1-1.jpg',
      hover: '/img/recommend1-2.jpg',
    },
    1: {
      default: '/img/recommend2-1.jpg',
      hover: '/img/recommend2-2.jpg',
    },
    2: {
      default: '/img/recommend3-1.jpg',
      hover: '/img/recommend3-2.jpg',
    },
  };
  const textBasket: Basket = {
    0: {
      first: '쉽고 빠르게 내가 원하는 분야의',
      second: '전문가를 찾을 수 있어요.',
    },
    1: {
      first: '나의 재능을 활용해서 필요한 사람들에게',
      second: '도움을 줄 수 있어요.',
    },
    2: {
      first: '다양한 경험을 통해',
      second: '나만의 스펙을 쌓을 수 있어요.',
    },
  };

  const createRecommend = () => {
    return Object.keys(imgBasket).map((_, i) => (
      <Recommend
        key={i}
        imgUrl={{ default: imgBasket[i].default, hover: imgBasket[i].hover }}
        text={{ first: textBasket[i].first, second: textBasket[i].second }}
      />
    ));
  };

  return (
    <Wrapper>
      <span className="title">이런 사람들이 사용하면 좋아요!</span>
      <div className="container">{createRecommend()}</div>
    </Wrapper>
  );
}

export default React.memo(Presenter);

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: calc((100vh - 59px - 448px) / 2) 0;
  color: #4f4e5c;

  .title {
    font-weight: 700;
    font-size: 28px;
    line-height: 130%;
    margin: 0 0 56px;
  }

  .container {
    width: 100%;
    height: fit-content;
    padding: 0 calc((100% - 1128px) / 2);
    display: flex;
    justify-content: space-between;
  }
`;
