/** @format */
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import {
  Img,
  Poster,
  NewPost,
  Box,
  Profile,
  FocusBar,
  Category,
} from '../../components';

export default function Review() {
  const text: { [key: string]: any } = {
    rating: '총 평점',
  };

  const style = css`
    width: 100%;
    height: fit-content;
    margin-bottom: 64px;
    .score {
      color: ${color.main};
      margin: 0 4px;
    }
    .title {
      width: 100%;
      height: fit-content;
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      * {
        ${font.weight[700]}
      }
      .star {
        width: 30px;
        height: 30px;
        margin-right: 8px;
      }
      .number {
        color: ${color.dark3};
      }
    }
    .each {
      width: 100%;
      height: fit-content;
      margin: 32px 0;
      display: flex;
      justify-content: space-between;
      .start {
        justify-content: flex-start;
      }
      .profile {
        width: fit-content;
        display: flex;
        /* width: 931px; */
        margin-bottom: 16px;
      }
      .info-box {
        margin-left: 16px;
      }
      .name {
        width: fit-content;
        ${font.weight[700]}
        font-size: 14px;
      }
      .stars {
        justify-content: flex;
        flex-direction: row;
        align-items: center;
        height: 20px;
        > :not(:last-child) {
          margin-right: 4px;
        }
        * {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
      }
      .description {
        display: flex;
        width: 100%;
        padding-right: 24px;
        height: fit-content;
        max-height: 69px;
        font-size: 14px;
        overflow: hidden;
      }
    }
  `;

  return (
    <div className={style}>
      <div className={'title'}>
        <div className={'star'}>
          <Img src={'/img/star-filled.png'} />
        </div>
        <div className={'rating'}>{text.rating}</div>
        <div className={'score'}>{'3.0'}</div>
        <div className={'number'}>{`(${3})`}</div>
      </div>
      <FocusBar thin light3 />
      <div className={'each'}>
        <div className={'start'}>
          <div className={'profile'}>
            <Profile size={45} isLogin={false} />
            <div className={'info-box'}>
              <div className={'name'}>{'이름입니다'}</div>
              <div className={'stars'}>
                <Img src={'/img/star-filled.png'} />
                <Img src={'/img/star-filled.png'} />
                <Img src={'/img/star-filled.png'} />
                <Img src={'/img/star-filled.png'} />
                <Img src={'/img/star-filled.png'} />
              </div>
            </div>
          </div>
          <div className={'description'}></div>
        </div>
        {/* <Poster inReview title={'123'} /> */}
      </div>
      <FocusBar thin light3 />
      <div className={'each'}>
        <div className={'start'}>
          <div className={'profile'}>
            <Profile size={45} isLogin={false} />
            <div className={'info-box'}>
              <div className={'name'}>{'이름입니다'}</div>
              <div className={'stars'}>
                <Img src={'/img/star-filled.png'} />
                <Img src={'/img/star-filled.png'} />
                <Img src={'/img/star-filled.png'} />
                <Img src={'/img/star-filled.png'} />
                <Img src={'/img/star-filled.png'} />
              </div>
            </div>
          </div>

          <div className={'description'}>
            {
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati quaerat et nesciunt suscipit quis iusto, aperiam harum iste, excepturi illum officia facilis modi debitis esse provident consequatur, similique quasi ipsum.or sit amet consectetur adipisicing elit. Obcaecati quaerat et nesciunt suscipit quis iusto, aperiam harum iste, excepturi illum officia facilis modi debitis esse provident consequatur, similique quasi ipsum'
            }
          </div>
        </div>
        {/* <Poster inReview title={'123'} /> */}
      </div>
      <FocusBar thin light3 />
    </div>
  );
}
