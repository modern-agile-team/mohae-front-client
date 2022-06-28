import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import Profile from '../profile/Profile';
import Img from '../img/Img';
import { color, font, radius, shadow } from '../../styles';

interface Props {
  children: React.ReactNode;
  reply?: boolean;
}

function Comments({ children, reply }: Props) {
  const style = css`
    display: flex;
    justify-content: space-between;
    width: ${!reply ? '100%' : '87%'};
    height: fit-content;
    margin: 16px 0px;
    & > *:not(:nth-child(1)) {
      width: fit-content;
      height: fit-content;
    }
    .container {
      margin-left: 12px;
    }
    .flex-wrap {
      display: flex;
    }
    .wrap {
      display: flex;
      align-items: center;
      width: 128px;
      gap: 8px;
    }
    .nickname {
      ${font.size[14]}
      ${font.weight[700]}
    }
    .img-wrap {
      width: 16px;
      height: 16px;
      margin-bottom: 2px;
      cursor: pointer;
    }
    .arrow-btn-wrap {
      width: 12px;
      height: 12px;
      margin-top: 4px;
    }
    .more-details-img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    .date {
      color: ${color.dark3};
      ${font.size[12]}
      ${font.weight[400]}
    }
    .des {
      max-width: 1023px;
      ${font.size[14]}
      ${font.weight[400]}
    }
    .reply {
      color: ${color.main};
      ${font.size[12]}
      ${font.weight[400]}
    display: flex;
      align-items: center;
      cursor: pointer;
    }
    .relative {
      position: relative;
    }
    .edit-delete-wrap {
      position: absolute;
      top: 22px;
      right: 0px;
      width: 100px;
      height: 90px;
      ${radius[6]}
      background-color: white;
      z-index: 1;
      padding: 0px 6px;
      ${shadow.normal}
    }
    .edit,
    .delete {
      ${font.size[14]}
      ${font.weight[400]}
  color: ${color.dark1};
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .edit {
      border-bottom: 1px solid ${color.light4};
    }
  `;

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTm8iOjIsImVtYWlsIjoid2VyMDYwOTlAbmF2ZXIuY29tIiwibmlja25hbWUiOiJobmVlZGRqc2pkZSIsInBob3RvVXJsIjoicHJvZmlsZS8xNjU1MTg0MjM0MTY1X1x1MDAwNO-_vTjvv71Q77-9LmpwZyIsImlzc3VlciI6Im1vZGVybi1hZ2lsZSIsImV4cGlyYXRpb24iOiIzNjAwMCIsImlhdCI6MTY1NjM3OTYwOSwiZXhwIjoxNjU2NDE1NjA5fQ.n3pTICdAFoXrP41T-uaM87W-mg2LdqJIp3OtztXXJXw';

  const [view, setView] = useState({
    reply: false,
    details: false,
    edit: false,
    delete: false,
  });

  const onClick = {
    reply: () => {
      setView({ ...view, reply: !view.reply });
    },
    details: () => {
      setView({ ...view, details: !view.details });
    },
    edit: () => {
      setView({ ...view, edit: !view.edit });
    },
    delete: () => {
      setView({ ...view, delete: !view.delete });
    },
  };

  return (
    <div className={cx(style)}>
      <div className='flex-wrap'>
        <Profile className='profile' img={null} size={45} />
        <div className='container'>
          <div className='wrap'>
            <p className='nickname'>닉네임닉네임닉네</p>
            <div className='img-wrap'>
              <Img src='/img/report-main.png' />
            </div>
          </div>
          <p className='date'>날짜</p>
          <p className='des'>{children}</p>
          {!reply && (
            <p className='reply' onClick={onClick.reply}>
              답글
              <div className='arrow-btn-wrap'>
                <Img
                  src={
                    view.reply
                      ? '/img/arrow-up-main.png'
                      : '/img/arrow-down-main.png'
                  }
                />
              </div>
            </p>
          )}
        </div>
      </div>
      <div className='relative'>
        <div className='more-details-img' onClick={onClick.details}>
          <Img src='/img/view-more.png' />
        </div>
        {view.details && (
          <div className='edit-delete-wrap'>
            <div className='edit'>수정하기</div>
            <div className='delete'>삭제하기</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
