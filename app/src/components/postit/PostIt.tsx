import { css, cx } from '@emotion/css';
import { color, font } from '../../styles/index';
import { Props } from '../button';

function PostIt(props: Props) {
  const { small, children } = props;

  const commonStyle = css`
    ${font.weight.regular}
    background-color: white;
    box-shadow: 0px 0px 5px 0 rgb(193, 193, 197);
    padding: 16px 35px 16px 16px;
    outline: none;
  `;

  const smallBox = css`
    width: 501px;
    height: 210px;
    color: ${color.dark1};
    ${font.size[16]}
  `;

  const bigBox = css`
    width: 600px;
    height: 470px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const title = css`
    height: 27px;
    ${font.size[18]}
    ${font.weight.bold}
    padding: 0px 0px 8px 0px;
  `;

  const foldForSmall = css`
    width: 35px;
    height: 35px;
    background: linear-gradient(
      to bottom left,
      #f9f9f9 0% 71.5%,
      rgb(219, 219, 219) 77%
    );
    margin: -228.8px 0px 0px 484.2px;
  `;

  const foldForBig = css`
    width: 40px;
    height: 40px;
    background: linear-gradient(
      to bottom left,
      #f9f9f9 0% 71.5%,
      rgb(219, 219, 219) 77%
    );
    margin: -491.2px 0px 0px 581.2px;
  `;

  const show = () =>
    small ? (
      <>
        <div className={cx(commonStyle, smallBox)}>
          <div className={cx(title)}>한 줄 요약</div>
          {children}
        </div>
        <div className={cx(foldForSmall)} />
      </>
    ) : (
      <>
        <div className={cx(commonStyle, bigBox)}>{children}</div>
        <div className={cx(foldForBig)} />
      </>
    );

  return show();
}

export default PostIt;
