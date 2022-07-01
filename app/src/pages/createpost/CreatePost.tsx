import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Box, Btn, Img, MarkBox } from '../../components';
import SelectBox from '../../components/selectbox/SelectBox';
import { color, font } from '../../styles';
import PostBody from '../../components/pagecomp/PostBody';
import { SelectBtn } from '../../components/button';
import Input from './Input';
import PostImgs from '../../components/pagecomp/PostImgs';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

function CreatePost() {
  const [view, setView] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    0: true,
    1: false,
  });
  const reduxData = useSelector((state: RootState) => state.post.data);

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
  `;

  const create = {
    btn: () => {
      const BtnStyle = css`
        width: 100px;
        height: 42px;
        margin: 0px 0px 16px 636px;
        .imgWrap {
          width: 15px;
          height: 15px;
        }
      `;

      return (
        <div className={cx(BtnStyle)}>
          <Btn main>
            <p>작성</p>
            <div className='imgWrap'>
              <Img src='/img/write.png' />
            </div>
          </Btn>
        </div>
      );
    },

    selectBtn: () => {
      const setItemCheck = (i: number) => {
        setChecked({ 0: false, 1: false, [i]: !checked[i] });
      };
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

      return contents.map((el, i) => (
        <div className='markBox' key={i}>
          <SelectBtn
            large
            onChange={() => setItemCheck(i)}
            checked={checked[i]}
            type={'radio'}
          >
            {el}
          </SelectBtn>
        </div>
      ));
    },
  };

  const selectBoxClick = (i: number) => {
    setView({ 0: false, 1: false, 2: false, [i]: !view[i] });
  };

  const createSelectBox = () => {
    const placeholders = ['카테고리', '지역', '기간'];

    return placeholders.map((el, i) => (
      <SelectBox
        size='big'
        placeholder={el}
        view={view[i]}
        key={i}
        onClick={() => selectBoxClick(i)}
        style={!i ? 'category' : 'text'}
      />
    ));
  };

  return (
    <>
      <div className={cx(container)}>
        <div className='imgsSection'>
          <p className='pageTitle'>게시글 작성</p>
          {/* <PostImgs /> */}
        </div>
        <div>
          {create.btn()}
          <Box size={[736, 448]} className='writeWrap'>
            <div className='topWrap'>
              <div className='left'>
                <Input small />
                <div className='markBoxWrap'>{create.selectBtn()}</div>
              </div>
              <div className='right'>{createSelectBox()}</div>
            </div>
            <div className='summary'>
              <Input big />
            </div>
          </Box>
        </div>
      </div>
      {/* <PostBody /> */}
    </>
  );
}

export default CreatePost;
