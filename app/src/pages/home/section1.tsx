/** @format */

import { css, cx } from '@emotion/css';
import { color } from '../../styles';
import { Categories, Img, Search } from '../../components';

export default function Part1() {
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
          <div className={'main-img'} />
          <Search main />
        </div>
      </div>
      <div className={'category'}>
        <Categories num={8} />
      </div>
      <div className={'scroll'}>{'Scroll'}</div>
      <div className={'arrow-down'}>
        <Img src={'img/scroll.png'} />
      </div>
    </div>
  );
}

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
      position: relative;
      form {
        z-index: 2;
      }

      .main-img {
        width: 552px;
        height: 391px;
        position: absolute;
        z-index: 3;
        top: -290px;
        right: -480px;
        background: url('/img/main.png') no-repeat center/contain;
      }
    }
  }
  > .category {
    margin-top: 70px;
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
