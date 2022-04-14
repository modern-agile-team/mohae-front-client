import { injectGlobal, cx, css } from '@emotion/css';
import Category from '../../components/category/Category';
// import Alarm from '../../components/button/img/alarm/Alarm';

export default function HG() {
  const pad = css`
    margin-bottom: 30px;
  `;
  return (
    <>
      <Category largeCircle className={cx(pad)}>
        {'카테고리'}
      </Category>
      <Category mediumCircle className={cx(pad)}>
        {'카테고리'}
      </Category>
      <Category smallCircle className={cx(pad)}>
        {'카테고리'}
      </Category>
      <Category smallSquare className={cx(pad)}>
        {'카테고리'}
      </Category>
      <Category mediumSquare className={cx(pad)}>
        {'카테고리'}
      </Category>
      <Category largeSquare className={cx(pad)}>
        {'카테고리'}
      </Category>
    </>
  );
}