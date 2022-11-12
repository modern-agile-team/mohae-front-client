import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root';
import { setPrice, setTitle } from '../../../../redux/createpost/reducer';

function Inputs() {
  const dispatch = useDispatch();
  const { title, price } = useSelector(
    (state: RootState) => state.createPost.data,
  );

  useEffect(() => {
    if (
      price.toString().length > 8 ||
      Number(price.toString().replace(/,/g, '')) > 1000001
    )
      dispatch(setPrice('1,000,000'));
    if (title.length > 15) dispatch(setTitle(title.slice(0, 15)));
  }, [price, title]);

  const onChange = {
    title(e: React.ChangeEvent<HTMLInputElement>) {
      dispatch(setTitle(e.target.value));
    },
    price(e: React.ChangeEvent<HTMLInputElement>) {
      const toLocaleStringPrice = Number(
        e.target.value.replace(/\D/g, '').slice(0, 7),
      ).toLocaleString();
      dispatch(setPrice(toLocaleStringPrice));
    },
  };

  return (
    <>
      <TitleInputForm className="title">
        <input
          value={title}
          type="text"
          placeholder={`제목을 입력해주세요. (3~15자)`}
          onChange={onChange.title}
          minLength={3}
          maxLength={16}
        />
      </TitleInputForm>
      <PriceInputForm className="price">
        <input
          value={price === '0' ? '0' : price}
          type="text"
          placeholder={'0원 ~ 1,000,000원'}
          onChange={onChange.price}
        />
      </PriceInputForm>
    </>
  );
}

export default Inputs;

const RootStyle = styled.form`
  width: 368px;
  height: 62px;
  border-bottom: 2px solid #e7e7e8;
  border-right: 2px solid #e7e7e8;
  &:focus-within input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    visibility: hidden;
  }
`;

const TitleInputForm = styled(RootStyle)`
  padding: 18px 32px;
  border-radius: 6px 0px 0px 0px;
  color: #4f4e5c;
  input {
    width: 304px;
    height: 24px;
  }
`;

const PriceInputForm = styled(RootStyle)`
  padding: 18px 64px;
  display: flex;
  justify-content: center;
  input[type='number'] {
    width: 174px;
    height: 24px;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  ::after {
    content: '원';
    color: #4f4e5c;
    margin: 0px 0px 0px 18px;
  }
`;
