import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { useState, useRef } from 'react';

interface Props {
  [key: string]: any;
}

export default function CheckBox(props: Props) {
  const container = css`
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
  `;

  const directInput = css`
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
  `;

  const [reportValue, setReportValue] = useState({
    list: [
      { title: '욕설 / 비방', checked: false },
      { title: '개인정보 요구', checked: false },
      { title: '사기', checked: false },
      { title: '사적인 연락', checked: false },
      { title: '도배', checked: false },
      { title: '선정적인 게시물', checked: false },
      { title: '위협', checked: false },
    ],
    input: '',
  });

  const clickReport = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const newReportList = [...reportValue.list];
    const targetValue = newReportList[Number(e.currentTarget.id)];
    const checkedList = reportValue.list.reduce((acc, cur) => {
      if (cur.checked) {
        return acc + 1;
      } else return acc;
    }, 0);

    if (checkedList < 3) {
      targetValue.checked = !targetValue.checked;
      setReportValue({
        ...reportValue,
        list: newReportList,
      });
    } else if (!e.currentTarget.checked) {
      targetValue.checked = !targetValue.checked;
      setReportValue({
        ...reportValue,
        list: newReportList,
      });
    } else if (checkedList) {
      e.preventDefault();
      alert('3개 이하만 선택 가능합니다');
      e.currentTarget.checked = false;
    }
  };

  const report = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    let init: Array<number> = [];
    const checkedIndex = reportValue.list.reduce((acc, cur, index) => {
      if (cur.checked) {
        acc.push(index + 1);
      }
      return acc;
    }, init);
    const inputValue = reportValue.input;

    // call axios to reportValue
    console.log('checkedIndex :>> ', checkedIndex);
    console.log('inputValue :>> ', inputValue);
  };

  const inputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportValue({
      ...reportValue,
      input: e.currentTarget.value,
    });
  };

  const textareaContainer = css`
    box-shadow: inset 0px 0px 4px rgba(132, 131, 141, 0.2);
    padding: 8px;
  `;

  const showList = (
    <div>
      {reportValue.list.map((report, index) => (
        <label className={cx(container)} key={index}>
          <input type="checkbox" onChange={clickReport} id={`${index}`} />
          {report.title}
        </label>
      ))}
      <div className={cx(textareaContainer)}>
        <textarea
          className={cx(directInput)}
          placeholder="직접 입력 (최대 100자)"
          onChange={inputValue}
        />
      </div>
    </div>
  );

  return (
    <div>
      {showList}
      <button onClick={report}>{'신고버튼이요~'}</button>
    </div>
  );
}
