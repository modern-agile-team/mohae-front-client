import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, Img, Popup, Poster, Search } from '../../components';
import { color, font } from '../../styles';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Categories from '../../components/category/Categories';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import EmptySpinner from '../../components/emptySpinner/EmptySpinner';
import { PostData } from './Container';

interface Props {
  resetPageInfo: () => void;
  setTarget: Dispatch<SetStateAction<Element | null>>;
  categories: { no: string; name: string }[];
  controlWriteButton: () => void;
  loginPlz: boolean;
  setLoginPlz: Dispatch<SetStateAction<boolean>>;
}

function Presenter(props: Props) {
  const {
    resetPageInfo,
    setTarget,
    categories,
    controlWriteButton,
    loginPlz,
    setLoginPlz,
  } = props;
  const reduxData = useSelector((state: RootState) => state.board.response);
  const loading = useSelector((state: RootState) => state.board.loading);
  const { no } = useParams();
  const [searchParams, _] = useSearchParams();
  const contentsCollectionsToDisplay = {
    loading: <EmptySpinner loading small />,
    noPostData: {
      search: (
        <EmptySpinner
          searchNone
          subText={categories[Number(no) - 1].name + ' 게시판에서'}
          text={searchParams.get('title')}
        />
      ),
      category: (
        <EmptySpinner
          boardNone
          text={categories[Number(no) - 1].name + ' 게시판'}
        />
      ),
    },
    existPostData: (el: PostData, i: number) => {
      return (
        <Link
          key={i}
          className={cx(gap(i + 1))}
          to={`/post/${el.no}`}
          ref={reduxData.length - 1 === i ? setTarget : null}
        >
          <Poster size="midium" data={reduxData[i]} />
        </Link>
      );
    },
  };

  const showContents = () => {
    if (loading) {
      return contentsCollectionsToDisplay.loading;
    } else if (!loading) {
      if (!reduxData.length && searchParams.get('title')) {
        return contentsCollectionsToDisplay.noPostData.search;
      } else if (!reduxData.length) {
        return contentsCollectionsToDisplay.noPostData.category;
      } else {
        return reduxData.map((el: PostData, i: number) => {
          return contentsCollectionsToDisplay.existPostData(el, i);
        });
      }
    }
  };

  return (
    <>
      <div className={cx(title)}>
        {categories[Number(no) - 1].name}&nbsp;게시판
      </div>
      <Categories num={7} resetPageInfo={resetPageInfo} />
      <div className={cx(style.wrap(0))}>
        <Search board resetPageInfo={resetPageInfo} />
        <div className={cx(style.btn)}>
          <Btn main onClick={controlWriteButton}>
            <p>글쓰기</p>
            <div className="imgWrap">
              <Img src="/img/write.png" />
            </div>
          </Btn>
        </div>
      </div>
      <div className={cx(style.wrap(2))}>
        <div className={cx(style.wrap(1))}>
          총&nbsp;<p>{reduxData.length}</p>
          &nbsp;건의 게시물
        </div>
        {showContents()}
      </div>
      <Popup
        visible={loginPlz}
        text1={'게시글 작성은 로그인 후 이용 가능합니다.'}
        overlay={() => setLoginPlz(false)}
      >
        <div className={cx(popupStyle)}>
          <Btn main onClick={() => setLoginPlz(false)}>
            닫기
          </Btn>
        </div>
      </Popup>
    </>
  );
}

export default Presenter;

const title = css`
  width: 100%;
  height: 36px;
  ${font.size[28]}
  ${font.weight[700]}
    color: ${color.dark1};
  display: flex;
  justify-content: center;
  margin: 40px 0px 48px 0px;
`;

const style = {
  wrap: function (num: number) {
    const common = css`
      display: flex;
      align-items: center;
    `;

    const sectionWrap = [
      css`
        ${common}
        justify-content: space-between;
        width: 936px;
        margin: 64px auto 0px;
      `,
      css`
        ${common}
        width: 100%;
        padding-top: 32px;
        color: ${color.dark1};
        p {
          color: ${color.main};
        }
      `,
      css`
        ${common}
        overflow: hidden;
        width: 1128px;
        flex-wrap: wrap;
        margin-bottom: 64px;
        padding-left: 8px;
        padding-bottom: 16px;
      `,
    ];
    return sectionWrap[num];
  },

  btn: css`
    width: 100px;
    height: 43px;
    .imgWrap {
      width: 15px;
      height: 15px;
    }
  `,
};

const gap = (i: number) => css`
  margin-top: 24px;
  margin-right: ${i % 4 && '16px'};
`;

const popupStyle = css`
  width: 74px;
  height: 43px;
`;
