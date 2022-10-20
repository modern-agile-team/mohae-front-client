import React from 'react';
import styled from '@emotion/styled';
import TopSection from './topSection/TopSection';
import MidSection from './midSection/MidSection';
import BottomSection from './bottomSecton/BottomSection';
import { PresenterProps } from '../../types/searchComponent/filter/type';

function Presenter(props: PresenterProps) {
  const { setItemCheck, onSubmit, setShowFilter } = props;

  return (
    <Wrapper>
      <div id="container">
        <TopSection setItemCheck={setItemCheck} />
        <MidSection setItemCheck={setItemCheck} />
        <BottomSection
          setItemCheck={setItemCheck}
          onSubmit={onSubmit}
          setShowFilter={setShowFilter}
        />
      </div>
    </Wrapper>
  );
}

export default Presenter;

const Wrapper = styled.section`
  position: absolute;
  top: 43px;
  left: 0px;
  z-index: 1;

  .filterTitle {
    font-size: 14px;
    font-family: 'Bold';
    margin-bottom: 8px;
  }

  #container {
    width: 812px;
    height: 391px;
    display: flex;
    gap: 16px;
    flex-direction: column;
    background-color: white;
    border-radius: 0px 0px 6px 6px;
    box-shadow: 0px 8px 8px rgba(132, 131, 141, 0.5);
    padding: 16px 32px 24px 32px;
    color: #4f4e5c;
    font-family: 'Bold';
    font-size: 14px;
  }

  .title {
    display: flex;
    gap: 428px;
  }

  .selectBox {
    margin-right: 146px;
  }

  .row,
  .rowLeft {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  .rowLeft {
    width: 334px;
    align-items: center;
    justify-content: center;
  }

  .wrap {
    display: flex;
    justify-content: space-between;
  }

  .top,
  .mid {
    border-bottom: 2px solid #e7e7e8;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
  }

  .bottomBtn {
    display: flex;
    align-items: center;
    margin-top: 12px;
  }

  .reset {
    width: 40px;
    height: 40px;
    .resetImg {
      width: 20px;
      height: 20px;
    }
  }

  .compliteBtn {
    width: 300px;
    height: 40px;
    margin: 0 16px 0 224px;
  }
`;
