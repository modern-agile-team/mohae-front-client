import React, { useRef, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root';
import { setSummary } from '../../../../redux/createpost/reducer';

function TextArea() {
  const dispatch = useDispatch();
  const { title, price, summary } = useSelector(
    (state: RootState) => state.createPost.data,
  );
  const textRef = useRef<HTMLTextAreaElement>(null);

  const resizingHeight = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);

  const summaryOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setSummary(e.target.value));
  };

  useEffect(() => {
    if (summary.length > 100) {
      dispatch(setSummary(summary.slice(0, 100)));
    }
  }, [price, title, summary]);

  return (
    <FormWrapper>
      <form>
        <SummaryArea
          value={summary}
          onChange={summaryOnChange}
          ref={textRef}
          onInput={resizingHeight}
          placeholder={'한 줄 요약을 입력해주세요. (최대 100자)'}
        />
      </form>
    </FormWrapper>
  );
}

export default TextArea;

const FormWrapper = styled.div`
  margin: 24px 12px 24px 24px;
  padding-right: 8px;
  height: 218px;
  overflow: auto;
  border-right: 4px solid transparent;
  &:focus-within textarea::-webkit-input-placeholder {
    visibility: hidden;
  }
`;

const SummaryArea = styled.textarea`
  width: 688px;
  height: 210px;
  resize: none;
  overflow: hidden;
  padding-right: 8px;
`;
