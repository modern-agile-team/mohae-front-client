import React, { Dispatch } from 'react';
import { css, cx } from '@emotion/css';
import { Btn } from '../button';
import { color, shadow } from '../../styles';

interface Props {
  setPlaceholder: Dispatch<React.SetStateAction<string>>;
  size: string[];
  contents: string[];
  style: string;
}

function SelectList(props: Props) {
  const { setPlaceholder, size, contents, style } = props;

  const wrap = css`
    position: relative;
    background-color: white;
    z-index: 5;
    .container {
      ${size[1]}
      position: absolute;
      top: 0px;
      left: 0px;
      overflow-y: scroll;
      background-color: white;
      border-radius: 0px 0px 6px 6px;
      ${shadow.button}
    }
    .category {
      width: 100px;
      height: 36px;
    }
    ul {
      ${size[0]}
      padding-right: 20px;
      cursor: pointer;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${color.dark3};
      :hover {
        background-color: ${color.subtle};
        color: ${color.dark1};
      }
    }
  `;

  const onClick = (e: React.MouseEvent) => {
    setPlaceholder(e.currentTarget.id === null ? '' : e.currentTarget.id);
  };

  const lists = () =>
    contents.map((el, i) =>
      style === 'text' ? (
        <ul key={i} id={el} onClick={e => onClick(e)}>
          {el}
        </ul>
      ) : (
        <ul key={i} id={el} onClick={e => onClick(e)}>
          <div className='category'>
            <Btn white category>
              {el}
            </Btn>
          </div>
        </ul>
      )
    );

  return (
    <div className={cx(wrap)}>
      <div className='container'>{lists()}</div>
    </div>
  );
}

export default SelectList;
