/** @format */

import { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, shadow } from '../../styles';
import { Img, Category } from '../../components';
import Options from './Options';

interface Props {
  [key: string]: any;
}

interface Targets {
  placeholder: any;
  list: string[];
  number: number;
}

export default function SelectBox({
  children,
  noneScroll,
  blocks,
  open,
  list,
  onClick,
}: Props) {
  const [isOpen, setIsOpen] = useState(open),
    [target, setTarget] = useState(children),
    [targets, setTargets] = useState<Targets>({
      placeholder: children,
      list: [],
      number: 0,
    });

  const style = css`
    width: 100%;
    height: 100%;
    * {
      color: ${color.dark2};
    }

    .wrapper {
      ${radius[6]};
      ${shadow.normal};
      width: 100%;
      height: 240px;
      overflow: hidden;
      ${noneScroll &&
      css`
        &::-webkit-scrollbar {
          display: none;
        }
      `}
      background-color: white;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .target {
      color: ${color.dark2};
      width: 100%;
      height: 52px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        color: ${color.main};
      }

      ${shadow.normal};
      .placeholder {
        width: fit-content;
        height: fit-content;
        display: flex;
        > :not(:last-child) {
          margin-right: 8px;
        }
      }
      .arrow {
        width: 20px;
        height: 20px;
      }
    }
  `;

  const select = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id === 'text') {
      setTarget(e.currentTarget.name);
      setIsOpen(false);
    } else if (e.currentTarget.id === 'block') {
      if (targets.list.includes(e.currentTarget.name)) {
        setTargets({
          placeholder: targets.placeholder,
          list: [
            ...targets.list.filter(
              (category: any) => !(category === e.currentTarget.name)
            ),
          ],
          number: targets.number - 1,
        });
      } else if (targets.number === 3) {
      } else {
        targets.number + 1 === 3 && setIsOpen(false);
        !targets.number &&
          setTargets({
            placeholder: targets.placeholder,
            list: [e.currentTarget.name],
            number: targets.number + 1,
          });
        targets.number &&
          setTargets({
            placeholder: targets.placeholder,
            list: [...targets.list, e.currentTarget.name],
            number: targets.number + 1,
          });
      }
    }
  };

  const placeholder = blocks ? (
    targets.list.length ? (
      <>
        {targets.list.map((each: any, index: number) => (
          <Category shape={'row'} name={each} />
        ))}
      </>
    ) : (
      <span>{targets.placeholder}</span>
    )
  ) : (
    <span>{target}</span>
  );

  return (
    <div className={cx(style)}>
      <div className={'wrapper'}>
        <button className={'target'}>
          <div className={'placeholder'}>{placeholder}</div>
          <div className={'arrow'}>
            <Img src={'/img/arrow-down-dark3.png'} />
          </div>
        </button>
        {blocks && (
          <>
            <Options
              blocks
              list={list}
              targets={targets.list}
              number={targets.number}
              onClick={select}
            />
          </>
        )}
        {!blocks && <Options list={list} target={target} onClick={select} />}
      </div>
    </div>
  );
}
