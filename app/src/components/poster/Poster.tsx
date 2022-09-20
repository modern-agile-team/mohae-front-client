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
    area?: string;
  };
  big?: boolean;
  size: string;
}

function Poster({ data, big, size }: Props) {
  // const imgSizeTable = {
  //   large: [360, 208],
  //   midium: [264, 152],
  //   small: [228, 120],
  // };
  // const postInfoSizeTable = {
  //   large: css`
  //     padding: 14px 16px;
  //     height: 76px;
  //     .title {
  //       ${font.size[14]}
  //     }
  //     .title,
  //     .writer,
  //     .areaName {
  //       height: 24px;
  //     }
  //   `,
  //   midium: css`
  //     padding: 8px 12px;
  //     height: 56px;
  //     .title {
  //       ${font.size[12]}
  //     }
  //     .title,
  //     .writer,
  //     .areaName {
  //       height: 20px;
  //     }
  //   `,
  //   small: css`
  //     padding: 16px;
  //     height: 57px;
  //     .title {
  //       ${font.size[14]}
  //     }
  //     .title,
  //     .writer,
  //     .areaName {
  //       height: 24px;
  //     }
  //   `,
  // };
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
      height: ${big ? '76px' : '56px'};
      display: flex;
      justify-content: space-between;
      padding: ${big ? '14px 16px' : '8px 12px'};

      .title,
      .writer,
      .areaName {
        height: ${big ? '24px' : '20px'};
        ${size !== 'midium' ? font.size[14] : font.size[12]}
        ${color.dark1}
        visibility: visible;
        display: flex;
      }
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        ${size !== 'midium' ? font.size[14] : font.size[12]}
        ${font.weight[700]}
        margin-bottom: 0px;
        align-items: center;
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
      height: ${big ? '76px' : '56px'};
      display: none;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      .areaName,
      .DDAY {
        ${font.weight[700]}
      }
      .areaName {
        ${big ? font.size[14] : font.size[12]}
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
    <Box size={big ? [360, 284] : [264, 208]}>
      {big ? (
        <ImgBox
          big
          img={data.photoUrl}
          shape={data.target}
          state={data.isDeadline}
        />
      ) : (
        <ImgBox
          img={data.photoUrl}
          shape={data.target}
          state={data.isDeadline}
        />
      )}
      <div className={cx(style)}>
        <div className="default">
          <div>
            <p className="title">{data.title}</p>
            <p className="writer">{data.nickname}</p>
          </div>
          <p className="price">{data.price && data.price.toLocaleString()}</p>
        </div>
        <div className="hovered">
          <p className="areaName">{data.areaName || data.area}</p>
          {textContents()}
        </div>
      </div>
    </Box>
  );
}

export default Poster;
