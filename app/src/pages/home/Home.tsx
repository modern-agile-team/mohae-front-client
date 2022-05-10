import { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';

export default function Home() {
  const section = [1, 2, 3, 4];
  const [part, setPart] = useState(0);

  const eachSection = css`
    height: calc(100vh - 59px);
    scroll-snap-align: start;
    text-align: center;
  `;

  const show = section.map((i, index) => {
    const backColor =
      index % 2 === 0
        ? css`
            background-color: ${color.light1};
          `
        : css`
            background-color: ${color.light4};
          `;
    return (
      <div key={`${index}`} className={cx(eachSection, backColor)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque facilis
      </div>
    );
  });

  const container = css`
    overflow: auto;
    height: calc(100vh - 59px);
    scroll-snap-type: y;
    scroll-snap-type: y mandatory;
    &::-webkit-scrollbar {
      display: none;
    }
    position: relative;
  `;

  const box = () => {
    const row = `calc(calc(100vh - 59px) * ${section.length})`;
    const translate = `translateY(calc(calc(100vh - 59px) * ${-part}))`;
    return css`
      height: ${row};
      /* transition: all 1s cubic-bezier(0.56, -0.06, 0.35, 1.05); */
      transition: all 0.8s cubic-bezier(0.61, 0.31, 0.36, 0.69);

      transform: ${translate};
    `;
  };

  const circleWrapper = css`
    position: fixed;
    z-index: 3;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 27px;
    /* height: 68px; */
    height: 100px;
  `;

  const circle = css`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: pink;
  `;

  const clickCircle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPart(Number(e.currentTarget.name));
  };

  const pageCircles = section.map((i, index) => (
    <button
      key={index}
      className={cx(circle)}
      name={`${index}`}
      onClick={clickCircle}
    />
  ));

  // 스크롤 값에 part 증감 시 최대 최소 지정해서 그에 맞는 section 설정

  return (
    <>
      <div className={cx(container)}>
        <div className={cx(circleWrapper)}>{pageCircles}</div>
        <div className={cx(box())}>{show}</div>
      </div>
    </>
  );
}
