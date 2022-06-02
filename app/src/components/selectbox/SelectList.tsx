import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, shadow, font } from '../../styles';
import Img from '../img/Img';

interface Props {
  category?: boolean;
  content: string[];
}

function SelectList(props: Props) {
  const { content, category } = props;
  const [show, setShow] = useState({
    list: content,
    able: false,
  });

  const listStyle = css`
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 30px;
    color: ${color.dark3};
    :hover {
      background-color: ${color.subtle};
      color: ${color.dark1};
    }
    span {
      cursor: pointer;
    }
  `;

  const onClick = (e: React.MouseEvent) => {
    console.log('e.target :>> ', e.currentTarget.textContent);
    setShow({ ...show, able: false });
  };

  const selectList = () =>
    show.list.map((el, i) => (
      <li className={cx(listStyle)} key={i} onClick={onClick}>
        <span>{el}</span>
      </li>
    ));

  return <>{selectList()}</>;
}

export default SelectList;
