import React from 'react';
import { css, cx } from '@emotion/css';
import Box from '../box/Box';
import ImgBox from './ImgBox';
import { color, font } from '../../styles';

interface Props {
  data: {
    decimalDay: number | null;
    no: number;
    title: string;
    isDeadline: number;
    photoUrl: string | null;
    price: number | null;
    target: number;
    areaNo: number;
    areaName: string;
    nickname: string;
  };
}

function Poster({ data }: Props) {
  const style = css`
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translate3d(0, 8px, 0);
      }
      100% {
        opacity: 1;
        transform: translateZ(0);
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
      height: 56px;
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;

      .title,
      .writer,
      .areaName {
        height: 20px;
        ${font.size[12]}
        ${color.dark1}
        visibility: visible;
      }
      .title {
        width: 152px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        ${font.size[12]}
        ${font.weight[700]}
      }
      .writer {
        color: ${color.dark2};
      }
      .price {
        ${font.size[14]}
        ${font.weight[700]}
        display: flex;
        align-items: center;
        color: ${data.price !== null ? color.dark1 : color.main};

        ::after {
          content: '${data.price !== null && '원'}';
          ${font.size[12]}
          ${font.weight[400]}
        }
      }
    }

    .hovered {
      height: 56px;
      display: none;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      .areaName,
      .DDAY {
        ${font.weight[700]}
      }
      .areaName {
        ${font.size[12]}
        height: 20px;
      }
    }
  `;

  const textContents = () => {
    const common = css`
      ${font.size[14]}
      ${font.weight[700]}
    `;
    const textStyle = {
      dark: css`
        ${common}
        color: ${color.dark1};
      `,
      main: css`
        ${common}
        color: ${color.main};
      `,
    };

    if (!data.isDeadline) {
      if (data.decimalDay === 0) {
        return <p className={cx(textStyle.main)}>D-DAY</p>;
      } else if (data.decimalDay !== null) {
        return <p className={cx(textStyle.dark)}>D {data.decimalDay}</p>;
      }
      return <p className={cx(textStyle.main)}>상시</p>;
    } else {
      return <p className={cx(textStyle.dark)}>마감</p>;
    }
  };

  return (
    <Box size={[264, 208]}>
      <ImgBox img={data.photoUrl} shape={data.target} state={data.isDeadline} />
      <div className={cx(style)}>
        <div className="default">
          <div>
            <p className="title">{data.title}</p>
            <p className="writer">{data.nickname}</p>
          </div>
          <p className="price">
            {data.price !== null ? data.price.toLocaleString() : '나눔'}
          </p>
        </div>
        <div className="hovered">
          <p className="areaName">{data.areaName}</p>
          {textContents()}
        </div>
      </div>
    </Box>
  );
}

export default Poster;
