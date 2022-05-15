import { css, cx } from '@emotion/css';
import { color } from '../../../styles';
import { Box } from '../../../components';
import MarkBox from '../../markbox/MarkBox';
import { Props, Style, posterStyle, checkIn } from '../common';

function UserPoster({ markBox, place, img, title, state }: any) {
  const imgUrl = img ? img : '/img/logo.png';

  const backImg = css`
    background: white url(${imgUrl}) no-repeat center/cover;
    background-size: ${img ? '100%' : '30%'};
    :hover {
      animation: ${img === null && 'none'};
    }
  `;

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

            {markBox &&
              (place === 'inSpec' ? (
                <div className={cx(checkIn[`${place}`]['markBox'])}>
                  <MarkBox big helpMeAble />
                </div>
              ) : (
                <div className={cx(checkIn[`${place}`]['markBox'])}>
                  <MarkBox helpMeAble />
                </div>
              ))}
          </div>
          <div
            className={cx(posterStyle.infoBox, checkIn[`${place}`]['infoBox'])}>
            <div className={cx(posterStyle.leftInfoContainer)}>
              <div
                className={cx(posterStyle.title, checkIn[`${place}`]['title'])}>
                {title}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default UserPoster;
