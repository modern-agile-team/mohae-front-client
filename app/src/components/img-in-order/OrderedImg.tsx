import { css, cx } from '@emotion/css';
import { useState } from 'react';
import { color, radius, font, shadow } from '../../styles';
import Img from '../img/Img';

interface Props {
  [key: string]: any;
}

export default function OrderedImg(props: Props) {
  const IMAGES = [
    'img/camera.png',
    'img/edit.png',
    'img/filter.png',
    'img/heart-main.png',
    'img/study.png',
  ];
  const [clone, setClone] = useState(
    IMAGES.map((img) => {
      return {
        img: img,
        checked: false,
      };
    })
  );

  const style = css`
    width: 100%;
    height: 100%;
    padding: 8px 0 4px 8px;

    .wrapper {
      width: 100%;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      :hover {
        &::-webkit-scrollbar {
          display: block;
          background-color: rgba(0, 0, 0, 0);
          height: 5px;
          width: 0%;
          cursor: pointer;
        }
        &::-webkit-scrollbar-thumb {
          background-color: ${color.main};
          height: 5px;
          border-radius: 10px;
          cursor: pointer;
        }
        &::-webkit-scrollbar-track {
          background-color: ${color.light4};
          height: 5px;
          border-radius: 10px;
          box-shadow: inset 0px 0px 5px white;
          cursor: pointer;
        }
      }
    }
    .container {
      width: ${`${(138 + 8) * IMAGES.length - 8}px`};
      height: 115px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .item-box {
      width: 138px;
      height: 100%;
      border-radius: 6px;
      background-color: white;
      position: relative;
    }

    .sequence {
    }
  `;

  const sequence = css`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${color.main};
    color: ${color.main};
    border-radius: 50%;
    position: absolute;
    bottom: 4px;
    right: 4px;
  `;

  const selected = css`
    background-color: ${color.main};
    color: white;
  `;

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    const idx = Number(e.currentTarget.name);
    const target = clone[idx];
    if (!target.checked) {
      target.checked = !target.checked;
      const newClone = clone.filter((each, index) => index !== idx);

      const section = clone.reduce((acc, cur) => {
        if (cur.checked) {
          return ++acc;
        } else {
          return acc;
        }
      }, 0);
      newClone.splice(section - 1, 0, target);

      setClone(newClone);
    } else {
      target.checked = !target.checked;
      const newClone = clone.filter((each, index) => index !== idx);

      const section = clone.reduce((acc, cur) => {
        if (!cur.checked) {
          return ++acc;
        } else {
          return acc;
        }
      }, 0);
      newClone.splice(newClone.length - (section - 1), 0, target);

      setClone(newClone);
    }
  };

  const clickRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('clone :>> ', clone);
  };

  const images = clone.map((each, index) => {
    const order = each.checked ? selected : '';
    return (
      <button
        key={index}
        className={'item-box'}
        name={`${index}`}
        onClick={click}
      >
        <Img src={each.img} />
        <div className={cx(sequence, order)}>{index + 1}</div>
      </button>
    );
  });

  return (
    <>
      <div className={cx(style)}>
        <div className={'wrapper'}>
          <div className={'container'}>{images}</div>
        </div>
      </div>
      <button onClick={clickRequest}>{'호출'}</button>
    </>
  );
}
