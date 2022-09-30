/** @format */

import { cx, css } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { color, radius, font, shadow } from '../../styles';
import Category from './Category';

interface Props {
  num: number;
  resetPageInfo?: () => void;
}

export default function Categories({ num, resetPageInfo }: Props) {
  const categoryList = [
      '전체',
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
    param = useParams().no,
    list = categoryList.map((category: string, index: number) => ({
      name: category,
      no: index + 1,
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
    return css`
      width: calc(1128px + 30px);
      margin: 0 auto;
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
      :active {
        background-color: ${color.lighter};
        border-radius: 6px;
      }
    }

    .btn-arrow {
      width: 48px;
      height: 48px;
      position: absolute;
      top: calc(50% - 24px);
    }

    .prev {
      background: url('/img/arrow-left-main.png') no-repeat center/contain;
      left: calc(calc(calc(100% - 1128px) / 2) - 52px);
    }

    .next {
      background: url('/img/arrow-right-main.png') no-repeat center/contain;
      right: calc(calc(calc(100% - 1128px) / 2) - 26px);
    }
  `;

  const categories = (
    <div className={'box'}>
      <div className={'each'}>
        <Category
          key={'first'}
          shape={'circle'}
          name={list[arr[arr.length - 1]].name}
          id={list[arr[arr.length - 1]].no}
          img={list[arr[arr.length - 1]].img}
          resetPageInfo={resetPageInfo}
        />
      </div>
      {Array(showNumber)
        .fill(undefined)
        .map((_, index) => (
          <div className={'each'} key={index}>
            <Category
              key={index}
              shape={'circle'}
              id={list[arr[index]].no}
              name={list[arr[index]].name}
              img={list[arr[index]].img}
              resetPageInfo={resetPageInfo}
            />
          </div>
        ))}
      <div className={'each'}>
        <Category
          key={'last'}
          shape={'circle'}
          id={list[arr[showNumber]].no}
          name={list[arr[showNumber]].name}
          img={list[arr[showNumber]].img}
          resetPageInfo={resetPageInfo}
        />
      </div>
    </div>
  );

  useEffect(() => {
    const originArray = list.map((_, index) => index);
    setArr(originArray);
    const updatedArr = [...originArray];
    for (
      let count = 0;
      count < (Number(param) + categoryList.length - 4) % categoryList.length;
      count++
    ) {
      updatedArr.push(updatedArr[0]);
      updatedArr.shift();
      setArr(updatedArr);
    }
  }, [param]);

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
