import { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, font } from '../../styles';
import { Box } from '../../components';

interface Props {
  [key: string]: any;
}

interface CheckSize {
  [key: string]: any;
}

function InfoBox({ place, title, writer, price, location, dDay }: Props) {
  const [mouseHover, setMouseHover] = useState(false);

  const mouseIn = () => {
    setMouseHover(true);
  };

  const mouseOut = () => {
    setMouseHover(false);
  };

  title = title.length > 13 ? title.substr(0, 13) + '...' : title;

  const checkSize: CheckSize = {
    // boxSize, padding
    inMain: [
      [360, 76],
      [16, 16],
    ],
    inBoard: [
      [264, 56],
      [8, 12],
    ],
    inSpec: [
      [228, 57],
      [16, 16],
    ],
    inReview: [
      [173, 33],
      [8, 8],
    ],
  };

  const titleStyles: CheckSize = {
    inMain: css`
      ${font.size[14]}
      ${font.weight[700]}
      width: 194px;
      height: 24px;
    `,
    inBoard: css`
      ${font.size[12]}
      ${font.weight[700]}
      width: 154px;
      height: 20px;
    `,
    inSpec: css`
      ${font.size[14]}
      ${font.weight[700]}
      width: 196px;
      height: 25px;
    `,
    inReview: css`
      ${font.size[12]}
      ${font.weight[700]}
      width: 157px;
      height: 17px;
    `,
  };

  const priceStyles: CheckSize = {
    inMain: css`
      ${font.size[16]}
      ${font.weight[700]}
      width: 92px;
      height: 27px;
    `,
    inBoard: css`
      ${font.size[14]}
      ${font.weight[700]}
      width: 80px;
      height: 24px;
    `,
  };

  const writerStyles: CheckSize = {
    inMain: css`
      ${font.size[12]}
      ${font.weight[400]}
      width: 78px;
      height: 20px;
    `,
    inBoard: css`
      ${font.size[12]}
      ${font.weight[400]}
      width: 90px;
      height: 20px;
    `,
  };

  const size = [checkSize[place][0][0], checkSize[place][0][1]];

  const padding = checkSize[place][1];

  const box = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${padding[0]}px ${padding[1]}px;

    .leftInfoContainer {
      display: flex;
      flex-direction: column;
    }

    .titleStyle {
      display: flex;
      justify-content: start;
      align-items: center;
      ${titleStyles[place]}
    }

    .writerStyle {
      display: flex;
      justify-content: start;
      align-items: center;
      ${writerStyles[place]}
    }
  `;

  const priceStyle = css`
    display: flex;
    justify-content: end;
    align-items: center;
    ${priceStyles[place]}
    color: ${price === '나눔' ? color.main : color.dark1};
  `;

  const dDayColor = css`
    color: ${dDay === 'D - 0' ? color.main : color.dark1};
  `;

  dDay = dDay === 'D - 0' ? 'D - DAY' : dDay;

  const placeCondition = place === 'inMain' || place === 'inBoard';

  const hoverEvent = (
    <>
      <div className={'leftInfoContainer'}>
        <div className={'titleStyle'}>{location}</div>
      </div>
      <div className={cx(priceStyle, dDayColor)}>{dDay}</div>
    </>
  );

  const noneHoverEvent = (
    <>
      <div className={'leftInfoContainer'}>
        <div className={'titleStyle'}>{title}</div>
        <div className={'writerStyle'}>{writer}</div>
      </div>
      <div className={cx(priceStyle)}>{price}</div>
    </>
  );

  return (
    <div onMouseEnter={mouseIn} onMouseLeave={mouseOut}>
      <Box noRadius size={size} className={box}>
        {placeCondition && mouseHover ? hoverEvent : noneHoverEvent}
      </Box>
    </div>
  );
}

export default InfoBox;
