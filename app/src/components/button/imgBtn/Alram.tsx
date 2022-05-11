import { css, cx } from '@emotion/css';
import { color, shadow } from '../../../styles';
import { btnStyle, Props } from '../index';

function Alram(props: Props) {
  const { disable, msg, onClick } = props;
  const commonStyle = css`
    ${btnStyle.circle}
    width: 50px;
    height: 50px;
    padding: 10px;
    ${shadow.normal}
    background-size: 27.5px 30px;
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
    background: no-repeat center/contain url('img/alarm-bell.png');
    background-color: white;
    &:hover {
      background-color: ${color.subtle};
    }
    &:active {
      background-color: ${color.lighter};
    }
  `;

  const disableState = css`
    background: no-repeat center/contain url('img/alram-bell-white.png');
    background-color: ${color.light4};
    &:hover {
      background-color: ${color.light4};
    }
    &:active {
      background-color: ${color.light4};
    }
  `;

  const show = () =>
    disable ? (
      <button className={cx(disableState, commonStyle)}></button>
    ) : (
      <button onClick={onClick} className={cx(ableState, commonStyle)}>
        <div className={cx(alram)}>{msg}</div>
      </button>
    );

  return show();
}

export default Alram;
