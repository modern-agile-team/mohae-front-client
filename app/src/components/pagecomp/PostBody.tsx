import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Box, Btn, Img, TextEditor } from '..';
import { Props } from '../button';
import { color, font, radius } from '../../styles';
import PostWriteInput from '../../pages/createpost/PostWriteInput';

// 본문, 거래 참고 사항

function PostBody(props: Props) {
  const { view, getValue } = props;
  const [value, setValue] = useState({
    1: '',
    2: '',
    3: '',
  });

  const style = css`
    margin: 32px 0px 16px 0px;
    .body {
      padding: ${view && '16px'};
      ${font.size[14]}
      ${font.weight[400]}
      word-break:break-all;
    }

    .note {
      padding: 16px;
      word-break: break-all;
      color: ${color.dark1};
      margin-top: 16px;
    }

    .BigTitle {
      ${font.weight[700]}
      padding: 8px 0px 24px 0px;
      margin-bottom: 16px;
      border-bottom: 1px solid ${color.light4};
    }

    .sectionTitle {
      ${font.weight[400]}
    }

    .textBox {
      min-height: 42px;
      margin: 16px 16px 32px 16px;
    }
  `;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>, i: number) => {
    setValue({ ...value, [i + 1]: e.currentTarget.value });
  };

  const body = () => {
    return view ? (
      '123124i024i80923ir0923r091i8309ru019r900921u0912409190ku409'
    ) : (
      // '내용을 입력해 주세요.(최대 100자)내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.내용을 입력해 주세요.'
      <TextEditor size={381} />
    );
  };

  const tradeOption = () => {
    const title = [
      '1. 거래 시작 전 어떤 절차를 거쳐야 하나요?',
      '2. 제공되는 재능을 수행하는 데 있어 소요시간은 어떻게 되나요?',
      '3. 거래 취소나 환불은 어떻게 진행되나요?',
    ];

    return title.map((el, index) =>
      view ? (
        <p className='sectionTitle' key={index}>
          {el}
          <p className='textBox'>
            최대 100자 5줄 이내 초과시 작성이 안됨 이칸이 5줄인 상태로 최대 칸
            크기 내용 작성 없이 엔터는 안됨.최대 100자 5줄 이내 초과시 작성이
            안됨 이칸이 5줄인 상태로 최대 칸 크기 내용 작성 없이 엔터는 안됨
            .최대 100자 5줄 이내 초과시 작성이 안됨 이칸이 5줄인 상태로 최대 칸
            크기 내용 작성 없이 엔터는 안됨 .
            oqewfnoqiejfoiwendckilnwehifjiwe,.wemokcjowejlams.
            {/* 거래 참고 사항 받을 곳 */}
            kqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddjwncliqnwc,salj
          </p>
        </p>
      ) : (
        <div key={index}>
          <p>{el}</p>
          <PostWriteInput
            state={{
              value: value,
              setValue: e => onChange(e, index),
              i: index,
            }}
          />
        </div>
      )
    );
  };

  return (
    <div className={cx(style)}>
      <Box size={[1128]} className='body'>
        {body()}
      </Box>
      <Box size={[1128]} className='note'>
        <div className='BigTitle'>거래 참고 사항</div>
        {tradeOption()}
      </Box>
    </div>
  );
}

export default PostBody;
