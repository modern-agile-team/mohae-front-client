import { css, cx } from '@emotion/css';
import { color, font } from '../../styles/index';
import { Props } from '../button';

function PostIt(props: Props) {
  const { small, children } = props;

  const commonStyle = css`
    background-color: white;
    box-shadow: 0px 0px 5px 0 rgb(193, 193, 197);
    outline: none;
    position: relative;
  `;

  const smallBox = css`
    width: 736px;
    height: 194px;
    padding: 16px;
    color: ${color.dark1};
    p {
      ${font.size[16]}
      ${font.weight.regular}
      width: 704px;
      max-height: 127px;
    }
  `;

  const bigBox = css`
    width: 600px;
    height: 470px;
    padding: 16px 8px;
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
    position: absolute;
    top: -18.6px;
    right: -18.6px;
  `;

  const foldForBig = css`
    width: 40px;
    height: 40px;
    background: linear-gradient(
      to bottom left,
      #f9f9f9 0% 71.5%,
      rgb(219, 219, 219) 77%
    );
    position: absolute;
    top: -20.9px;
    right: -20.9px;
  `;

  const textContent = () =>
    children ? <p>{children}</p> : <p>한 줄 요약이 존재하지 않습니다.</p>;

  const show = () =>
    small ? (
      <div className={cx(commonStyle, smallBox)}>
        <div className={cx(foldForSmall)} />
        <div className={cx(title)}>한 줄 요약</div>
        {textContent()}
      </div>
    ) : (
      <div className={cx(commonStyle, bigBox)}>
        <div className={cx(foldForBig)} />
        {children}
      </div>
    );

  return show();
}

export default PostIt;
