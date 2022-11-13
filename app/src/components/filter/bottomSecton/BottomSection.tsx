import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilteringSetting } from '../../../redux/filter/reducer';
import { RootState } from '../../../redux/root';
import { BottomSectionProps } from '../../../types/searchComponent/filter/type';
import { MainButton, SelectBtn, WhiteButton } from '../../button';
import Img from '../../img/Img';
import Slider from '../slider/Slider';

function BottomSection(props: BottomSectionProps) {
  const { onSubmit, setShowFilter, setItemCheck } = props;
  const dispatch = useDispatch();
  const minVal = useSelector((state: RootState) => state.filter.data.price.min);
  const maxVal = useSelector((state: RootState) => state.filter.data.price.max);
  const checked: { [key: string]: { [key: string]: boolean } } = useSelector(
    (state: RootState) => state.filter.data.check,
  );

  const settingComplete = (e: React.MouseEvent) => {
    onSubmit(e, 'filter');
    setShowFilter(prev => !prev);
  };

  const priceRange = (minValue: number, maxValue: number) => {
    if (checked.free[0]) {
      return `무료`;
    }
    if (0 < minValue && maxValue < 1000000) {
      return `${minValue.toLocaleString()} 원 ~ ${maxValue.toLocaleString()} 원`;
    }
    if (minValue > 0) {
      return `${minValue.toLocaleString()} 원 이상`;
    }
    if (maxValue < 1000000) {
      return `${maxValue.toLocaleString()} 원 이하`;
    }

    return '모든 가격대';
  };

  const resetSetting = () => {
    dispatch(resetFilteringSetting());
  };

  return (
    <>
      <div className="bottom">
        <div>
          <p className="filterTitle">가격</p>
          <p>{priceRange(minVal, maxVal)}</p>
        </div>
        <div>
          <SelectBtn
            onChange={() => setItemCheck({ key: 'free', index: 0 })}
            checked={checked.free[0]}
            attributes={{
              size: 'small',
              type: 'checkbox',
              name: 'free',
            }}
          >
            무료
          </SelectBtn>
        </div>
      </div>
      <Slider min={0} max={1000000} />
      <div className="bottomBtn">
        <div className="compliteBtn">
          <MainButton type="button" able={true} onClick={settingComplete}>
            설정 완료
          </MainButton>
        </div>
        <div className="reset">
          <WhiteButton type="button" able={true} onClick={resetSetting}>
            <div className="resetImg">
              <Img src={'/img/reset.png'} alt="reset-setting" />
            </div>
          </WhiteButton>
        </div>
      </div>
    </>
  );
}

export default BottomSection;
