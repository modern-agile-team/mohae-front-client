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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/root';
import { update_regist_info } from '../../../redux/user/reducer';
interface Object {
  [key: string]: any;
}

export default function Agreement({ next }: Object) {
  const text: Object = {
    agree: '약관 동의',
    terms: {
      1: '서비스이용약관 동의 (필수)',
      2: '개인정보 수집 및 이용 동의 (필수)',
      3: '광고성 정보 수신 동의 (선택)',
      all: '위 약관에 모두 동의합니다.',
    },
    next: '다음',
  };
  const [terms, setTerms] = useState<boolean[]>([false, false, false]);
  const registInfo = useSelector((state: RootState) => state.user.registInfo);
  const dispatch = useDispatch();
  // console.log('registInfo :>> ', registInfo);

  const clickNext = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!terms[0] || !terms[1]) {
      alert('필수 항목이 체크되지 않았습니다.');
      return;
    }
    dispatch(update_regist_info({ ...registInfo, terms: terms }));
    next();
  };

  const checkHandler: Object = {
    term: (e: React.ChangeEvent) => {
      e.stopPropagation();
      const target = e.currentTarget;
      const cloneTerms = [...terms];
      cloneTerms[Number(target.id)] = !cloneTerms[Number(target.id)];
      setTerms(cloneTerms);
    },
    all: (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const target = e.currentTarget.checked;
      const cloneTerms = [target, target, target];
      setTerms(cloneTerms);
    },
  };

  const checkboxs = terms.map((toggle: boolean, index: number) => (
    <div key={index}>
      <input
        id={`${index}`}
        type="checkbox"
        onChange={checkHandler.term}
        checked={toggle}
      />
      <label>{text.terms[`${index + 1}`]}</label>
    </div>
  ));

  return (
    <div className={cx(style)}>
      <div>{text.agree}</div>
      <div className="terms">{checkboxs}</div>
      <div className="agreeAll">
        <input type="checkbox" onChange={checkHandler.all} />
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
  /* width: 480px; */

  > .terms {
    margin-bottom: 149px;
  }
`;
