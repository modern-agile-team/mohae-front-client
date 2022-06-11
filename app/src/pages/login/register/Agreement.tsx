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

interface Props {
  [key: string]: any;
}

export default function Agreement({}: Props) {
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
  const style = css`
    width: 100%;
    > .terms {
      margin-bottom: 149px;
    }
  `;
  return (
    <div className={cx(style)}>
      <div>{text.agree}</div>
      <div className="terms">
        <div>
          <input type="checkbox" />
          <label>{text.terms.one}</label>
        </div>
        <div>
          <input type="checkbox" />
          <label>{text.terms.two}</label>
        </div>
        <div>
          <input type="checkbox" />
          <label>{text.terms.three}</label>
        </div>
      </div>
      <div className="agreeAll">
        <input type="checkbox" />
        <label>{text.terms.all}</label>
      </div>
      <Box size={[480, 52]}>
        <Btn main>{text.next}</Btn>
        {/* <Btn white>다음</Btn> */}
      </Box>
    </div>
  );
}
