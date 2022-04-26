import { cx, css } from '@emotion/css';
import { useState } from 'react';
import { color, radius, font, shadow } from '../../styles';
import Basic from './Basic';

interface Props {
  [key: string]: any;
}

export default function Category(props: Props) {
  const imgURL = 'img/logo192.png';
  const [categories, setCategories] = useState([
      { name: '카테고리1', img: imgURL },
      { name: '카테고리2', img: imgURL },
      { name: '카테고리3', img: imgURL },
      { name: '카테고리4', img: imgURL },
      { name: '카테고리5', img: imgURL },
      { name: '카테고리6', img: imgURL },
      { name: '카테고리7', img: imgURL },
      { name: '카테고리8', img: imgURL },
    ]),
    [arr, setArr] = useState(categories.map((category, index) => index)),
    itemsize = 168,
    margin = 24,
    [sector, setSector] = useState(0),
    move = itemsize + margin;

  const categoryBox = css`
    position: relative;
  `;

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
      height: 168px;

      display: flex;
      align-items: center;
      transition: ${time};
      transform: ${translate};
    `;
  };

  const each = css`
    width: 168px;
    height: 168px;
    border-radius: 50%;
    margin-right: 24px;
    :hover {
      transition: all 0.2s ease-out;
      transform: scale(1.09523);
    }
    :active {
      background-color: ${color.lighter};
    }
  `;

  const show = (
    <div className={cx(box())}>
      <div className={cx(each)}>
        <Basic
          key={'first'}
          name={categories[arr[arr.length - 1]].name}
          img={imgURL}
        />
      </div>
      {Array(6)
        .fill(undefined)
        .map((item, index) => (
          <div className={cx(each)}>
            <Basic
              key={index}
              name={categories[arr[index]].name}
              img={imgURL}
            />
          </div>
        ))}
      <div className={cx(each)}>
        <Basic key={'last'} name={categories[arr[6]].name} img={imgURL} />
      </div>
    </div>
  );

  const updateItem = (array: number[]) => {
    setTimeout(() => {
      setArr(array);
      setSector(0);
    }, 500);
  };

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSector(sector + eval(`${e.currentTarget.name}1`));
    const updatedArr = [...arr];
    if (e.currentTarget.name === '+') {
      updatedArr.push(updatedArr[0]);
      updatedArr.shift();
      updateItem(updatedArr);
    } else {
      updatedArr.unshift(updatedArr[updatedArr.length - 1]);
      updatedArr.pop();
      updateItem(updatedArr);
    }
  };

  const btnCommonStyle = css`
    width: 48px;
    height: 48px;
    position: absolute;
    top: calc(50% - 24px);
  `;
  const prevBtn = css`
    ${btnCommonStyle}
    background: url('img/arrow-left-main.png') no-repeat center/contain;
    left: -48px;
  `;
  const nextBtn = css`
    ${btnCommonStyle}
    background: url('img/arrow-right-main.png') no-repeat center/contain;
    right: -48px;
  `;

  return (
    <>
      <div className={cx(categoryBox)}>
        <div className={cx(wrapper())}>{show}</div>
        <button className={cx(prevBtn)} onClick={click} name="-" />
        <button className={cx(nextBtn)} onClick={click} name="+" />
      </div>
    </>
  );
}
