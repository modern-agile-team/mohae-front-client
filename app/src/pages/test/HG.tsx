import { injectGlobal, cx, css } from '@emotion/css';
import Category from '../../components/category/Category';
// import Alarm from '../../components/button/img/alarm/Alarm';

export default function HG() {
  const pad = css`
    * {
      margin-bottom: 30px;
    }
  `;
  return (
    <>
      <Category largeCircle>{'카테고리'}</Category>
      {/* <Category mediumCircle>{'카테고리'}</Category>
      <Category smallCircle>{'카테고리'}</Category>
      <Category smallSquare>{'카테고리'}</Category>
      <Category mediumSquare>{'카테고리'}</Category>
      <Category largeSquare>{'카테고리'}</Category> */}
    </>
  );
}
