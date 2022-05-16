import { cx, css } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { useState } from 'react';
import { color, radius, font, shadow } from '../../styles';
import Basic from './Basic';

interface Props {
  [key: string]: any;
}

export default function Category({ num }: Props) {
  const categoryList = [
      '디자인',
      'IT / 개발',
      '사진 / 영상',
      '기획 / 마케팅',
      '번역 / 통역',
      '문서작업',
      '컨설팅',
      '법률',
      '과외 / 레슨',
      '상담 / 운세',
      '이벤트',
      '핸드메이드',
      '취미',
      '생활서비스',
      '기타',
    ],
    list = categoryList.map((category: string, index: number) => ({
      name: category,
      img: `/img/category-${index}.png`,
    })),
    [arr, setArr] = useState(list.map((category, index) => index)),
    itemsize = 120,
    margin = num === 7 ? 48 : 24,
    showNumber = num || 7,
    [sector, setSector] = useState(0),
    move = itemsize + margin;

  const wrapper = () => {
    const row = `${itemsize * 1.09523 + 16}px`;
    const focus =
      num === 7
        ? css`
            :after {
              content: '';
              width: 120px;
              height: 120px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              ${radius[6]}
              ${shadow.normal}
            }
          `
        : null;
    return css`
      width: calc(1128px + 30px);
      margin: 0 auto;
      width: ${itemsize};
      height: ${row};
      display: flex;
      overflow: hidden;
      align-items: center;
      transform: translateX(-15px);
      ${focus}
    `;
  };

  const box = () => {
    const translate = `translateX(${-1 * (move + move * sector) + 15}px)`;
    const time = sector ? '0.5s' : '0';
    const col = `${move * (8 + 2)}px`;
    return css`
      width: ${col};
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: ${time};
      transform: ${translate};
      position: relative;
    `;
  };

  const shake = keyframes`
    0% {
      transform: translateY(0);
    }
    10%{
      transform: translateY(-15px);
    }
    20% {
      transform: translateY(0);
    }
    45% {
      transform: translateY(-10px);
    }
    50% {
      transform: translateY(0);
    }
  `;

  const style = css`
    @media (max-width: 1200px) {
      width: 1200px;
      transform: translateX(-36px);
    }
    @media (min-width: 1200px) {
      transform: translateX(calc(-1 * calc(calc(100vw - 1128px) / 2)));
      width: 100vw;
    }
    background-color: ${num % 2 === 1 ? 'none' : color.subtle};
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
      margin-right: ${`${margin}px`};
      :hover {
        animation: ${shake} 1.5s infinite;
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

  const categories = (
    <div className={'box'}>
      <div className={'each'}>
        <Basic
          key={'first'}
          name={list[arr[arr.length - 1]].name}
          img={list[arr[arr.length - 1]].img}
        />
      </div>
      {Array(showNumber)
        .fill(undefined)
        .map((item, index) => (
          <div className={'each'}>
            <Basic
              key={index}
              name={list[arr[index]].name}
              img={list[arr[index]].img}
            />
          </div>
        ))}
      <div className={'each'}>
        <Basic
          key={'last'}
          name={list[arr[showNumber]].name}
          img={list[arr[showNumber]].img}
        />
      </div>
    </div>
  );

  const clickArrowBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <div className={'wrapper'}>{categories}</div>
      <button className={'btn-arrow prev'} onClick={clickArrowBtn} name="-" />
      <button className={'btn-arrow next'} onClick={clickArrowBtn} name="+" />
    </div>
  );
}
