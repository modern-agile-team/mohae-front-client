/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
import {
  Img,
  Poster,
  NewPost,
  Box,
  Profile,
  FocusBar,
  Category,
  BasicModal,
  MarkBox,
  Btn,
  OrderedImg,
} from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

export default function Edit() {
  const isOpen = useSelector((state: RootState) => state.modal.openSpecEdit);
  const text: { [key: string]: any } = {
    edit: '스펙 수정하기',
    register: '스펙 등록하기',
    complete: '완료',
    maxNum: 300,
  };

  const [description, setDescription] = useState(
    '가나다라마바사아자차카타파하~가나다라마바사아자차카타파하가나다라마바사아자차카타파하~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~가나다라마바사아자차카타파하~가나다라마바사아자차카타~'
  );
  const [title, setTitle] = useState('제목이다~');

  const inputDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <BasicModal big visible={isOpen}>
      <div className={cx(style)}>
        <div className={'title'}>{text.register}</div>
        <div className={'wrapper'}>
          <Box size={[600, 470]}>
            <div className={'box'}>
              <OrderedImg
                edit
                imgs={[
                  'img/camera.png',
                  'img/edit.png',
                  'img/filter.png',
                  'img/heart-main.png',
                  'img/study.png',
                  'img/send.png',
                  'img/star-unfilled.png',
                ]}
              />
            </div>
          </Box>
          <Box size={[336, 470]}>
            <div className={'box texts'}>
              {/*  */}
              <input
                maxLength={15}
                className={'title'}
                value={title}
                onChange={inputTitle}
                spellCheck={false}
              />
              <div>
                <FocusBar light thin />
              </div>
              {/*  */}
              <textarea
                maxLength={300}
                className={'description'}
                value={description}
                onChange={inputDescription}
                spellCheck={false}
              >
                {/* {description} */}
              </textarea>

              <div className={'footer'}>
                {/*  */}
                <div className={'number'}>
                  <span>{'?'}</span>
                  <span>{'/'}</span>
                  <span>{text.maxNum}</span>
                </div>
                <div className={'complete'}>
                  <Btn main>{text.complete}</Btn>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </BasicModal>
  );
}

const style = css`
  width: 100%;
  height: 100%;
  ${radius[24]};
  padding: 48px 84px 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > .title {
    font-size: 28px;
    height: 36px;
    ${font.weight[700]};
    color: ${color.dark1};
    line-height: 130%;
  }
  > .wrapper {
    display: flex;
    justify-content: space-between;
    .box {
      width: 100%;
      height: 100%;
      padding: 8px;
    }
    .texts {
      > * {
        margin: 8px;
        color: ${color.dark1};
      }
      .title {
        font-size: 18px;
        display: flex;
        align-items: center;
        height: 23px;
        margin-bottom: 16px;
      }
      .description {
        width: calc(288px + 8px);
        height: 316px;
        overflow: auto;
        font-size: 14px;
        box-sizing: content-box;
        padding-right: calc(8px + 8px);
      }

      > .footer {
        .complete {
          width: 74px;
          height: 43px;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`;
