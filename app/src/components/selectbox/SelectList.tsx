import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, shadow, font } from '../../styles';
import Img from '../img/Img';
import { Btn } from '../button';

interface Props {
  category?: boolean;
  content: string[];
  size: string;
}

function SelectList(props: Props) {
  const { content, category, size } = props;
  const [show, setShow] = useState({
    list: content,
    able: false,
  });

  const listStyle = css`
    ${size}
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

  const selectList = () => {
    const btnSize = css`
      width: 100px;
      height: 36px;
    `;
    return show.list.map((el, i) => (
      <li className={cx(listStyle)} key={i} onClick={onClick}>
        {!category ? (
          <span>{el}</span>
        ) : (
          <div className={cx(btnSize)}>
            <Btn white category>
              {el}
            </Btn>
          </div>
        )}
      </li>
    ));
  };

  return <>{selectList()}</>;
}

export default SelectList;
