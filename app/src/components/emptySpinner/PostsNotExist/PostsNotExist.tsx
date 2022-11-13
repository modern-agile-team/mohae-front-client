import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Img from '../../img/Img';

interface PostsNotExistProps {
  searched: string | null;
  category: string;
}

function PostsNotExist({ category, searched }: PostsNotExistProps) {
  const memorization = useMemo(() => {
    const imgPath = searched ? '/img/search-none.png' : '/img/board-none.png';

    return {
      imgElement: <Img src={imgPath} alt="there-is-no-poster" />,
      mainText: searched !== 'null' ? searched : '해당 조건',
      subText:
        searched !== 'null'
          ? '에 대한 검색결과가 없습니다.'
          : '에 일치 하는 게시물이 없습니다.',
    };
  }, []);

  const createContainer = (img: React.ReactNode) => {
    if (searched) {
      return (
        <Searched searched={searched}>
          <div className="img-wrap">{img}</div>
          <p>{category + ' 게시판에서'}</p>
          <SearchedTextWrapper>
            <p>'{memorization.mainText}'</p>
            <p>{memorization.subText}</p>
          </SearchedTextWrapper>
        </Searched>
      );
    } else {
      return (
        <InCategories>
          <div className="img-wrap">{img}</div>
          <p>'{category} 게시판'</p>
        </InCategories>
      );
    }
  };

  return <>{createContainer(memorization.imgElement)}</>;
}

export default PostsNotExist;

const Common = styled.div`
  width: 100%;
  height: 242px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .img-wrap {
    height: 110px;
  }
`;

const InCategories = styled(Common)`
  .img-wrap {
    width: 102px;
  }
  p {
    color: #ff445e;
  }
  p::after {
    content: '에 게시글이 없습니다.';
    color: #4f4e5c;
  }
`;

const Searched = styled(Common)<{ searched: string }>`
  .img-wrap {
    width: 61px;
  }
  p {
    color: #4f4e5c;
  }
`;

const SearchedTextWrapper = styled.div`
  display: flex;
  p:nth-of-type(1) {
    color: #ff445e;
  }
`;
