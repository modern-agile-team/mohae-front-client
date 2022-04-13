import { css, cx } from '@emotion/css';
import { colors, font, radius } from '../../styles';
import { ReactElement } from 'react';

type Props = {
  largeCircle?: boolean;
  mediumCircle?: boolean;
  smallCircle?: boolean;
  smallSquare?: boolean;
  mediumSquare?: boolean;
  largeSquare?: boolean;
  children?: any;
};

function Basic(props: Props): ReactElement {
  const commonCircleStyle: any = css`
    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: 0 0 8px 0 rgba(132, 131, 141, 0.5);
    /* 섀도우 스타일 수정 필요 */

    ${radius.circle}
    ${font.weight.regular}
    color: ${colors.dark1};
    background-color: ${colors.white};
  `;
  type Style = {
    largeCircle: any;
    mediumCircle: any;
    smallCircle: any;
    square: any;
  };
  const style: Style = {
    largeCircle: css`
      ${commonCircleStyle};
      width: 160px;
      height: 160px;
      :hover {
        width: 180px;
        height: 180px;
        background-color: ${colors.subtle};
      }
    `,
    mediumCircle: css`
      ${commonCircleStyle};
      width: 90px;
      height: 90px;
      box-shadow: 0px 0px 8px rgba(255, 68, 94, 0.25);
      /* 수정 필요 */
      :hover {
        background-color: ${colors.subtle};
      }
    `,
    smallCircle: css`
      ${commonCircleStyle};
      width: 70px;
      height: 70px;
      :hover {
        width: 90px;
        height: 90px;
        background-color: ${colors.subtle};
      }
    `,
    square: css`
    ${commonCircleStyle};
      width: 100px;
      height: 36px

      :hover {
        background-color: ${colors.subtle}
      }
    `,
  };

  const circle = {
    large: (
      <button
        className={cx(
          style.largeCircle,

          font.size[16]
        )}
      >
        {props.children}
      </button>
    ),
    medium: (
      <button
        className={cx(
          style.mediumCircle,

          font.size[16]
        )}
      >
        {props.children}
      </button>
    ),
    small: (
      <button
        className={cx(
          style.smallCircle,

          font.size[16]
        )}
      >
        {props.children}
      </button>
    ),
  };

  const square: ReactElement = (
    <button
      className={cx(
        style.square,
        css`
          background-color: colors.white;
        `,
        css`
          color: colors.main;
        `,
        radius[6],
        font.size[14],
        font.weight.regular
      )}
    >
      {props.children}
    </button>
  );

  if (props.largeCircle) {
    return <>{circle.large}</>;
  } else if (props.mediumCircle) {
    return <>{circle.medium}</>;
  } else if (props.smallCircle) {
    return <>{circle.small}</>;
  } else {
    return <span>{'속성 확인'}</span>;
  }
}

export default Basic;
