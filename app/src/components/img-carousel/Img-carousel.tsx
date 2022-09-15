/** @format */

import { cx, css } from '@emotion/css';
import { Dispatch, SetStateAction, useState } from 'react';
import Img from '../img/Img';
import { color } from '../../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

interface Props {
  [key: string]: any;
  setImgIndex?: Dispatch<SetStateAction<number>>;
}

export default function Carousel({
  imgs,
  outsideBtn,
  imgIndex,
  setImgIndex,
}: Props) {
  const reduxImgs = useSelector(
    (state: RootState) => state.createPost.data.imgArr,
  );
  const IMAGES = imgs || [...reduxImgs];

  const [sector, setSector] = useState(0);
  const imgIndexIsDefine = (): number => {
    return imgIndex ? imgIndex : sector;
  };
  const setImgIndexIsDefine = (index: number) => {
    if (!setImgIndex) setSector(index);
    else setImgIndex(index);
  };

  const handleCheckPrevSlide = (index: number) => {
    if (IMAGES.length + index === IMAGES.length) {
      return false;
    }
    return true;
  };

  const handleCheckNextSlide = (index: number) => {
    if (index === IMAGES.length - 1) {
      return false;
    }
    return true;
  };

  const container = () => {
    const col = IMAGES.length ? `calc(100% * ${IMAGES.length})` : '100%';
    const translate = `translateX(calc(${100 / IMAGES.length}% * ${
      (-1 * ((imgIndexIsDefine() % IMAGES.length) + IMAGES.length)) %
      IMAGES.length
    }))`;
    return css`
      width: ${col};
      transition: 0.3s;
      transform: ${translate};
      height: 100%;
      display: flex;
      align-items: center;
    `;
  };

  const style = css`
    width: 100%;
    height: 100%;
    background-color: white;
    position: relative;
    border-radius: inherit;

    .test {
      width: 100%;
      height: 100%;
    }

    .box {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 6px;
      .container {
        ${container()}
        .img {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 400px;

          img {
            width: 100%;
          }
        }

        .altImg {
          width: 50%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;

          img {
            width: 50%;
          }
        }
        .altcontainer {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;

          .altImg {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 400px;

            img {
              width: 100%;
            }
          }
        }
      }
    }

    .btn {
      width: 48px;
      height: 48px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .prev {
      left: ${outsideBtn ? `-48px` : '0'};
      background: url(${handleCheckPrevSlide(imgIndex)
          ? '/img/arrow-left-main.png'
          : '/img/arrow-left-light1.png'})
        no-repeat center/contain;
    }
    .next {
      right: ${outsideBtn ? `-48px` : '0'};
      background: url(${handleCheckNextSlide(imgIndex)
          ? '/img/arrow-right-main.png'
          : '/img/arrow-right-light1.png'})
        no-repeat center/contain;
    }

    .circles-container {
      width: ${`${IMAGES.length * 24 - 16}px`};
      height: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
    }
  `;

  const circle = (index: number) => {
    const currentSize =
      ((imgIndexIsDefine() % IMAGES.length) + IMAGES.length) % IMAGES.length ===
      index
        ? 1.75
        : 1;
    const currentColor =
      ((imgIndexIsDefine() % IMAGES.length) + IMAGES.length) % IMAGES.length ===
      index
        ? `${color.main}`
        : `${color.light1}`;
    return css`
      background-color: ${currentColor};
      width: 8px;
      height: 8px;
      border-radius: 50%;
      transition: 0.2s;
      transform: ${`scale(${currentSize})`};
      :hover {
        transition: 0s;
        background-color: ${color.main};
      }
    `;
  };

  const clickArrowBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === '+') {
      if (imgIndex === IMAGES.length - 1) setImgIndexIsDefine(0);
      else setImgIndexIsDefine(imgIndexIsDefine() + 1);
    } else {
      if (imgIndex === 0) setImgIndexIsDefine(IMAGES.length - 1);
      else setImgIndexIsDefine(imgIndexIsDefine() - 1);
    }
  };

  const circleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setImgIndexIsDefine(Number(e.currentTarget.id));
  };

  const circles = IMAGES.map((_: string, index: number) => (
    <button
      key={index}
      id={`${index}`}
      onClick={circleClick}
      className={cx(circle(index))}
    />
  ));

  return (
    <div className={cx(style)}>
      <div className={'box'}>
        <div className={'container'}>
          {IMAGES.length ? (
            IMAGES.map((el: string, index: number) => (
              <div className="img" key={index}>
                <Img src={el} />
              </div>
            ))
          ) : (
            <div className={'altImg'}>
              <Img src={'/img/logo.png'} />
            </div>
          )}
        </div>
      </div>
      {IMAGES.length > 0 && (
        <button className={'btn prev'} onClick={clickArrowBtn} name="-" />
      )}
      {IMAGES.length > 0 && (
        <button className={'btn next'} onClick={clickArrowBtn} name="+" />
      )}
      {/* arrowBtn comp */}
      {IMAGES.length > 1 && (
        <div className={'circles-container'}>{circles}</div>
      )}
    </div>
  );
}
