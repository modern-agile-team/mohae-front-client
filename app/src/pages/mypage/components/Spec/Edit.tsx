/** @format */

import { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font } from '../../../../styles';
import { Box, FocusBar, BasicModal, Btn } from '../../../../components';
import InputImg from './InputImg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/root';
import { spec_create } from '../../../../redux/specModal/reducer';
import { ENDPOINT } from '../../../../utils/ENDPOINT';
import setInterceptors from '../../../../apis/common/setInterceptors';
import { customAxios } from '../../../../apis/instance';
import { Init_Form } from '../../../../redux/spec/reducer';

export default function Edit() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.specModal.openSpecCreate,
  );
  const text: { [key: string]: any } = {
    edit: '스펙 수정하기',
    register: '스펙 등록하기',
    complete: '완료',
    maxNum: 300,
  };
  const [value, setValue] = useState({
    title: '',
    description: '',
  });

  const inputDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget.value;
    setValue({
      ...value,
      description: inputValue,
    });
  };

  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setValue({
      ...value,
      title: inputValue,
    });
  };
  const addImages = useSelector((state: RootState) => state.spec.addImages);

  const createRequest = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!value.title || !value.description) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    if (addImages.getAll('image').length === 0) {
      const file = new File(['logo.png'], 'logo.png', {
        type: 'image/jpg',
      });
      addImages.append('image', file);
    }

    addImages.append('title', value.title);
    addImages.append('description', value.description);

    setInterceptors(customAxios)
      .post(`${ENDPOINT}specs/regist`, addImages, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        if (res.data.statusCode >= 200 && res.data.statusCode <= 204) {
          alert('스펙이 등록되었습니다.');
          setTimeout(() => {
            dispatch(spec_create(!isOpen));
          }, 100);
        }
        console.log(`res`, res.data);
      })
      .catch(err => {
        console.log(`err`, err);
      });
  };
  const reset = (e: React.MouseEvent) => {
    dispatch(spec_create(false));
  };
  useEffect(() => {
    if (!isOpen) {
      setValue({
        title: '',
        description: '',
      });
      dispatch(Init_Form());
    }
  }, [dispatch, isOpen]);

  return (
    <BasicModal big visible={isOpen} reset={reset}>
      <div className={cx(style)}>
        <div className={'title'}>{text.register}</div>
        <div className={'wrapper'}>
          <Box size={[600, 470]}>
            <div className={'box'}>
              <InputImg edit />
            </div>
          </Box>
          <Box size={[336, 470]}>
            <div className={'box texts'}>
              <input
                placeholder={'제목을 입력해주세요.'}
                maxLength={15}
                className={'title'}
                value={value.title}
                onChange={inputTitle}
                spellCheck={false}
              />
              <div>
                <FocusBar light thin />
              </div>
              <textarea
                placeholder={'내용을 입력해주세요.'}
                maxLength={300}
                className={'description'}
                value={value.description}
                onChange={inputDescription}
                spellCheck={false}
              ></textarea>

              <div className={'footer'}>
                <div className={'number'}>
                  <span>{value.description.length}</span>
                  <span>{'/'}</span>
                  <span>{text.maxNum}</span>
                </div>
                <div className={'complete'} onClick={createRequest}>
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
