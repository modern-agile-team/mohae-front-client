import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';

export default function Home() {
  const section = [1, 2, 3, 4];

  const style = css`
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
      <div className={cx(style, backColor)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque facilis
      </div>
    );
  });

  const container = css`
    overflow: auto;
    height: calc(100vh - 59px);
    scroll-snap-type: y;
    scroll-snap-points-y: repeat(300px);
    scroll-snap-type: y mandatory;
  `;

  return <div className={cx(container)}>{show}</div>;
}
