import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
import { ReactElement } from 'react';
import Basic from './Basic';

interface Props {
  [key: string]: boolean | any | string;
}

function Category(props: Props): ReactElement {
  const importURL = 'img/logo192.png';
  const [categories, setCategories] = useState([
      { name: '카테고리1', img: importURL },
      { name: '카테고리2', img: importURL },
      { name: '카테고리3', img: importURL },
      { name: '카테고리4', img: importURL },
      { name: '카테고리5', img: importURL },
      { name: '카테고리6', img: importURL },
      // { name: '카테고리9', img: importURL },
      // { name: '카테고리10', img: importURL },
      // { name: '카테고리11', img: importURL },
    ]),
    [sector, setSector] = useState(0),
    [move, setMove] = useState(0),
    boxLength = (168 + 24) * categories.length * 3,
    [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (sector === 6) {
      setCycle(cycle + 1);
    }
  }, [sector]);
  const wrapper = css`
    width: 100%;
    overflow: hidden;
    overflow-y: visible;
    height: 200px;
    padding: 16px 0;
    margin: -16px 0;
  `;

  const box = () => {
    let initTransition = 'none';
    console.log('index :>> ', sector);
    console.log('cycle :>> ', cycle);
    if (sector !== 0 && Math.abs(sector) % categories.length === 0) {
      initTransition = 'all 0.2s ease-out';
      // final move
      setTimeout(() => {
        setSector(0);
        setMove(0);
        initTransition = 'none';
      }, 250);
    } else if (!cycle) {
      initTransition = 'all 0.2s ease-out';
    } else {
      initTransition = 'all 0.2s ease-out';
      // else move
    }
    const firstSector = `translateX(-${boxLength / 3 + move}px)`;
    const col = `${boxLength}px`;
    return css`
      width: ${col};
      transition: ${initTransition};
      transform: ${firstSector};
      overflow-y: visible;
      height: 168px;
      display: flex;
      align-items: flex-start;
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
  };

  const item = css`
    width: 168px;
    height: 100%;
    overflow-y: visible;

    border-radius: 50%;
  `;

  const arrow = css`
    width: 40px;
    height: 30px;
  `;

  const bigCategories = categories.map((each, index) => (
    <div key={index} className={cx(item)}>
      <Basic name={each.name} img={each.img} />
    </div>
  ));

  const show = () => (
    <>
      {bigCategories}
      {bigCategories}
      {bigCategories}
    </>
  );

  return (
    <>
      <div className={cx(wrapper)}>
        <div className={cx(box())}>{show()}</div>
      </div>
      <button
        className={cx(arrow)}
        onClick={() => {
          setSector(sector - 1);
          setMove(move - 192);
        }}
      >
        {'<'}
      </button>
      <button
        className={cx(arrow)}
        onClick={() => {
          setSector(sector + 1);
          setMove(move + 192);
        }}
      >
        {'>'}
      </button>
    </>
  );
}

export default Category;
