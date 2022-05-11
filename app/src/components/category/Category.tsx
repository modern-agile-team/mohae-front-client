import { cx, css } from '@emotion/css';
import { useState } from 'react';
import { color, radius, font, shadow } from '../../styles';
import Basic from './Basic';

interface Props {
  [key: string]: any;
}

export default function Category(props: Props) {
  const imgURL = '/img/study.png';
  const categories = [
      { name: '디자인', img: imgURL },
      { name: 'IT / 개발', img: imgURL },
      { name: '사진 / 영상', img: imgURL },
      { name: '기획 / 마케팅', img: imgURL },
      { name: '번역 / 통역', img: imgURL },
      { name: '문서작업', img: imgURL },
      { name: '컨설팅', img: imgURL },
      { name: '법률', img: imgURL },
      { name: '과외 / 레슨', img: imgURL },
      { name: '상담 / 운세', img: imgURL },
      { name: '이벤트', img: imgURL },
      { name: '핸드메이드', img: imgURL },
      { name: '취미', img: imgURL },
      { name: '생활서비스', img: imgURL },
      { name: '기타', img: imgURL },
    ],
    [arr, setArr] = useState(categories.map((category, index) => index)),
    itemsize = 120,
    margin = 48,
    [sector, setSector] = useState(0),
    move = itemsize + margin;

  const wrapper = () => {
    const row = `${itemsize * 1.09523 + 16}px`;
    return css`
      width: calc(1128px + 30px);
      margin: -16px auto;
      width: ${itemsize};
      height: ${row};
      display: flex;
      overflow: hidden;
      align-items: center;
      transform: translateX(-15px);
    `;
  };

  const box = () => {
    const translate = `translateX(${-1 * (move + move * sector) + 15}px)`;
    const time = sector ? '0.5s' : '0';
    const col = `${(itemsize + 24) * (arr.length + 2)}px`;
    return css`
      width: ${col};
      height: 120px;

      display: flex;
      align-items: center;
      transition: ${time};
      transform: ${translate};
    `;
  };

  const style = css`
    @media (max-width: 1200px) {
      width: 1200px;
      transform: translateX(-36px);
    }
    @media (min-width: 1200px) {
      transform: translateX(calc(-1 * calc(calc(100vw - 1128px) / 2)));
      width: 100vw;
    }
    background-color: ${color.subtle};
    position: relative;

    .wrapper {
      ${wrapper()}
    }

    .box {
      ${box()}
    }

    .each {
      width: 120px;
      height: 120px;
      margin-right: 48px;
      :hover {
        transition: all 0.2s ease-out;
        transform: scale(1.09523);
        /* transform: translateY(-10px); */
      }
      :active {
        background-color: ${color.lighter};
      }
    }

    .btn-arrow {
      width: 48px;
      height: 48px;
      position: absolute;
      top: calc(50% - 24px);
    }

    .prev {
      background: url('img/arrow-left-main.png') no-repeat center/contain;
      left: calc(calc(calc(100% - 1128px) / 2) - 52px);
    }

    .next {
      background: url('img/arrow-right-main.png') no-repeat center/contain;
      right: calc(calc(calc(100% - 1128px) / 2) - 26px);
    }
  `;

  const show = (
    <div className={'box'}>
      <div className={'each'}>
        <Basic
          key={'first'}
          name={categories[arr[arr.length - 1]].name}
          img={imgURL}
        />
      </div>
      {Array(7)
        .fill(undefined)
        .map((item, index) => (
          <div className={'each'}>
            <Basic
              key={index}
              name={categories[arr[index]].name}
              img={imgURL}
            />
          </div>
        ))}
      <div className={'each'}>
        <Basic key={'last'} name={categories[arr[7]].name} img={imgURL} />
      </div>
    </div>
  );

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const updateItem = (array: number[]) => {
      setTimeout(() => {
        setArr(array);
        setSector(0);
        target.disabled = false;
      }, 500);
    };
    target.disabled = true;
    setSector(sector + eval(`${target.name}1`));
    const updatedArr = [...arr];
    if (target.name === '+') {
      updatedArr.push(updatedArr[0]);
      updatedArr.shift();
      updateItem(updatedArr);
    } else {
      updatedArr.unshift(updatedArr[updatedArr.length - 1]);
      updatedArr.pop();
      updateItem(updatedArr);
    }
  };

  return (
    <div className={cx(style)}>
      <div className={'wrapper'}>{show}</div>
      <button className={'btn-arrow prev'} onClick={click} name="-" />
      <button className={'btn-arrow next'} onClick={click} name="+" />
    </div>
  );
}
