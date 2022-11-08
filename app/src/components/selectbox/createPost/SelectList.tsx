import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import { Btn } from '../../button';
import { color, shadow } from '../../../styles';
import { useDispatch } from 'react-redux';
import {
  setAreaNum,
  setCategoryNum,
  setDeadline,
} from '../../../redux/createpost/reducer';

interface Contents {
  no: string;
  name: string;
}
interface Props {
  contents: Contents[];
  style: string;
  setSelected: Dispatch<SetStateAction<string>>;
  handleView: () => void;
}

function SelectList(props: Props) {
  const { contents, style, setSelected, handleView } = props;
  const dispatch = useDispatch();

  const wrap = css`
    position: relative;
    background-color: white;
    z-index: 5;
    .container {
      width: 368px;
      height: 247px;
      width: 368px;
      height: 247px;
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
      width: 368px;
      height: 62px;
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
      dispatch(setAreaNum(e.currentTarget.id));
      setSelected(selected);
      handleView();
    },
    date: (e: React.MouseEvent, selected: string) => {
      dispatch(setDeadline(e.currentTarget.id));
      setSelected(selected);
      handleView();
    },
    category: (e: React.MouseEvent, selected: string) => {
      dispatch(setCategoryNum(Number(e.currentTarget.id) + 1));
      setSelected(selected);
      handleView();
    },
  };

  const lists = () => {
    switch (style) {
      case '카테고리':
        return contents.map((el, i: any) => (
          <ul key={i} id={i} onClick={e => onClick.category(e, el.name)}>
            <div className="category">
              <Btn white category>
                {el.name}
              </Btn>
            </div>
          </ul>
        ));
      case '전체 지역':
        return contents.map((el, i: any) => (
          <ul key={i} id={el.no} onClick={e => onClick.area(e, el.name)}>
            {el.name}
          </ul>
        ));
      case '기간':
        return contents.map((el, i: any) => (
          <ul key={i} id={el.no} onClick={e => onClick.date(e, el.name)}>
            {el.name}
          </ul>
        ));
    }
  };

  return (
    <div className={cx(wrap)}>
      <div className="container">{lists()}</div>
    </div>
  );
}

export default SelectList;
