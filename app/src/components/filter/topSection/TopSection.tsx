import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root';
import { SectionProps as TopSectionProps } from '../../../types/searchComponent/filter/type';
import { SelectBtn } from '../../button';
import MarkBox from '../../markbox/MarkBox';

function TopSection({ setItemCheck }: TopSectionProps) {
  const { sort, target }: { [key: string]: { [key: number]: boolean } } =
    useSelector((state: RootState) => state.filter.data.check);

  const createSortSelectBtn = () => {
    return contents.sort.map((text: string, i: number) => (
      <div key={i}>
        <SelectBtn
          checked={sort[i]}
          onChange={() => setItemCheck({ key: 'sort', index: i })}
          attributes={{
            size: 'small',
            type: 'radio',
            name: 'sort',
          }}
        >
          {text}
        </SelectBtn>
      </div>
    ));
  };

  const createTargetSelectBtn = () => {
    return contents.target.map((content: React.ReactNode, i: number) => (
      <div key={i}>
        <SelectBtn
          checked={target[i]}
          onChange={() => setItemCheck({ key: 'target', index: i })}
          attributes={{
            size: 'medium',
            type: 'checkbox',
            name: 'target',
          }}
        >
          {content}
        </SelectBtn>
      </div>
    ));
  };

  return (
    <div className="top">
      <div className="title">
        <p className="filterTitle">정렬</p>
        <p className="filterTitle">대상</p>
      </div>
      <div className="wrap">
        <div className="row">{createSortSelectBtn()}</div>
        <div className="rowLeft">{createTargetSelectBtn()}</div>
      </div>
    </div>
  );
}

export default TopSection;

const contents = {
  sort: ['인기순', '최신순', '오래된순'],
  target: [
    <>
      <MarkBox shape={0} state={0} size={'small'} />
      해줄래요
    </>,
    <>
      <MarkBox shape={1} state={0} size={'small'} />
      구할래요
    </>,
  ],
};
