import { useState } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
import { ReactElement } from 'react';
import Basic from './Basic';

interface Props {
  [key: string]: boolean | any | string;
}

function Category(props: Props): ReactElement {
  const [categories, setCategories] = useState([
    { name: '카테고리1', img: 'img/logo192.png' },
    { name: '카테고리2', img: 'img/logo192.png' },
    { name: '카테고리3', img: 'img/logo192.png' },
    { name: '카테고리4', img: 'img/logo192.png' },
    { name: '카테고리5', img: 'img/logo192.png' },
    { name: '카테고리6', img: 'img/logo192.png' },
    { name: '카테고리7', img: 'img/logo192.png' },
    { name: '카테고리8', img: 'img/logo192.png' },
    { name: '카테고리9', img: 'img/logo192.png' },
  ]);
  const [sector, setSector] = useState(0);

  const FadeIn = keyframes`
    from {
      opacity: 1;
    }
    to {
      width: 184px;
      height: 184px;
      margin: 0 -8px 0 16px;
      transform: translateY(-8px);
    }
  `;

  const wrapper = css`
    width: 100%;
    height: 168px;

    background-color: teal;
    display: flex;
    align-items: flex-start;
    overflow: visible;
    & > * {
      margin-left: 24px;
      :hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.09523);
      }
    }
    & > :first-child {
      margin: 0;
    }
  `;

  const box = css`
    width: 168px;
    height: 100%;

    border-radius: 50%;
  `;

  const arrow = css`
    width: 40px;
    height: 30px;
  `;

  const bigCategories = () => {
    const firstIndex = sector % categories.length;
    const indexNumber = Array(6)
      .fill(0)
      .map(function (each, index) {
        return (firstIndex + index) % categories.length;
      });
    const arr = indexNumber.map((num) =>
      num < 0 ? categories[categories.length + num] : categories[num]
    );
    return arr.map((each, index) => (
      <div key={index} className={cx(box)}>
        <Basic name={each.name} img={each.img} />
      </div>
    ));
  };

  return (
    <>
      <div className={cx(wrapper)}>{bigCategories()}</div>
      <button
        className={cx(arrow)}
        onClick={() => {
          setSector(sector - 1);
        }}
      >
        {'<'}
      </button>
      <button
        className={cx(arrow)}
        onClick={() => {
          setSector(sector + 1);
        }}
      >
        {'>'}
      </button>
    </>
  );
}

export default Category;
