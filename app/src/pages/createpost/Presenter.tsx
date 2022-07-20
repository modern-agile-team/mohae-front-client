import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Box, Btn, Img, MarkBox } from '../../components';
import SelectBox from '../../components/selectbox/SelectBox';
import { color, font } from '../../styles';
import PostBody from '../../components/pagecomp/PostBody';
import { SelectBtn } from '../../components/button';
import Input from './Input';
import PostImgs from '../../components/pagecomp/PostImgs';
import { useDispatch } from 'react-redux';
import { setTarget } from '../../redux/createpost/reducer';

interface Props {
  selectBoxClick: (i: number) => void;
  selectedList: (e?: React.MouseEvent) => void;
  setTargetCheck: (i: number) => void;
  view: { [key: number]: boolean };
  targetChecked: { [key: number]: boolean };
}

function Presenter(props: Props) {
  const { selectBoxClick, selectedList, setTargetCheck, view, targetChecked } =
    props;
  const dispatch = useDispatch();

  const createSelectBtn = () => {
    return contents.map((el, i) => (
      <div
        className="markBox"
        id={`${i}`}
        key={i}
        onClick={e => dispatch(setTarget(e.currentTarget.id))}
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
    const placeholders = ['카테고리', '전체 지역', '기간'];

    return placeholders.map((el, i) => (
      <SelectBox
        size="big"
        placeholder={el}
        view={view[i]}
        key={i}
        onClick={() => selectBoxClick(i)}
        style={!i ? 'category' : 'text'}
        selectedList={selectedList}
      />
    ));
  };

  return (
    <>
      <div className={cx(container)}>
        <div className="imgsSection">
          <p className="pageTitle">게시글 작성</p>
          <PostImgs />
        </div>
        <div>
          <div className="write-btn">
            <Btn main>
              <p>작성</p>
              <div className="imgWrap">
                <Img src="/img/write.png" />
              </div>
            </Btn>
          </div>
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
      <PostBody />
    </>
  );
}

export default Presenter;

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
