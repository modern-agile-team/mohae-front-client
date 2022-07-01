/** @format */

import { css, cx } from '@emotion/css';

import { color } from '../../styles';
import { Category } from '../../components';

interface Props {
  [key: string]: any;
}

export default function Options({
  blocks,
  list,
  targets,
  target,
  onClick,
  number,
}: Props) {
  const mainColor = css`
    color: ${color.main} !important;
  `;
  if (blocks) {
    const style = css`
      width: calc(100% - 2px);
      height: fit-content;
      height: 100%;
      position: absolute;
      z-index: 5;
      top: 52px;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      /* padding: 0 40px 0 8px; */
      .sub {
        width: 100%;
        padding: 2px 8px 0;
        display: flex;
        height: fit-content;
        justify-content: space-between;
      }
      .list {
        width: 100%;
        padding: 8px 8px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        height: 168px;
        background-color: white;
        overflow: scroll;
        > :not(:nth-child(3n)) {
          margin: 0 14px 8px 0;
        }
      }
    `;
    return (
      <div className={cx(style)}>
        <div className={'sub'}>
          <span>{'관심사를 선택해주세요. (최대3개)'}</span>
          <div>
            <span className={cx(number === 3 && mainColor)}>{number}</span>
            <span>{'/3'}</span>
          </div>
        </div>
        <div className={'list'}>
          {list.map((each: any, index: number) => (
            <Category
              shape={'row'}
              key={index}
              name={each}
              id={'block'}
              className={targets.includes(each) && mainColor}
              onClick={onClick}
            />
          ))}
        </div>
      </div>
    );
  } else {
    const style = css`
      width: 100%;
      position: absolute;
      z-index: 1;
      top: 52px;
      left: 0;
      padding: 8px 0 0 0;
      height: 180px;
      display: flex;
      flex-direction: column;
      .list {
        width: 100%;
        padding: 8px 8px;
        height: 100%;
        background-color: white;
        overflow: scroll;
        > :nth-child(2n-1) {
          background-color: ${color.light1};
        }
      }
      button {
        width: 100%;
        display: flex;
        line-height: 20px;
        padding: 8px 0;
        justify-content: center;
        align-items: center;
      }
    `;

    return (
      <div className={cx(style)}>
        <div className={'list'}>
          {list.map((each: any, index: number) => (
            <button
              id={'text'}
              key={index}
              name={each}
              className={cx(each === target && mainColor)}
              onClick={onClick}
            >
              {each}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
