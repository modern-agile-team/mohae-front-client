/** @format */

import { css, cx } from '@emotion/css';
import { color } from '../../styles';
import { Dispatch, SetStateAction } from 'react';
import type { CheckList } from '../../components/modal/ReportModal';

interface Props {
  checkList: CheckList;
  setCheckList: Dispatch<SetStateAction<CheckList>>;
}

export default function Report({ checkList, setCheckList }: Props) {
  const style = css`
    label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      -moz-appearance: none;
      -webkit-appearance: none;
      -o-appearance: none;
      user-select: none;
      color: ${color.dark2};
      font-size: 14px;
      margin: 0 0 8px;
      position: relative;
      :hover {
        color: ${color.dark1};
      }
      :active {
        color: ${color.dark1};
      }
      input {
        appearance: none;
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        background-color: white;
        margin: 0 8px 0 0;
        border-radius: 2px;
        box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
        :hover {
          background-color: ${color.light1};
        }
        :active {
          background-color: white;
        }
        cursor: pointer;
        :checked {
          background: ${color.main} url('img/check.png') no-repeat center/cover;
          background-size: 8px 8px;
        }
      }
    }
    .textarea-container {
      box-shadow: inset 0px 0px 4px rgba(132, 131, 141, 0.2);
      padding: 8px;
      border-radius: 2px;
      margin-bottom: 24px;
    }

    textarea {
      width: 100%;
      height: 96px;

      border-radius: 2px;
      display: flex;
      justify-content: center;
      color: ${color.dark1};
      font-size: 12px;
      padding: 0 8px 0 0;
      resize: none;
      &::-webkit-scrollbar {
        margin-right: 20px;
        background-color: rgba(0, 0, 0, 0);
        width: 5px;
        height: 80px;
        cursor: pointer;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${color.main};
        border-radius: 10px;
        cursor: pointer;
      }
      &::-webkit-scrollbar-track {
        background-color: ${color.light4};
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
        cursor: pointer;
      }
    }

    .btn-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      & > :not(:last-child) {
        margin-right: 8px;
      }
    }
  `;

  const selectList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReportValue = [...checkList.list];
    const targetValue = newReportValue[Number(e.currentTarget.id)];
    const selectedList = checkList.list.reduce((acc: number, cur: any) => {
      if (cur.checked) {
        return acc + 1;
      } else return acc;
    }, 0);

    if (selectedList < 3) {
      targetValue.checked = !targetValue.checked;
      setCheckList({
        ...checkList,
        list: newReportValue,
      });
    } else if (!e.currentTarget.checked) {
      targetValue.checked = !targetValue.checked;
      setCheckList({
        ...checkList,
        list: newReportValue,
      });
    } else if (selectedList) {
      e.preventDefault();
      alert('3개 이하만 선택 가능합니다');
      e.currentTarget.checked = false;
    }
  };

  const inputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCheckList({
      ...checkList,
      text: e.currentTarget.value,
    });
  };

  const showReportList = (
    <div>
      {checkList.list.map((report: any, index: number) => (
        <label key={index}>
          <input type="checkbox" onChange={selectList} id={`${index}`} />
          {report.title}
        </label>
      ))}
      <div className={'textarea-container'}>
        <textarea placeholder="직접 입력 (최대 100자)" onChange={inputValue} />
      </div>
    </div>
  );

  return (
    <div className={cx(style)}>
      {showReportList}
      <div className={'btn-wrapper'}></div>
    </div>
  );
}
