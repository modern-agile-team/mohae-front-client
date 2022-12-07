import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
  size: 'small' | 'big';
  children: ReactNode;
}

function PostIt(props: Props) {
  const { size, children } = props;

  const textContent = () =>
    children ? (
      <div className="description-wrap">{children}</div>
    ) : (
      <p className="description-wrap">한 줄 요약이 존재하지 않습니다.</p>
    );

  return (
    <Container size={size}>
      <FoldElement size={size} />
      {size === 'small' ? (
        <>
          <Title>한 줄 요약</Title>
          {textContent()}
        </>
      ) : (
        <>{children}</>
      )}
    </Container>
  );
}

export default PostIt;

const Common = styled.div`
  background-color: white;
  box-shadow: 0px 0px 5px 0 rgb(193, 193, 197);
  outline: none;
  position: relative;
`;

const Container = styled(Common)<{ size: string }>`
  width: ${props => (props.size === 'small' ? '736px' : '600px')};
  height: ${props => (props.size === 'small' ? '194px' : '470px')};
  padding: ${props => (props.size === 'small' ? '16px' : '16px 8px')};
  color: #4f4e5c;
  ${props =>
    props.size === 'small'
      ? `.description-wrap {
    font-size: 16px;
    width: 704px;
    max-height: 127px;
    word-break: break-all;
  }`
      : `
  display: flex;
  justify-content: space-between;
  align-items: center;`}
`;

const Title = styled.div`
  height: 27px;
  font-size: 18px;
  font-family: 'Bold';
  font-weight: 700;
  padding: 0px 0px 8px 0px;
`;

const FoldElement = styled.div<{ size: string }>`
  background: linear-gradient(
    to bottom left,
    #f9f9f9 0% 71.5%,
    rgb(219, 219, 219) 77%
  );
  position: absolute;
  width: ${props => (props.size === 'small' ? '32px' : '40px')};
  height: ${props => (props.size === 'small' ? '32px' : '40px')};
  top: ${props => (props.size === 'small' ? '-17px' : '-20.9px')};
  right: ${props => (props.size === 'small' ? '-17px' : '-20.9px')};
`;
