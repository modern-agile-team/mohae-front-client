import React from 'react';
import { css, cx } from '@emotion/css';
import { Box, Btn, Img, MarkBox, Popup } from '../../components';
import SelectBox from '../../components/selectbox/SelectBox';
import { color, font } from '../../styles';
import PostBody from '../../components/pagecomp/PostBody';
import { SelectBtn } from '../../components/button';
import Input from './Input';
import PostImgs from '../../components/pagecomp/PostImgs';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState, setTarget } from '../../redux/createpost/reducer';
import { RootState } from '../../redux/root';

interface Props {
  selectBoxClick: (i: number) => void;
  setTargetCheck: (i: number) => void;
  view: { [key: number]: boolean };
  targetChecked: { [key: number]: boolean };
  popupView: boolean;
  postingAxios: (e: React.MouseEvent, type: string) => void;
  type: string;
}

function Presenter(props: Props) {
  const {
    selectBoxClick,
    setTargetCheck,
    view,
    popupView,
    targetChecked,
    postingAxios,
    type,
  } = props;
  const { title, price, categoryNo, areaNo, deadline, description } =
    useSelector((state: RootState) => state.createPost.data);
  const dispatch = useDispatch();

  const creationCompleteAction = (e: React.MouseEvent) => {
    postingAxios(e, type);
  };

  const handleWriteBtn = () => {
    if (
      title.length > 2 &&
      16 > title.length &&
      price &&
      categoryNo !== null &&
      areaNo !== null &&
      deadline !== null &&
      description.replace(/<[^>]*>?/g, '').length > 8 &&
      description.replace(/<[^>]*>?/g, '').length < 1000
    ) {
      return (
        <div className="write-btn" onClick={e => creationCompleteAction(e)}>
          <Btn main>
            <p>{type === 'create' ? '작성' : '수정'}</p>
            <div className="imgWrap">
              <Img src="/img/write.png" />
            </div>
          </Btn>
        </div>
      );
    } else {
      return (
        <div className="write-btn">
          <Btn main disable>
            <p>{type === 'create' ? '작성' : '수정'}</p>
            <div className="imgWrap">
              <Img src="/img/write.png" />
            </div>
          </Btn>
        </div>
      );
    }
  };

  const createSelectBtn = () => {
    return contents.map((el, i) => (
      <div
        className="markBox"
        id={`${i}`}
        key={i}
        onClick={e => dispatch(setTarget(Number(e.currentTarget.id)))}
      >
        <SelectBtn
          large
          onChange={() => setTargetCheck(i)}
          checked={targetChecked[i]}
          type={'radio'}
        >
          {el}
        </SelectBtn>
      </div>
    ));
  };

  const createSelectBox = () => {
    const placeholders: { placeholder: string; no: string | number | null }[] =
      [
        { placeholder: '카테고리', no: categoryNo },
        { placeholder: '전체 지역', no: areaNo },
        { placeholder: '기간', no: deadline },
      ];

    const editFor = () => {
      const arr = placeholders.map((placeholder, i) => {
        return lists[placeholder.placeholder]
          .map(list => {
            if (Number(list.no) === placeholder.no) {
              return list.name;
            } else {
              return '';
            }
          })
          .filter(el => el)[0];
      });
      return arr;
    };

    return type === 'edit'
      ? editFor().map((el, i) => (
          <SelectBox
            placeholder={el}
            view={view[i]}
            key={i}
            handleView={() => selectBoxClick(i)}
            style={placeholders[i].placeholder}
            used={'createEdit'}
          />
        ))
      : placeholders.map((el, i) => (
          <SelectBox
            placeholder={el.placeholder}
            view={view[i]}
            key={i}
            handleView={() => selectBoxClick(i)}
            style={placeholders[i].placeholder}
            used={'createEdit'}
          />
        ));
  };

  const popupClose = () => {
    dispatch(setInitialState());
    window.location.replace('/boards/categories/1');
  };

  return (
    <>
      <div className={cx(container)}>
        <div className="imgsSection">
          <p className="pageTitle">
            {type === 'create' ? '게시글 작성' : '게시글 수정'}
          </p>
          <PostImgs type={type} />
        </div>
        <div>
          {handleWriteBtn()}
          <Box size={[736, 448]} className="writeWrap">
            <div className="topWrap">
              <div className="left">
                <Input small />
                <div className="markBoxWrap">{createSelectBtn()}</div>
              </div>
              <div className="right">{createSelectBox()}</div>
            </div>
            <div className="summary">
              <Input big />
            </div>
          </Box>
        </div>
      </div>
      <PostBody type={type} />
      {popupView && (
        <Popup
          visible={popupView}
          text1={`게시글이 성공적으로 ${
            type === 'create' ? '작성' : '수정'
          }되었습니다.`}
        >
          <div className={cx(popupCloseBtn)}>
            <Btn main onClick={popupClose}>
              닫기
            </Btn>
          </div>
        </Popup>
      )}
    </>
  );
}

export default Presenter;

const popupCloseBtn = css`
  width: 74px;
  height: 43px;
`;

const container = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  ${font.size[14]}
  ${font.weight[400]}

.imgsSection {
    width: fit-content;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 40px;
    .pageTitle {
      height: 36px;
      ${font.weight[700]}
      ${font.size[28]}
    color: ${color.dark1};
    }
  }

  .left,
  .right {
    width: 368px;
    height: calc(62px * 3);
    input {
      text-align: center;
    }
  }

  .topWrap {
    display: flex;
  }

  .markBoxWrap {
    width: 368px;
    height: 62px;
    border-bottom: 2px solid ${color.light4};
  }

  .selectBox {
    width: 368px;
    height: 62px;
    border-bottom: 2px solid ${color.light4};
  }

  .title,
  .price,
  .markBox {
    border-right: 2px solid ${color.light4};
  }

  .markBoxWrap {
    display: flex;
    margin: none;
  }

  .summary {
    width: 736px;
    height: 262px;
  }
  .write-btn {
    width: 100px;
    height: 42px;
    margin: 0px 0px 16px 636px;
    .imgWrap {
      width: 15px;
      height: 15px;
    }
  }
`;

const contents = [
  <>
    <MarkBox shape={0} state={0} />
    해줄래요
  </>,
  <>
    <MarkBox shape={1} state={0} />
    구할래요
  </>,
];

interface Contents {
  no: string;
  name: string;
}

const lists: { [placeholder: string]: Contents[] } = {
  카테고리: [
    { no: '1', name: '디자인' },
    { no: '2', name: 'IT/개발' },
    { no: '3', name: '사진/영상' },
    { no: '4', name: '기획/마케팅' },
    { no: '5', name: '번역/통역' },
    { no: '6', name: '문서작업' },
    { no: '7', name: '컨설팅' },
    { no: '8', name: '법률' },
    { no: '9', name: '과외/레슨' },
    { no: '10', name: '상담/운세' },
    { no: '11', name: '이벤트' },
    { no: '12', name: '핸드메이드' },
    { no: '13', name: '취미' },
    { no: '14', name: '생활서비스' },
    { no: '15', name: '기타' },
  ],
  '전체 지역': [
    { no: '1', name: '서울' },
    { no: '2', name: '경기도' },
    { no: '3', name: '강원도' },
    { no: '4', name: '대전' },
    { no: '5', name: '세종시' },
    { no: '6', name: '전라도' },
    { no: '7', name: '광주' },
    { no: '8', name: '경상도' },
    { no: '9', name: '부산' },
    { no: '10', name: '울산' },
    { no: '11', name: '제주도' },
  ],
  기간: [
    { no: '7', name: '일주일' },
    { no: '30', name: '1개월' },
    { no: '60', name: '3개월' },
    { no: '0', name: '상시' },
  ],
};
