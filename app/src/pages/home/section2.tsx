/** @format */

import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';

export default function Part2() {
  const text = {
    recommend: {
      '1-1': `쉽고 빠르게 내가 원하는 분야의`,
      '1-2': `전문가를 찾을 수 있어요.`,
      '2-1': `나의 재능을 활용해서 필요한 사람들에게`,
      '2-2': `도움을 줄 수 있어요.`,
      '3-1': `다양한 경험을 통해`,
      '3-2': `나만의 스펙을 쌓을 수 있어요.`,
    },
  };

  const style = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: calc((100vh - 59px - 448px) / 2) 0;

    .title {
      font-weight: 700;
      font-size: 28px;
      line-height: 130%;
      color: ${color.dark1};
      margin: 0 0 56px;
    }

    .container {
      width: 100%;
      height: fit-content;
      padding: 0 calc((100% - 1128px) / 2);
      display: flex;
      justify-content: space-between;
    }

    .img {
      width: 360px;
      height: 270px;
      margin: 0 0 32px;
      background-color: white;
      ${radius[6]};
      overflow: hidden;
      ${shadow.normal};
    }

    .recommend1 {
      background: url('/img/recommend1-1.jpg') no-repeat center/contain;
      transition: 0.3s all ease-in-out;
      :hover {
        transition: 0.3s all ease-in-out;
        background: url('/img/recommend1-2.jpg') no-repeat center/contain;
      }
    }

    .recommend2 {
      background: url('/img/recommend2-1.jpg') no-repeat center/contain;
      transition: 0.3s all ease-in-out;
      :hover {
        transition: 0.3s all ease-in-out;
        background: url('/img/recommend2-2.jpg') no-repeat center/contain;
      }
    }

    .recommend3 {
      background: url('/img/recommend3-1.jpg') no-repeat center/contain;
      transition: 0.3s all ease-in-out;
      :hover {
        transition: 0.3s all ease-in-out;
        background: url('/img/recommend3-2.jpg') no-repeat center/contain;
      }
    }

    .description {
      max-width: 360px;
      max-height: 54px;
      overflow: hidden;
      line-height: 27.2px;
    }
  `;

  const page = (
    <div className={cx(style)}>
      <span className={'title'}>{'이런 사람들이 사용하면 좋아요!'}</span>
      <div className={'container'}>
        <div>
          <div className={'img recommend1'} />
          <div className={'description'}>
            <div>{text.recommend['1-1']}</div>
            <div>{text.recommend['1-2']}</div>
          </div>
        </div>
        <div>
          <div className={'img recommend2'} />
          <div className={'description'}>
            <div>{text.recommend['2-1']}</div>
            <div>{text.recommend['2-2']}</div>
          </div>
        </div>
        <div>
          <div className={'img recommend3'} />
          <div className={'description'}>
            <div>{text.recommend['3-1']}</div>
            <div>{text.recommend['3-2']}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{page}</>;
}
