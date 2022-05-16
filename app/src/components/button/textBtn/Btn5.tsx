import { css, cx } from '@emotion/css';
import { color, shadow, font, btnStyle } from '../../../styles';
import { Props } from '../index';

function Btn5(props: Props) {
  const { disable, children, onClick } = props;
  const commonStyle = css`
    ${btnStyle.square}
    width: 74px;
    height: 43px;
    background-color: ${color.main};
    color: white;
    ${font.size[14]}
    ${font.weight.regular}
    ${shadow.normal}

    &:active {
      background-color: ${color.darker};
    }
  `;

  const disableState = css`
    cursor: unset;
    background-color: ${color.light4};
    &:active {
      background-color: ${color.light4};
    }
  `;

  const show = () =>
    disable ? (
      <button onClick={onClick} className={cx(commonStyle, disableState)}>
        {children}
      </button>
    ) : (
      <button onClick={onClick} className={cx(commonStyle)}>
        {children}
      </button>
    );

  return show();
}

export default Btn5;
