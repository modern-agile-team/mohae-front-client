/** @format */

import { color, radius, font, shadow } from '../../styles';
import { css, cx } from '@emotion/css';
import Img from '../img/Img';
import MarkBox from '../markbox/MarkBox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/root';
import { Link } from 'react-router-dom';
import { spec_visit } from '../../redux/modal/reducer';
import { get_spec_info } from '../../redux/spec/reducer';
import { ENDPOINT } from '../../utils/ENDPOINT';
import setInterceptors from '../../apis/common/setInterceptors';
import { customAxios } from '../../apis/instance';

interface Props {
  [key: string]: any;
}

export default function NewPost({ page, board }: Props) {
  const text: { [key: string]: any } = {
    isOver: 'DAY',
  };
  const check: { [key: string]: any } = {
    inMain: {
      size: '208',
      fontSize: '14',
      titleSize: '24',
    },
    inBoard: {
      size: '152',
      fontSize: '12',
      padding: css`
        padding: 8px 12px;
      `,
      maxUser: css`
        max-width: 152px;
      `,
    },
    inSpec: {
      size: '120',
      fontSize: '14',
      padding: css`
        padding: 16px;
      `,
      maxUser: css`
        max-width: 196px;
      `,
    },
    inReview: {
      size: '97',
      fontSize: '12',
      padding: css`
        padding: 8px;
      `,
      maxUser: css`
        max-width: 157px;
        * {
          height: 17px;
        }
      `,
      mark: css`
        top: 8px;
        right: 8px;
      `,
    },
  };

  const style = css`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    ${shadow.normal};
    ${radius[6]};

    > .mark-box {
      position: absolute;
      top: 16px;
      right: 16px;
      ${check[page].mark};
    }

    > .img {
      width: 100%;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      height: ${`${check[page].size}px`};
      background-color: white;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      & > * {
        transition: 0.3s all ease-in-out;
        transform: scale(1);
      }
      > .logo {
        width: 60px;
        height: 45px;
      }

      :hover {
        & > * {
          transition: 0.3s all ease-in-out;
          transform: scale(1.2);
        }
      }
    }

    .info {
      ${shadow.normal}
      height: ${`calc(100% - ${check[page].size}px)`};
      padding: 14px 16px;
      ${check[page].padding}
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      position: relative;
      overflow: hidden;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      > .sub-info {
        ${page !== 'inSpec' &&
        css`
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          bottom: -76px;
          transition: 0.3s ease-in-out all;
          * {
            ${font.weight[700]};
          }
          > .area {
            font-size: 14px;
          }
          > .day {
            font-size: 16px;
            color: ${`${board.decimalDay === null ? color.main : color.dark1}`};
          }
        `}
      }
      :hover {
        > .sub-info {
          ${page !== 'inSpec' &&
          css`
            transition: 0.3s ease-in-out all;
            transform: translateY(-76px);
            background-color: white;
          `}
        }
      }

      * {
        font-size: ${`${check[page].fontSize}px`} !important;
        line-height: 170%;
      }

      .user {
        width: 168px;
        ${check[page].maxUser}
        height: fit-content;
        * {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .title {
          font-size: ${`${check[page].fontSize}px`} !important;
          height: ${`${check[page].titleSize}px`};
          ${font.weight[700]}
          max-width: 168px;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .price {
        width: 90px;
        height: 27px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        > * {
          font-size: ${`${Number(check[page].fontSize) + 2}px`} !important;
          ${font.weight[700]}
        }
        .won {
          font-size: ${`${check[page].fontSize}px`} !important;
          ${font.weight[400]}
          margin-left: 2px;
        }
      }
    }
  `;

  const info = (page === 'inMain' || page === 'inBoard') && (
    <div className={'writer'}>{board && board.nickname}</div>
  );

  const price = (page === 'inMain' || page === 'inBoard') && (
    <div className={'price '}>
      <div>{board && board.price}</div>
      <div className={'won'}>{'원'}</div>
    </div>
  );

  const markBox = board.isDeadline ? (
    page === 'inMain' || page === 'inBoard' ? (
      <MarkBox
        shape={board && board.target}
        state={board && board.isDeadline}
        big
        hover
      />
    ) : (
      <MarkBox
        big
        shape={board && board.target}
        state={board && board.isDeadline}
      />
    )
  ) : (
    <> </>
  );

  const isOpenSpecVisit = useSelector(
    (state: RootState) => state.modal.openSpecVisit,
  );
  const dispatch = useDispatch();

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(spec_visit(!isOpenSpecVisit));
    if (page === 'inSpec') {
      setInterceptors(customAxios)
        .get(`${ENDPOINT}/specs/spec/${board.no}`)
        .then(res => {
          if (res.data.statusCode >= 200 && res.data.statusCode <= 204) {
            dispatch(get_spec_info(res.data.response));
          }
        })
        .catch(err => {
          console.log('err :>> ', err);
        });
    }
  };

  return (
    <Link
      to={isNaN(board.target) ? `?spec/${board.no}` : `post/${board.no}`}
      className={cx(style)}
      onClick={openModal}
    >
      <div className={'img'}>
        {board ? (
          <Img src={`${board.photoUrl}`} />
        ) : (
          <div className={'logo'}>
            <Img src={'/img/logo.png'} />
          </div>
        )}
      </div>
      <div className={'info'}>
        <div className={'user'}>
          <div className={'title'}>{board && board.title}</div>
          {info}
        </div>
        {price}
        <div className={'sub-info'}>
          <div className={'area'}> {board.area}</div>
          <div className={'day'}>
            {page !== 'inSpec' && `D - ${board.decimalDay || text.isOver}`}
          </div>
        </div>
      </div>
      <div className={'mark-box'}>{markBox}</div>
    </Link>
  );
}
