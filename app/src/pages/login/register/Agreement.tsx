/** @format */

import {
  Img,
  Poster,
  NewPost,
  Box,
  Profile,
  FocusBar,
  Category,
  BasicModal,
  MarkBox,
  Btn,
  OrderedImg,
  Report,
} from '../../../components';
import { radius, font, color, shadow } from '../../../styles';
import { css, cx } from '@emotion/css';
import { useState } from 'react';

interface Props {
  [key: string]: any;
}

export default function Agreement({ next }: Props) {
  const text: { [key: string]: any } = {
    agree: '약관 동의',
    terms: {
      one: '서비스이용약관 동의 (필수)',
      two: '개인정보 수집 및 이용 동의 (필수)',
      three: '광고성 정보 수신 동의 (선택)',
      all: '위 약관에 모두 동의합니다.',
    },
    next: '다음',
  };
  const [terms, setTerms] = useState<boolean[]>([false, false, false]);

  const clickNext = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    next();
  };
  const checkTerm1 = (e: any) => {
    console.log('e.currentTarget :>> ', e.currentTarget.checked);
    console.log('1 :>> ', 1);
  };
  const checkTerm2 = (e: any) => {
    console.log('2 :>> ', 2);
  };
  const checkTerm3 = (e: any) => {
    console.log('3 :>> ', 3);
  };
  const checkTerm4 = (e: any) => {
    console.log('4 :>> ', 4);
  };

  return (
    <div className={cx(style)}>
      <div>{text.agree}</div>
      <div className="terms">
        <div>
          <input type="checkbox" onChange={checkTerm1} />
          <label>{text.terms.one}</label>
        </div>
        <div>
          <input type="checkbox" onChange={checkTerm2} />
          <label>{text.terms.two}</label>
        </div>
        <div>
          <input type="checkbox" onChange={checkTerm3} />
          <label>{text.terms.three}</label>
        </div>
      </div>
      <div className="agreeAll">
        <input type="checkbox" onChange={checkTerm4} />
        <label>{text.terms.all}</label>
      </div>
      <div
        className={cx(
          css`
            width: 480px;
            height: 52px;
          `
        )}
        onClick={clickNext}
      >
        <Btn main>{text.next}</Btn>
        {/* <Btn white>다음</Btn> */}
      </div>
    </div>
  );
}

const style = css`
  width: 480px;

  > .terms {
    margin-bottom: 149px;
  }
`;
