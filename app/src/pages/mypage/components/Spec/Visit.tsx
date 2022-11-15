/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font } from '../../../../styles';
import {
  Box,
  FocusBar,
  BasicModal,
  Carousel,
  PostIt,
} from '../../../../components';
import EditInputImg from './EditInput';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/root';
import { getDetailSpec, Init_Form } from '../../../../redux/spec/reducer';
import { Btn } from '../../../../components';
import { spec_visit } from '../../../../redux/specModal/reducer';
import { ENDPOINT } from '../../../../utils/ENDPOINT';
import setInterceptors from '../../../../apis/common/setInterceptors';
import { customAxios } from '../../../../apis/instance';

export default function Visit() {
  const isOpen = useSelector(
    (state: RootState) => state.specModal.openSpecVisit,
  );
  const formData = useSelector((state: RootState) => state.spec.addImages);
  const visitorInfo = useSelector((state: RootState) => state.user.user);

  const text: { [key: string]: any } = {
    sir: '님',
  };
  const [isEdit, setIsEdit] = useState(false);
  const specInfo = useSelector((state: RootState) => state.spec.specInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState({
    title: '',
    description: '',
  });
  const [imgIndex, setImgIndex] = useState<number>(0);

  const imgURLs =
    specInfo?.specPhotos &&
    specInfo.specPhotos.map(
      (img: any) => `https://d2ffbnf2hpheay.cloudfront.net/${img.photo_url}`,
    );

  useEffect(() => {
    if (!isOpen) setImgIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isEdit) {
      dispatch(Init_Form());
    }
  }, [isEdit]);

  const clickEditBtn = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(!isEdit);
    setValue({
      title: specInfo.title,
      description: specInfo.description,
    });
  };

  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const getTitle = e.currentTarget.value;
    setValue({
      ...value,
      title: getTitle,
    });
  };

  const inputDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const getDescription = e.currentTarget.value;
    setValue({
      ...value,
      description: getDescription,
    });
  };
  const patchRequest = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    formData.append('title', value.title);
    formData.append('description', value.description);

    if (formData.getAll('image').length === 0) {
      const file = new File(['logo.png'], 'logo.png', {
        type: 'image/jpg',
      });
      formData.append('image', file);
    }

    setInterceptors(customAxios)
      .patch(`${ENDPOINT}specs/${specInfo.no && specInfo.no}`, formData, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        dispatch(getDetailSpec(specInfo.no));
        setIsEdit(false);
      })
      .catch(err => {
        console.log('err :>> ', err);
      });
  };

  const editLayout = (
    <>
      <div className={'box texts'}>
        <input
          maxLength={15}
          className={'title'}
          value={value.title && value.title}
          onChange={inputTitle}
          spellCheck={false}
        />
        <div>
          <FocusBar light thin />
        </div>
        <textarea
          maxLength={300}
          className={'description'}
          value={value.description && value.description}
          onChange={inputDescription}
          spellCheck={false}
        ></textarea>

        <div className={'footer'}>
          <div className={'number'}>
            <span>{value.description && value.description.length}</span>
            <span>{'/'}</span>
            <span>{300}</span>
          </div>
          <div className={'complete'} onClick={patchRequest}>
            <Btn main>{'완료'}</Btn>
          </div>
        </div>
      </div>
    </>
  );

  const viewLayout = (
    <>
      <div className={'box texts'}>
        <div className={'title'}>{specInfo && specInfo.title}</div>
        <div>
          <FocusBar light thin />
        </div>
        <div className={'wrapper'}>
          <div className={'description'}>
            {specInfo && specInfo.description}
          </div>
        </div>
      </div>
    </>
  );

  const reset = (e: React.MouseEvent<Element>) => {
    setIsEdit(false);
    setValue({
      title: specInfo.title,
      description: specInfo.description,
    });
    dispatch(spec_visit(!isOpen));
  };

  return (
    <BasicModal big visible={isOpen} reset={reset}>
      <div className={cx(style)}>
        <div className={'title'}>
          <div>
            <span className={'user'}>{specInfo && specInfo.nickname}</span>
            <span>{text.sir}</span>
          </div>
          {specInfo?.userNo === visitorInfo.userNo && (
            <div className={'report-btn'} onClick={clickEditBtn}>
              <Btn white>{isEdit ? '수정 중...' : '수정하기'}</Btn>
            </div>
          )}
        </div>
        <div className={'wrapper'}>
          {!isEdit ? (
            <PostIt size="big">
              <div className={'carousel'}>
                <Carousel
                  outsideBtn
                  imgs={imgURLs && imgURLs}
                  imgIndex={imgIndex}
                  setImgIndex={setImgIndex}
                />
              </div>
            </PostIt>
          ) : (
            <Box size={[600, 470]}>
              <div className={'editbox'}>
                <EditInputImg edit editImages={imgURLs} />
              </div>
            </Box>
          )}
          <Box size={[336, 470]}>{isEdit ? editLayout : viewLayout}</Box>
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
    height: 36px;
    display: flex;
    justify-content: space-between;
    color: ${color.dark1};
    line-height: 130%;
    font-size: 28px;
    > .report-btn {
      width: 100px;
      height: 43px;
    }
    .user {
      ${font.weight[700]};
      margin-right: 8px;
    }
  }
  > .wrapper {
    display: flex;
    justify-content: space-between;
    > .box {
      width: 100%;
      height: 100%;
      padding: 8px;
    }
    .editbox {
      width: 100%;
      height: 100%;
      padding: 8px;
    }
    .carousel {
      width: 504px;
      height: 438px;
      margin: 0 auto;
    }
    > .postit {
      width: 600px;
      height: 470px;
      /* background-color: lightblue; */
    }
    .texts {
      position: relative;
      padding: 8px;
      height: 100%;
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
      .wrapper {
        padding-right: 8px;
        overflow: auto;
      }
      .description {
        width: 304px;
        height: 316px;
        font-size: 14px;
      }
      > .footer {
        position: absolute;
        width: calc(336px - 16px);

        bottom: 0;
        margin: 0 inherit;
        padding-right: 8px;
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
