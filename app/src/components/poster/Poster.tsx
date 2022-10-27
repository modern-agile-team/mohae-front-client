import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Box from '../box/Box';
import ImgBox from './ImgBox';

interface Props {
  data: {
    decimalDay: number | null;
    no: number;
    title: string;
    isDeadline: number;
    photoUrl: string | null;
    price: number | null;
    target: number;
    areaNo?: number;
    areaName?: string;
    nickname: string;
    area?: string;
  };
  size: 'large' | 'medium';
}

function Poster({ data, size }: Props) {
  const styleMemoization = useMemo(() => {
    if (!data.isDeadline) {
      if (data.decimalDay === 0) {
        return { color: '#ff445e', text: 'D-DAY' };
      } else if (data.decimalDay !== null) {
        return { color: '#4F4E5C', text: `D${data.decimalDay}` };
      }
      return { color: '#ff445e', text: '상시' };
    } else return { color: '#4F4E5C', text: '마감' };
  }, []);

  return (
    <Box size={size === 'large' ? [360, 284] : [264, 208]}>
      <ImgBox
        size={size}
        img={data.photoUrl}
        shape={data.target}
        state={data.isDeadline}
      />
      <Container data={data} size={size}>
        <div className="default">
          <div>
            <p className="title">{data.title}</p>
            <p className="writer">{data.nickname}</p>
          </div>
          <p className="price">{data.price && data.price.toLocaleString()}</p>
        </div>
        <div className="hovered">
          <p className="areaName">{data.areaName || data.area}</p>
          <DDAYText styleMemoization={styleMemoization}>
            {styleMemoization?.text}
          </DDAYText>
        </div>
      </Container>
    </Box>
  );
}

export default Poster;

const Container = styled.div<Props>`
  @keyframes fadeInUp {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  &:hover {
    .default {
      display: none;
    }
    .hovered {
      display: flex;
      animation: fadeInUp 0.7s;
    }
  }

  .default {
    width: 100%;
    height: ${props => (props.size === 'large' ? '76px' : '56px')};
    display: flex;
    justify-content: space-between;
    padding: ${props => (props.size === 'large' ? '14px 16px' : '8px 12px')};

    .title,
    .writer,
    .areaName {
      height: ${props => (props.size === 'large' ? '24px' : '20px')};
      font-size: ${props => (props.size !== 'medium' ? '14px' : '12px')};
      color: #4f4e5c;
      visibility: visible;
      display: flex;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: ${props => (props.size !== 'medium' ? '14px' : '12px')};
      font-family: 'Bold';
      margin-bottom: 0px;
      align-items: center;
    }
    .writer {
      color: #84838d;
    }
    .price {
      font-size: 14px;
      font-family: 'Bold';
      display: flex;
      align-items: center;
      color: ${props => (props.data.price !== null ? '#4F4E5C' : '#ff445e')};

      ::after {
        content: '${props => props.data.price !== null && '원'}';
        font-size: 12px;
        font-family: 'Regular';
      }
    }
  }

  .hovered {
    height: ${props => (props.size === 'large' ? '76px' : '56px')};
    display: none;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    .areaName,
    .DDAY {
      font-family: 'Bold';
    }
    .areaName {
      font-size: ${props => (props.size === 'large' ? '14px' : '12px')};
      height: 20px;
    }
  }
`;

const CommonDDAY = styled.p`
  font-size: 14px;
  font-family: 'Bold';
`;

const DDAYText = styled(CommonDDAY)<{
  styleMemoization: { color: string; text: string };
}>`
  color: ${props => props.styleMemoization?.color};
`;
