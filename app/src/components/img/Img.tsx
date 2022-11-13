import styled from '@emotion/styled';
import React from 'react';

interface Props {
  src: string;
  id?: string;
  alt?: string;
  loading?: 'eager' | 'lazy';
  onClick?: (e: React.MouseEvent) => void;
}

function Img(props: Props) {
  const { src, alt, loading, onClick } = props;

  return (
    <Container onClick={onClick}>
      <source srcSet={src} type="image/avif" />
      <source srcSet={src} type="image/webp" />
      <img src={src} alt={alt} loading={loading} />
    </Container>
  );
}

export default Img;

const Container = styled.picture`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
