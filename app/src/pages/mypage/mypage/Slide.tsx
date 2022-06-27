/** @format */

import { cx, css } from '@emotion/css';
import { useState, useEffect } from 'react';
import { Img, NewPost } from '../../../components';
import { color, radius, font, shadow } from '../../../styles';
import { useParams } from 'react-router-dom';
import { useGetRequest } from '../../../redux/axios';
import axios from 'axios';
import { get_user_specs } from '../../../redux/spec/reducer';
import { useDispatch } from 'react-redux';

interface Props {
  [key: string]: any;
}
interface PARAMS {
  [key: string]: any;
}

export default function Slide({ onClick, outsideBtn, items, action }: Props) {
  const [sector, setSector] = useState(0),
    dispatch = useDispatch(),
    ENDPOINT = `https://mo-hae.site/`,
    TOKEN =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzdGFyZzFAaGFubWFpbC5uZXQiLCJ1c2VyTm8iOjUsImlzc3VlciI6Im1vZGVybi1hZ2lsZSIsImV4cGlyYXRpb24iOiIzNjAwMCIsImlhdCI6MTY1NjI5MjkzNywiZXhwIjoxNjU2MzI4OTM3fQ.5eQ2KU4THZKbWW77fEp6GRWhd7_hemA62bVE3v7fnaI',
    userId = useParams().no,
    params: PARAMS = {
      'spec/get_user_specs': 'specs/profile?user=',
      'spec/get_user_tohelp': 'boards/profile?user=',
      'spec/get_user_helpme': 'boards/profile?user=',
    },
    targets: PARAMS = {
      'spec/get_user_specs': '',
      'spec/get_user_tohelp': '&target=true',
      'spec/get_user_helpme': '&target=false',
    },
    SPEC = `specs/profile?`,
    [cycle, setCycle] = useState(false),
    arrowBtn: PARAMS = {
      right: {
        true: '/img/arrow-right-main.png',
        false: '/img/arrow-right-light1.png',
      },
      left: {
        true: '/img/arrow-left-main.png',
        false: '/img/arrow-left-light1.png',
      },
    },
    checkNext = Math.floor((items.length - 1) / 3) > sector;

  const style = css`
    width: 100%;
    height: 100%;
    position: relative;
    > .whole {
      width: calc(100% + 16px);
      height: calc(100% + 16px);
      position: relative;
      border-radius: inherit;
      transform: translate(-8px, -8px);

      overflow: hidden;
      > .box {
        width: calc(100% - 16px);
        height: calc(100% - 16px);
        transform: translate(8px, 8px);
        border-radius: 6px;
        > .container {
          width: fit-content;
          transition: 0.7s;
          transform: ${`translateX(calc(${-(sector * 3) * (228 + 32)}px))`};
          height: 100%;
          display: flex;
          align-items: center;
          > .board {
            width: 228px;
            height: 100%;
            border-radius: 6px;
            margin-right: 32px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 400px;
          }
        }
      }
    }
    > .btn {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    > .prev {
      left: 0;
      ${outsideBtn &&
      css`
        left: -24px;
      `}
      background: ${`url(${
        arrowBtn.left[`${sector > 0}`]
      }) no-repeat center/contain;`};
    }
    > .next {
      right: 0;
      ${outsideBtn &&
      css`
        right: -24px;
      `}
      background: ${`url(${
        arrowBtn.right[`${items.length > 3}`]
      }) no-repeat center/contain;`};
    }
  `;

  const useClickArrowBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === '+') {
      if (Math.floor((items.length - 1) / 3) > sector) {
        !cycle &&
          axios
            .get(
              `${ENDPOINT}${params[action.type]}${userId}&take=3&page=${
                sector + 3
              }${targets[action]}`,
              {
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${TOKEN}`,
                },
              }
            )
            .then((res) => {
              // console.log('res :>> ', res.data.response);
              dispatch(action(res.data.response));
            })
            .catch((err) => {
              console.log(`err`, err);
            });
        setSector(sector + 1);
      } else {
        setCycle(true);
        setSector(0);
      }
    } else {
      if (sector) {
        setSector(sector - 1);
      }
    }
  };

  const viewPosts =
    items && items.length > 0 ? (
      items.map((contents: string, index: number) => (
        <div className={'board'} key={index}>
          <NewPost page={'inSpec'} board={contents} />
        </div>
      ))
    ) : (
      <span>{'NO DATA'}</span>
    );

  return (
    <div className={'slide'}>
      <div className={cx(style)}>
        <div className={'whole'}>
          <div className={'box'}>
            <div className={'container'}>{viewPosts}</div>
          </div>
        </div>
        <button className={`btn prev`} onClick={useClickArrowBtn} name="-" />
        <button className={'btn next'} onClick={useClickArrowBtn} name="+" />
      </div>
    </div>
  );
}
