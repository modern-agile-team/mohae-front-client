import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color } from '../../../styles';
import { Box } from '../..';
import MarkBox from '../../markbox/MarkBox';
import { Props, Style, posterStyle, checkIn } from '../common';

function PagePoster({
  place,
  title,
  writer,
  price,
  img,
  location,
  dDay,
  state,
}: any) {
  const [mouseHover, setMouseHover] = useState(false);

  const imgUrl = img ? img : '/img/logo.png';

  const backImg = css`
    background: white url(${imgUrl}) no-repeat center/cover;
    background-size: ${img ? '100%' : '30%'};
    :hover {
      animation: ${img === null && 'none'};
    }
  `;

  const mouseIn = () => {
    setMouseHover(true);
  };

  const mouseOut = () => {
    setMouseHover(false);
  };

  if (title.length > 13) {
    title = title.substr(0, 13) + '...';
  }

  return (
    <div
      onClick={() => alert('clicked!')}
      className={css`
        cursor: pointer;
      `}>
      <Box color={'white'} radius={'normal'} shadow={'normal'}>
        <div className={cx(checkIn[`${place}`]['container'])}>
          <div
            className={cx(
              posterStyle.imgBox,
              backImg,
              checkIn[`${place}`]['imgBox']
            )}>
            {state === 'end' && (
              <div
                className={css`
                  height: inherit;
                  background: ${color.dark1};
                  opacity: 0.5;
                `}></div>
            )}
            <div className={cx(checkIn[`${place}`]['markBox'])}>
              <MarkBox hover big helpMeAble />
            </div>
          </div>
          <div
            onMouseEnter={mouseIn}
            onMouseLeave={mouseOut}
            className={cx(posterStyle.infoBox, checkIn[`${place}`]['infoBox'])}>
            {mouseHover ? (
              <>
                <div className={cx(posterStyle.leftInfoContainer)}>
                  <div
                    className={cx(
                      posterStyle.title,
                      checkIn[`${place}`]['title']
                    )}>
                    {location}
                  </div>
                </div>
                <div
                  className={cx(
                    posterStyle.price,
                    checkIn[`${place}`]['price']
                  )}>
                  {dDay === 'D - 0' ? (
                    <span
                      className={css`
                        color: ${color.main};
                      `}>
                      D - DAY
                    </span>
                  ) : (
                    <span>{dDay}</span>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className={cx(posterStyle.leftInfoContainer)}>
                  <div
                    className={cx(
                      posterStyle.title,
                      checkIn[`${place}`]['title']
                    )}>
                    {title}
                  </div>
                  <div
                    className={cx(
                      posterStyle.writer,
                      checkIn[`${place}`]['writer']
                    )}>
                    {writer}
                  </div>
                </div>
                <div
                  className={cx(
                    posterStyle.price,
                    checkIn[`${place}`]['price']
                  )}>
                  {price === '나눔' ? (
                    <span
                      className={css`
                        color: ${color.main};
                      `}>
                      나눔
                    </span>
                  ) : (
                    <span>{price}</span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default PagePoster;
