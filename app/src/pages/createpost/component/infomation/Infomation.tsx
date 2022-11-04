import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, MarkBox, SelectBox } from '../../../../components';
import { SelectBtn } from '../../../../components/button';
import Input from '../../../../components/input/createPost/Input';
import { lists } from '../../../../consts/categoryList';
import { setTarget } from '../../../../redux/createpost/reducer';
import { RootState } from '../../../../redux/root';

function Infomation(props: { type: string }) {
  const { type } = props;
  const dispatch = useDispatch();
  const { title, price, categoryNo, areaNo, deadline, description } =
    useSelector((state: RootState) => state.createPost.data);
  const [view, setView] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const [targetChecked, setTargetChecked] = useState<{
    [key: number]: boolean;
  }>({ 0: true, 1: false });

  const selectBoxClick = (i: number) => {
    setView({ 0: false, 1: false, 2: false, [i]: !view[i] });
  };

  const setTargetCheck = (i: number) => {
    setTargetChecked({ 0: false, 1: false, [i]: !targetChecked[i] });
  };
  const contents = [
    <>
      <MarkBox shape={0} state={0} size={'small'} />
      해줄래요
    </>,
    <>
      <MarkBox shape={1} state={0} size={'small'} />
      구할래요
    </>,
  ];
  const createSelectBtn = () => {
    return contents.map((el, i) => (
      <div
        className="markBox"
        id={`${i}`}
        key={i}
        onClick={e => dispatch(setTarget(Number(e.currentTarget.id)))}
      >
        <SelectBtn
          onChange={() => setTargetCheck(i)}
          checked={targetChecked[i]}
          attributes={{
            size: 'large',
            name: 'target',
            type: 'radio',
          }}
        >
          {el}
        </SelectBtn>
      </div>
    ));
  };
  const createSelectBox = () => {
    const placeholders: { placeholder: string; no: string | number | null }[] =
      [
        { placeholder: '카테고리', no: categoryNo },
        { placeholder: '전체 지역', no: areaNo },
        { placeholder: '기간', no: deadline },
      ];

    const editFor = () => {
      const arr = placeholders.map((placeholder, i) => {
        return lists[placeholder.placeholder]
          .map(list => {
            if (Number(list.no) === placeholder.no) {
              return list.name;
            } else {
              return '';
            }
          })
          .filter(el => el)[0];
      });
      return arr;
    };

    return type === 'edit'
      ? editFor().map((el, i) => (
          <SelectBox
            placeholder={el}
            view={view[i]}
            key={i}
            handleView={() => selectBoxClick(i)}
            style={placeholders[i].placeholder}
            used={'createEdit'}
          />
        ))
      : placeholders.map((el, i) => (
          <SelectBox
            placeholder={el.placeholder}
            view={view[i]}
            key={i}
            handleView={() => selectBoxClick(i)}
            style={placeholders[i].placeholder}
            used={'createEdit'}
          />
        ));
  };
  return (
    <Box size={[736, 448]} className="writeWrap">
      <div className="topWrap">
        <div className="left">
          <Input small />
          <div className="markBoxWrap">{createSelectBtn()}</div>
        </div>
        <div className="right">{createSelectBox()}</div>
      </div>
      <div className="summary">
        <Input big />
      </div>
    </Box>
  );
}

export default Infomation;
