import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';

export default function Home() {
  const section = [1, 2, 3, 4];

  const style = css`
    height: calc(100vh - 59px);
    background-color: gray;
  `;

  const show = section.map((i, index) => {
    const backColor =
      index % 2 === 0
        ? css`
            background-color: ${color.light1};
          `
        : css`
            background-color: ${color.light2};
          `;
    return (
      <div className={cx(style, backColor)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque facilis
      </div>
    );
  });
  return <>{show} </>;
}
