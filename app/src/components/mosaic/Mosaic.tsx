import styled from '@emotion/styled';

function Mosaic() {
  return (
    <>
      <BodyMosaic />
      <ImgMosaic>
        <p>
          로그인 후<br />
          서비스를 이용해 주세요.
        </p>
      </ImgMosaic>
    </>
  );
}

export default Mosaic;

const BodyMosaic = styled.div`
  width: 100vw;
  height: 828px;
  backdrop-filter: blur(10px);
  background: linear-gradient(
    180.11deg,
    rgba(250, 251, 252, 0) 4.81%,
    rgba(152, 152, 152, 0.016) 30.04%,
    rgba(78, 78, 78, 0.8) 99.9%
  );
  backdrop-filter: blur(3px);
  position: absolute;
  top: 560px;
  left: 0px;
`;

const ImgMosaic = styled.div`
  width: 360px;
  height: 449px;
  z-index: 1;
  border-radius: 6px;
  backdrop-filter: blur(10px);
  background: linear-gradient(
    180.11deg,
    rgba(250, 251, 252, 0) 4.81%,
    rgba(152, 152, 152, 0.016) 30.04%,
    rgba(78, 78, 78, 0.8) 99.9%
  );
  backdrop-filter: blur(3px);
  position: absolute;
  top: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    width: 154px;
    height: 48px;
    font-size: 14px;
    font-family: 'Regular';
    color: white;
    text-align: center;
    padding-top: 0.8em;
  }
`;
