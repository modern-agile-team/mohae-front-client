import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Poster, PostsNotExist, Spinner } from '../../../../components';
import { categoryList } from '../../../../components/category/categoryList';
import { RootState } from '../../../../redux/root';
import { BoardDetails, ContentsProps } from '../../../../types/board/type';

interface KeepCheckingResIsEmpty {
  currentResLength: null | number;
  stopRequest: boolean;
}

function Contents(props: ContentsProps) {
  const { setTarget } = props;
  const { no } = useParams();
  const [searchParams, _] = useSearchParams();
  const { response, loading } = useSelector((state: RootState) => state.board);
  const [keepCheckingResIsEmpty, setKeepCheckingResIsEmpty] =
    useState<KeepCheckingResIsEmpty>({
      currentResLength: null,
      stopRequest: false,
    });

  const memorization = useMemo(() => {
    setKeepCheckingResIsEmpty({
      currentResLength: null,
      stopRequest: false,
    });

    return {
      categoryName: categoryList[Number(no) - 1].name,
      titleSearch: searchParams.get('title'),
    };
  }, [no, searchParams.get('title')]);

  useEffect(() => {
    setKeepCheckingResIsEmpty(prev => {
      if (prev.currentResLength === response.length) {
        return { ...prev, stopRequest: true };
      } else {
        return { ...prev, currentResLength: response.length };
      }
    });
  }, [response]);

  const printOutPoster = () => {
    return response.map((el: BoardDetails, i: number) => (
      <Link
        key={i}
        className="link-wrap"
        to={`/post/${el.no}`}
        ref={keepCheckingResIsEmpty.stopRequest ? null : setTarget}
      >
        <Poster size="medium" data={response[i]} />
      </Link>
    ));
  };

  const handleContents = useCallback(() => {
    if (loading) {
      return <Spinner size="small" />;
    } else {
      if (!response.length) {
        return (
          <PostsNotExist
            category={memorization.categoryName}
            searched={memorization.titleSearch}
          />
        );
      } else {
        return <>{printOutPoster()}</>;
      }
    }
  }, [response]);

  const loadingForMorePoster = useCallback(() => {
    return (
      keepCheckingResIsEmpty.currentResLength !== null &&
      keepCheckingResIsEmpty.currentResLength > 8 &&
      !keepCheckingResIsEmpty.stopRequest && (
        <div className="spinner">
          <Spinner size="small" />
        </div>
      )
    );
  }, [keepCheckingResIsEmpty]);

  return (
    <ContentsContainer>
      <TotalPostsNumber>
        <p>
          총 <span>{response.length}</span> 건의 게시물
        </p>
      </TotalPostsNumber>
      {handleContents()}
      {loadingForMorePoster()}
    </ContentsContainer>
  );
}

export default Contents;

const TotalPostsNumber = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 16px;
  color: #4f4e5c;
  span {
    color: #ff445e;
  }
`;

const ContentsContainer = styled.section`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 1128px;
  flex-wrap: wrap;
  margin-bottom: 64px;
  padding-left: 8px;
  padding-bottom: 16px;
  gap: 16px;
  .spinner {
    width: 100%;
    height: 241px;
  }
`;
