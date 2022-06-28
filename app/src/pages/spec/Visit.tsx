/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
import { Box, FocusBar, BasicModal, Carousel, PostIt } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/root';
import { useGetRequest } from '../../redux/axios';
import getToken from '../../utils/getToken';
import { useParams, useLocation } from 'react-router-dom';
import { get_spec_info, get_spec_no } from '../../redux/spec/reducer';
import { promises } from 'stream';

export default function Visit() {
  const isOpen = useSelector((state: RootState) => state.modal.openSpecVisit),
    TOKEN = getToken(),
    ENDPOINT = 'specs/spec/';

  const text: { [key: string]: any } = {
    sir: '님',
  };
  const PARAM = useParams();
  const search = useLocation().search;
  const regexpLastWord = /\w+$/;
  const getTest = async (a: any) => {
    return search.match(a);
  };
  // Promise.resolve(search.match(regexpLastWord)).then((res) => {
  //   console.log('res :>> ', res);
  // });

  const getSearch: RegExpMatchArray | null = search.match(regexpLastWord);
  const specInfo = useSelector((state: RootState) => state.spec.specInfo);
  const dispatch = useDispatch();

  useGetRequest(`${ENDPOINT}${74}`, TOKEN, get_spec_info);

  const imgURLs =
    specInfo &&
    specInfo.specPhotos.length > 0 &&
    specInfo.specPhotos.map((img: any, index: number) => img.photo_url);
  // console.log('imgURLs :>> ', imgURLs);

  return (
    <BasicModal big visible={isOpen}>
      <div className={cx(style)}>
        <div className={'title'}>
          <span className={'user'}>{specInfo && specInfo.nickname}</span>
          <span>{text.sir}</span>
        </div>
        <div className={'wrapper'}>
          <PostIt big>
            <div className={'carousel'}>
              <Carousel outsideBtn imgs={imgURLs && imgURLs} />
            </div>
          </PostIt>
          <Box size={[336, 470]}>
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
    height: 36px;
    color: ${color.dark1};
    line-height: 130%;
    font-size: 28px;
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
    .carousel {
      width: 504px;
      height: 438px;
      margin: 0 auto;
    }
    > .postit {
      width: 600px;
      height: 470px;
      background-color: lightblue;
    }
    .texts {
      padding: 8px;
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
        > .description {
          width: 304px;
          height: 316px;
          font-size: 14px;
        }
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
