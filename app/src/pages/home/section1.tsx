/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { Categories, Img } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/root';
import Search from './Search';

interface Props {
  [key: string]: any;
}

export default function Part1(props: Props) {
  const text: { [key: string]: any } = {
    wannaHelp: '도움이 필요할 땐,',
    name: {
      1: '모',
      2: '두의',
      3: '해',
      4: '결사',
    },
    mainDesc:
      '자신의 재능으로 도움이 필요한 사람들을 도와주고 나에게 없는 재능이 필요할 때 도움을 받아요.',
    inputWord: '검색어를 입력해 주세요.',
  };

  const style = css`
    padding: calc((100vh - 59px - 647px) / 2) calc((100% - 1128px) / 2);
    height: 100vh;
    display: flex;
    flex-direction: column;

    > .main-wrapper {
      width: 1128px;
      padding: 0 0 78px;
      text-align: start;
      .first-desc {
        line-height: 130%;
        font-size: 28px;
        color: ${color.dark2};
      }
      .name {
        width: fit-content;
        line-height: 87px;
        font-size: 40px;
        color: ${color.dark1};
        margin-bottom: 24px;
      }
      .focus {
        font-size: 60px;
        color: ${color.main};
      }
      .description {
        width: 409px;
        font-size: 20px;
        line-height: 170%;
        color: ${color.dark2};
        margin-bottom: 48px;
      }
      .input-wrapper {
        width: 648px;
        height: 63px;
        position: relative;
        input {
          width: 100%;
          height: 100%;
          ${radius[6]}
          ${shadow.normal}
              font-size: 24px;
          padding: 16px 24px;
        }
        .search {
          width: 31px;
          height: 31px;
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .main-img {
          width: 552px;
          height: 391px;
          position: absolute;
          top: -290px;
          right: -480px;
          background: url('/img/main.png') no-repeat center/contain;
        }
      }
    }
    > .scroll {
      margin: 32px auto 0;
      font-size: 14px;
      line-height: 170%;
      color: ${color.dark4};
    }
    .arrow-down {
      margin: 0 auto;
      width: 24px;
      height: 24px;
    }
  `;

  return (
    <div className={cx(style)}>
      <div className={`main-wrapper`}>
        <span className={'first-desc'}>{'도움이 필요할 땐,'}</span>
        <div className={'name'}>
          <span className={'focus'}>{text.name[1]}</span>
          <span>{text.name[2]}</span>
          <span className={'focus'}>{text.name[3]}</span>
          <span>{text.name[4]}</span>
        </div>
        <div className={'description'}>{text.mainDesc}</div>
        <div className={'input-wrapper'}>
          <Search placeholder={text.inputWord} />
          <div className={'main-img'} />
          <div className={'search'}>
            <Img src={'/img/search.png'} />
          </div>
        </div>
      </div>
      <Categories num={8} />
      <div className={'scroll'}>{'Scroll'}</div>
      <div className={'arrow-down'}>
        <Img src={'img/scroll.png'} />
      </div>
    </div>
  );
}
