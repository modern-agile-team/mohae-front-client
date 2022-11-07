import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, MarkBox, SelectBox } from '../../../../components';
import { SelectBtn } from '../../../../components/button';
import Input from '../../../../components/input/createPost/Input';
import { lists } from '../../../../consts/categoryList';
import { setTarget } from '../../../../redux/createpost/reducer';
import { RootState } from '../../../../redux/root';

interface StateType {
  [key: number]: boolean;
}

function Infomation() {
  const { no } = useParams();
  const dispatch = useDispatch();
  const { categoryNo, areaNo, deadline, target } = useSelector(
    (state: RootState) => state.createPost.data,
  );
  const [view, setView] = useState<StateType>({
    0: false,
    1: false,
    2: false,
  });
  const [targetChecked, setTargetChecked] = useState<StateType>({
    0: true,
    1: false,
  });

  useEffect(() => {
    setTargetChecked(
      Number(target) === 1 ? { 0: false, 1: true } : { 0: true, 1: false },
    );
  }, []);

  const selectBoxClick = (i: number) => {
    setView({ 0: false, 1: false, 2: false, [i]: !view[i] });
  };

  const handleSelectBtnClick = (e: React.ChangeEvent, i: number) => {
    dispatch(setTarget(Number(e.currentTarget.id)));
    setTargetChecked({ 0: false, 1: false, [i]: !targetChecked[i] });
  };

  const createSelectBtn = () => {
    return contents.map((content, i) => (
      <div className="markBox" id={`${i}`} key={i}>
        <SelectBtn
          onChange={e => handleSelectBtnClick(e, i)}
          checked={targetChecked[i]}
          attributes={{
            size: 'large',
            name: 'target',
            type: 'radio',
          }}
        >
          {content}
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

    return no
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
