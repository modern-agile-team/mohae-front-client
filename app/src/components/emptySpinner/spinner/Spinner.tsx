import React from 'react';
import styled from '@emotion/styled';
import Img from '../../img/Img';

interface SpinnerProps {
  size: string;
}

function Spinner({ size }: SpinnerProps) {
  return (
    <>
      {size === 'big' ? (
        <BigContainer>
          <div className="img-wrap">
            <Img src={'/img/loading.gif'} />
          </div>
        </BigContainer>
      ) : (
        <SmallContainer>
          <div className="img-wrap">
            <Img src={'/img/loading.gif'} />
          </div>
        </SmallContainer>
      )}
    </>
  );
}

export default Spinner;

const Common = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BigContainer = styled(Common)`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  .img-wrap {
    width: 500px;
    height: 500px;
  }
`;

const SmallContainer = styled(Common)`
  width: 100%;
  height: 241px;
  .img-wrap {
    width: 200px;
    height: 200px;
  }
`;
