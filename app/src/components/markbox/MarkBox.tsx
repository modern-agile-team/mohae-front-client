/** @format */

import styled from '@emotion/styled';
import Img from '../img/Img';

interface MarkBoxProps {
  shape: number;
  state: number;
  size: 'big' | 'small';
}

interface Attrs {
  [shape: string]: string;
}

function MarkBox(props: MarkBoxProps) {
  const { shape, state, size } = props;

  const attrs: Attrs = {
    '00': '/img/exclamation-mark-main.png',
    '01': '/img/exclamation-mark-dark1.png',
    '10': '/img/question-mark-main.png',
    '11': '/img/question-mark-dark1.png',
  };

  const prop = String(shape) + String(state);

  const attrProps = () => {
    const attr = Object.keys(attrs)
      .map(shape => prop === shape && attrs[shape])
      .filter(el => el)[0];

    return attr ? attr : '/img/exclamation-mark-main.png';
  };

  return (
    <Wrap size={size}>
      <Container shape={shape} state={state}>
        <Img src={attrProps()} alt="mark-box-icon" />
      </Container>
    </Wrap>
  );
}

export default MarkBox;

const Wrap = styled.div<{ size: string }>`
  width: ${props => (props.size === 'big' ? '30px' : '24px')};
  height: ${props => (props.size === 'big' ? '30px' : '24px')};
`;

const Container = styled.div<{
  shape: number;
  state: number;
}>`
  position: relative;
  width: 100%;
  height: 100%;
`;
