import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Btn, Img } from '../../components';

function Btns() {
  const [imgs, setImgs] = useState({
    like: {
      disable: '/img/report-main.png',
      userClick: false,
    },
    report: {
      able: '/img/report-main.png',
      disalbe: '/img/report-light1.png',
    },
  });

  const style = css`
    display: flex;
    justify-content: space-between;
    width: 128px;
    .btnWrap {
      width: 60px;
      height: 60px;
    }
    .imgWrap {
      width: 32px;
      height: 32px;
    }
  `;

  const attrBtn = () => {};

  const onClick = {
    like: () => {
      setImgs({
        ...imgs,
        like: { ...imgs.like, userClick: !imgs.like.userClick },
      });
    },
    report: () => {
      console.log('report :>> ');
    },
  };

  return (
    <div className={cx(style)}>
      <div className='btnWrap'>
        <Btn white onClick={() => onClick.like()}>
          <div className='imgWrap'>
            <Img
              src={
                !imgs.like.userClick
                  ? '/img/heart-main.png'
                  : '/img/heart-filled-main.png'
              }
            />
          </div>
        </Btn>
      </div>
      <div className='btnWrap'>
        <Btn white onClick={() => onClick.report()}>
          <div className='imgWrap'>
            <Img src={'/img/report-main.png'} />
          </div>
        </Btn>
      </div>
    </div>
  );
}

export default Btns;
