import { useState } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
import { ReactElement } from 'react';
import Basic from './Basic';

interface Props {
  [key: string]: boolean | any | string;
}

function Category(props: Props): ReactElement {
  const [categories, setCategories] = useState([
    { name: '디자인', img: 'img/logo192.png' },
    { name: '개발', img: 'img/logo192.png' },
    { name: '영상', img: 'img/logo192.png' },
    { name: '미용', img: 'img/logo192.png' },
    { name: '일상', img: 'img/logo192.png' },
    { name: '기타', img: 'img/logo192.png' },
  ]);

  const FadeIn = keyframes`
    from {
      opacity: 1;
    }
    to {
      width: 184px;
      height: 184px;
      margin: 0 -8px 0 16px;
      transform: translateY(-8px);
    }
  `;

  const wrapper = css`
    width: 100%;
    height: 168px;

    background-color: teal;
    display: flex;
    align-items: flex-start;
    overflow: visible;
    & > * {
      margin-left: 24px;
      :hover {
        /* animation-name: ${FadeIn};
        animation-duration: 0.2s; */
        transition: all 0.2s ease-in-out;
        transform: scale(1.09523);
      }
    }
    & > :first-child {
      margin: 0;
      :hover {
        width: 184px;
        height: 184px;
        margin: 0 -8px 0;
      }
    }
  `;

  const box = css`
    width: 168px;
    height: 100%;

    border-radius: 50%;
  `;

  const bigCategories = categories.map((each, index) => (
    <div key={index} className={cx(box)}>
      <Basic name={each.name} img={each.img} />
    </div>
  ));

  return <div className={cx(wrapper)}>{bigCategories}</div>;
}

export default Category;
