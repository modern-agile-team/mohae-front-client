import { css, cx } from '@emotion/css';
import { Box } from '../../components';
import MarkBox from '../markbox/MarkBox';
import ImgBox from './ImgBox';
import InfoBox from './InfoBox';

interface Props {
  [key: string]: any;
}

interface CheckPlace {
  [key: string]: any;
}

interface CheckSize {
  [key: string]: number[];
}

function Poster(props: Props) {
  const {
    inMain,
    inBoard,
    inSpec,
    inReview,
    noMark,
    title,
    writer,
    price,
    img,
    location,
    dDay,
    state,
  } = props;

  const checkSize: CheckSize = {
    inMain: [360, 284],
    inBoard: [264, 208],
    inSpec: [228, 177],
    inReview: [173, 130],
  };

  const [place] = Object.keys(props).filter((prop) =>
    Object.keys(checkSize).includes(prop)
  );

  const size = checkSize[place];

  const markVisible = !noMark;

  const box = css`
    cursor: pointer;
  `;

  const wrapper = css`
    width: fit-content;
    height: fit-content;
    position: relative;
  `;

  const markBox = css`
    z-index: 2;
    position: absolute;
    top: ${place === 'inReview' ? 8 : 16}px;
    right: ${place === 'inReview' ? 8 : 16}px;
  `;

  return (
    <div className={cx(wrapper)}>
      {markVisible && (
        <div className={cx(markBox)}>
          {/* <MarkBox {...markHover} {...markSize} style={markStyle} /> */}
        </div>
      )}
      <div onClick={() => alert('clicked!')}>
        <Box size={size} className={box}>
          <ImgBox place={place} img={img} state={state} />
          <InfoBox
            place={place}
            title={title}
            writer={writer}
            price={price}
            location={location}
            dDay={dDay}
          />
        </Box>
      </div>
    </div>
  );
}

export default Poster;
