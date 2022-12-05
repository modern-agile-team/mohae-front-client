/** @format */

import { cx, css } from '@emotion/css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { color } from '../../styles';
import Category from './Category';
import { categoryList } from '../../consts/listStore';

interface Props {
  num: number;
}

function Categories({ num }: Props) {
  const param = useParams().no;
  const [arr, setArr] = useState(
    categoryList({ shift: false }).map((_, index) => index),
  );
  const itemsize = 120;
  const margin = num === 7 ? 48 : 24;
  const showNumber = num || 7;
  const [sector, setSector] = useState(0);
  const move = itemsize + margin;

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
      color: #4f4e5c;
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
          name={categoryList({ shift: false })[arr[arr.length - 1]].name}
          id={categoryList({ shift: false })[arr[arr.length - 1]].no}
          img={categoryList({ shift: false })[arr[arr.length - 1]].img}
        />
      </div>
      {Array(showNumber)
        .fill(undefined)
        .map((_, index) => (
          <div className={'each'} key={index}>
            <Category
              key={index}
              shape={'circle'}
              id={categoryList({ shift: false })[arr[index]].no}
              name={categoryList({ shift: false })[arr[index]].name}
              img={categoryList({ shift: false })[arr[index]].img}
            />
          </div>
        ))}
      <div className={'each'}>
        <Category
          key={'last'}
          shape={'circle'}
          id={categoryList({ shift: false })[arr[showNumber]].no}
          name={categoryList({ shift: false })[arr[showNumber]].name}
          img={categoryList({ shift: false })[arr[showNumber]].img}
        />
      </div>
    </div>
  );

  useEffect(() => {
    const originArray = categoryList({ shift: false }).map((_, index) => index);
    setArr(originArray);
    const updatedArr = [...originArray];
    for (
      let count = 0;
      count <
      (Number(param) + categoryList({ shift: false }).length - 4) %
        categoryList({ shift: false }).length;
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
    setSector(sector + eval(`${target.id}1`));
    const updatedArr = [...arr];
    if (target.id === '+') {
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
      <button
        className={'btn-arrow prev'}
        onClick={clickArrowBtn}
        id="-"
        name="show-previous-category-button"
      />
      <button
        className={'btn-arrow next'}
        onClick={clickArrowBtn}
        id="+"
        name="show-next-category-button"
      />
    </div>
  );
}
export default React.memo(Categories);
