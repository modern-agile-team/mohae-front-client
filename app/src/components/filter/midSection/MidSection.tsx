import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root';
import { SectionProps as MidSectionProps } from '../../../types/searchComponent/filter/type';
import { SelectBtn } from '../../button';
import SelectBox from '../selectBox/SelectBox';

function MidSection({ setItemCheck }: MidSectionProps) {
  const [view, setView] = useState<boolean>(false);
  const checked: { [key: string]: boolean } = useSelector(
    (state: RootState) => state.filter.data.check.date,
  );

  const handleSelectBoxView = () => {
    setView(prev => !prev);
  };

  const selectBtnText = () => {
    return contents.map((text: string, i: number) => (
      <div key={i}>
        <SelectBtn
          checked={checked[i]}
          onChange={() => setItemCheck({ key: 'date', index: i })}
          attributes={{
            size: 'small',
            type: 'checkbox',
            name: 'date',
          }}
        >
          {text}
        </SelectBtn>
      </div>
    ));
  };

  return (
    <div className="mid">
      <div className="title">
        <p className="filterTitle">기간</p>
        <p className="filterTitle">지역</p>
      </div>
      <div className="wrap">
        <div className="row">{selectBtnText()}</div>
        <div className="rowLeft">
          <div className="selectBox">
            <SelectBox
              view={view}
              handleView={handleSelectBoxView}
              style="전체 지역"
              used={'filter'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MidSection;

const contents = ['1주일', '1개월', '3개월', '상시'];
