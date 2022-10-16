import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';

interface Props {
  src: string | any;
  id?: string;
  onClick?: (e: React.MouseEvent) => void;
}

function Img(props: Props) {
  const { src, onClick } = props;

  const show = () => <Container src={src} onClick={onClick} />;

  return show();
}

export default Img;

const Container = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  background: no-repeat center/contain url(${props => String(props.src)});
`;
