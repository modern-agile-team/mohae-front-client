import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import { Btn } from '../button';
import { color, shadow } from '../../styles';
import { useDispatch } from 'react-redux';
import { setAreaName, setAreaNo } from '../../redux/filter/reducer';

interface Contents {
  no: string;
  name: string;
}
interface Props {
  size: string[];
  contents: Contents[];
  style: string;
  setSelected: Dispatch<SetStateAction<string>>;
  handleView: () => void;
}

function SelectList(props: Props) {
  const { size, contents, style, setSelected, handleView } = props;
  const dispatch = useDispatch();

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
  const onClick = {
    area: (e: React.MouseEvent, selected: string) => {
      dispatch(setAreaNo(e.currentTarget.id));
      dispatch(
        setAreaName(
          e.currentTarget.textContent === null
            ? ''
            : e.currentTarget.textContent,
        ),
      );
      setSelected(selected);
      handleView();
    },
    date: (e: React.MouseEvent, selected: string) => {
      dispatch(setAreaNo(e.currentTarget.id));
      dispatch(
        setAreaName(
          e.currentTarget.textContent === null
            ? ''
            : e.currentTarget.textContent,
        ),
      );
      setSelected(selected);
      handleView();
    },
    category: (e: React.MouseEvent, selected: string) => {
      dispatch(setAreaNo(e.currentTarget.id));
      dispatch(
        setAreaName(
          e.currentTarget.textContent === null
            ? ''
            : e.currentTarget.textContent,
        ),
      );
      setSelected(selected);
      handleView();
    },
  };

  const lists = () =>
    contents.map((el, i: any) =>
      style === 'text' ? (
        <ul key={i} id={el.no} onClick={e => onClick.area(e, el.name)}>
          {el.name}
        </ul>
      ) : (
        <ul key={i} id={i} onClick={e => onClick.category(e, el.name)}>
          <div className="category">
            <Btn white category>
              {el.name}
            </Btn>
          </div>
        </ul>
      ),
    );

  return (
    <div className={cx(wrap)}>
      <div className="container">{lists()}</div>
    </div>
  );
}

export default SelectList;
