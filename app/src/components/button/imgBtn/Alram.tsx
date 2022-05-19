import { css, cx } from '@emotion/css';
import { color, shadow, btnStyle } from '../../../styles';
import Img from '../../img/Img';
import { Props } from '../index';

interface AlramProps extends Props {
  num: string | number;
}

function Alram(props: AlramProps) {
  const { disable, num, onClick } = props;

  const commonStyle = css`
    ${btnStyle.circle}
    width: 50px;
    height: 50px;
    padding: 10px;
    ${shadow.normal}
    background-size: 27.5px 30px;
    background-color: ${disable ? color.light4 : 'white'};
    position: fixed;
    bottom: 187px;
    right: 83px;
    z-index: 1;
  `;

  const alram = css`
    ${btnStyle.circle}
    width: 25px;
    height: 25px;
    background-color: ${color.main};
    color: white;
    position: absolute;
    bottom: 33px;
    left: 33px;
  `;
  const ableState = css`
    &:hover {
      background-color: ${color.subtle};
    }
    &:active {
      background-color: ${color.lighter};
    }
  `;

  const disableState = css`
    &:hover {
      background-color: ${color.light4};
    }
    &:active {
      background-color: ${color.light4};
    }
  `;

  const alramState = () => {
    const imgs = {
      able: 'img/alarm-bell.png',
      disable: 'img/alram-bell-white.png',
    };

    return disable ? (
      <Img src={imgs.disable} className={cx(disableState)} />
    ) : (
      <>
        <Img src={imgs.able} className={cx(ableState)} />
        {num !== '0' && num !== 0 && <div className={cx(alram)}>{num}</div>}
      </>
    );
  };

  return (
    <button
      onClick={onClick}
      className={cx(commonStyle, disable ? disableState : ableState)}
    >
      {alramState()}
    </button>
  );
}

export default Alram;
