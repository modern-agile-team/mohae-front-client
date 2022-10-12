/** @format */

import { cx, css } from '@emotion/css';
import { useState } from 'react';
import { Img } from '../../../components';
import { shadow } from '../../../styles';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ENDPOINT } from '../../../utils/ENDPOINT';
import setInterceptors from '../../../apis/common/setInterceptors';
import { customAxios } from '../../../apis/instance';
import { Link } from 'react-router-dom';
import BoardPost from '../../../components/newPost/BoardPost';

interface Props {
  [key: string]: any;
  isHelpPost?: boolean;
}
interface PARAMS {
  [key: string]: any;
}

export default function PostSlide({
  outsideBtn,
  items,
  action,
  marginRight,
  viewNumber,
  checkSelf,
  isHelpPost,
}: Props) {
  const [sector, setSector] = useState(0),
    dispatch = useDispatch(),
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
    text: PARAMS = {
      'spec/get_user_specs': '아직 등록된 스펙이 없습니다.',
      'spec/get_user_tohelp': '아직 등록된 이력이 없습니다.',
      'spec/get_user_helpme': '아직 등록된 이력이 없습니다.',
    },
    animationLength: PARAMS = {
      true: items.length,
      false: items.length - 1,
    },
    take: PARAMS = {
      true: 3,
      false: 4,
    };

  const checkItems = () => {
    if (items.length) {
      return css`
        > .container {
          width: fit-content;
          transition: 0.7s;
          transform: ${`translateX(calc(${
            -(sector * viewNumber) * (228 + marginRight)
          }px))`};
          height: 100%;
          display: flex;
          align-items: center;
          > .board {
            width: 228px;
            height: 100%;
            border-radius: 6px;
            margin-right: ${`${marginRight}px`};
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 400px;
          }
        }
      `;
    } else if (!items.length && checkSelf === 'false') {
      return css`
        ${shadow.normal}
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
      `;
    }
  };

  const arrowIcon: { [key: string]: any } = {
    true: items.length > viewNumber - 1,
    false: items.length > viewNumber,
  };

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
          height: 100%;
        }
        ${checkItems()};
        .no-data {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
      .add-post {
        width: 228px;
        height: 100%;
        border-radius: 6px;
        ${shadow.normal};
        margin-right: 32px;
        background-color: white;
        padding: 60px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .add-img {
          width: 24px;
          height: 24px;
          margin-top: 11px;
          margin-bottom: 6px;
          transform: rotate(45deg);
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
        arrowBtn.right[`${arrowIcon[checkSelf]}`]
      }) no-repeat center/contain;`};
    }
  `;

  const clickArrowBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === '+') {
      if (Math.floor(animationLength[checkSelf] / viewNumber) > sector) {
        !cycle &&
          setInterceptors(customAxios)
            .get(
              `${ENDPOINT}${params[action.type]}${userId}&take=${
                take[checkSelf]
              }&page=${sector + viewNumber}${targets[action]}`,
            )
            .then(res => {
              dispatch(action(res.data.response));
            })
            .catch(err => {
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

  const viewPosts = () => {
    if (items && items.length) {
      return items.map((contents: string, index: number) => (
        <div className={'board'} key={index}>
          <BoardPost page={'inSpec'} board={contents} isHelpPost={isHelpPost} />
        </div>
      ));
    } else if (checkSelf === 'false') {
      return <div className={'no-data'}>{text[action.type]}</div>;
    }
  };

  return (
    <div className={'slide'}>
      <div className={cx(style)}>
        <div className={'whole'}>
          <div className={'box'}>
            <div className={'container'}>
              {checkSelf === 'true' && (
                <Link to="/create/post">
                  <button className={'add-post'}>
                    <div className={'add-img'}>
                      <Img src={'/img/close.png'} />
                    </div>
                    {!items.length && (
                      <div className="spec-register">{'게시글 등록하기'}</div>
                    )}
                  </button>
                </Link>
              )}
              {viewPosts()}
            </div>
          </div>
        </div>
        <button className={`btn prev`} onClick={clickArrowBtn} name="-" />
        <button className={'btn next'} onClick={clickArrowBtn} name="+" />
      </div>
    </div>
  );
}
