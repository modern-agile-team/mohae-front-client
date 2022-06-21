/** @format */

import { css, cx } from '@emotion/css';
import { useState, useEffect, useRef } from 'react';
import { color, radius, font, shadow } from '../../styles';
import Img from '../img/Img';
import Style from './style';
import axios from 'axios';
import { ContentBlock } from 'draft-js';

interface Props {
  [key: string]: any;
}

interface IMAGE {
  img: string;
  checked: boolean;
}

export default function OrderedImg({ imgs, edit, inline }: Props) {
  const [clone, setClone] = useState(
    imgs &&
      imgs.map((img: any) => ({
        img: img,
        checked: false,
      }))
  );
  const [alarm, setAlarm] = useState(true);
  const [myImage, setMyImage] = useState<IMAGE[]>(clone || []);

  const [testImg, setTestImg] = useState(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files || [];
    if (inline && files.length + myImage.length > 5) {
      alert('사진은 최대 5개만 업로드 할 수 있습니다.');
    } else if (!inline && files.length + myImage.length > 10) {
      alert('사진은 최대 10개만 업로드 할 수 있습니다.');
    } else {
      const urls = [...myImage];
      for (let count = 0; count < files.length; count++) {
        const imageURL = URL.createObjectURL(files[count]);
        files && urls.push({ img: imageURL, checked: false });
        setMyImage(urls);
      }
    }
    const img: any | Blob | File =
      e.currentTarget.files && e.currentTarget.files[0];
    // const img = e.currentTarget.files;
    const formDataImg = new FormData();
    formDataImg.append('file', img);
    // for (let key of Object.keys(formDataImg)) {
    //   console.log(key);
    // }
    // console.log('img :>> ', img);
    // console.log('formDataImg :>> ', formDataImg);

    axios
      .post(
        'https://mo-hae.site/specs/regist',
        {
          title: '이한결제목',
          description: '이한결본문',
          image: formDataImg,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzdGFyZzFAaGFubWFpbC5uZXQiLCJ1c2VyTm8iOjUsImlzc3VlciI6Im1vZGVybi1hZ2lsZSIsImV4cGlyYXRpb24iOiIzNjAwMCIsImlhdCI6MTY1NTc3NTc3NSwiZXhwIjoxNjU1ODExNzc1fQ.l7alrMuDDhip_KUU1yvSF5rAZ-UoPeALh5dZBjsFuxk',
          },
        }
      )
      .then((res) => {
        console.log(`res`, res);
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setAlarm(false);
    }, 5000);
  }, []);

  const style = Style({ inline: inline });

  const sequence = css`
    width: ${inline ? `15px` : `20px`};
    height: ${inline ? `15px` : `20px`};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid ${color.main};
    color: ${color.main};
    border-radius: 50%;
    position: absolute;
    bottom: ${inline ? `${56 / 2 - 15 / 2}px` : `8px`};
    right: ${inline ? `${56 / 2 - 15 / 2}px` : `8px`};
  `;

  const selected = css`
    background-color: ${color.main};
    color: white;
  `;

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    e.stopPropagation();
    e.stopPropagation();
    const idx = Number(e.currentTarget.name);
    const target = myImage[idx];
    if (!target.checked) {
      target.checked = !target.checked;
      const newClone = myImage.filter(
        (each: any, index: number) => index !== idx
      );

      const section = myImage.reduce((acc: any, cur: any) => {
        if (cur.checked) {
          return ++acc;
        } else {
          return acc;
        }
      }, 0);
      newClone.splice(section - 1, 0, target);

      setMyImage(newClone);
    } else {
      target.checked = !target.checked;
      const newClone = myImage.filter((each: any, index: any) => index !== idx);

      const section = myImage.reduce((acc: any, cur: any) => {
        if (!cur.checked) {
          return ++acc;
        } else {
          return acc;
        }
      }, 0);
      newClone.splice(newClone.length - (section - 1), 0, target);
      setMyImage(newClone);
    }
  };

  const deleteImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const index = Number(e.currentTarget.id);
    const newImage = [...myImage];
    newImage.splice(index, 1);
    setMyImage(newImage);
  };

  const input_element = useRef(null);
  // const input_element = document.querySelector('#input-file');

  const request = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('myImage :>> ', myImage);
  };

  const show = () => {
    return (
      <>
        {myImage &&
          myImage.map((each: any, index: number) => {
            return (
              <button key={index} className={'item-box show'} name={`${index}`}>
                <Img src={each.img} />
              </button>
            );
          })}
      </>
    );
  };

  const images = () => {
    return (
      <>
        {myImage &&
          myImage.map((each: any, index: number) => {
            const order = each.checked ? selected : '';
            return (
              <button
                key={index}
                className={'item-box'}
                name={`${index}`}
                onClick={click}
              >
                <Img src={each.img} />
                <div className={cx(sequence, order)}>{index + 1}</div>
                <button
                  onClick={deleteImg}
                  id={`${index}`}
                  className={'delete'}
                />
              </button>
            );
          })}
        {edit &&
          ((myImage.length < 5 && inline) ||
            (myImage.length < 10 && !inline)) && (
            <>
              <input
                id="input-file"
                type="file"
                onChange={addImage}
                multiple
                accept=".jpg,.jpeg,.png"
                // ref={input_element}
              />
              <label htmlFor="input-file">
                <div className={'item-box add'}>
                  <div className={'icon'} />
                </div>
              </label>
            </>
          )}
      </>
    );
  };

  if (edit) {
    const maxNum = 10,
      full = myImage.length < maxNum;
    const countStyle = css`
      color: ${color.dark1};
      position: absolute;
      bottom: 32px;
      right: 16px;
    `;
    const maxNumberStyle = css`
      color: ${full ? color.dark1 : color.main};
    `;
    return (
      <>
        <div className={cx(style)}>
          {alarm && (
            <div className="alarm">
              {'사진을 클릭하여 순서설정 및 삭제를 할 수 있습니다'}
            </div>
          )}
          {!inline && (
            <div className={cx(countStyle)}>
              <span className={cx(maxNumberStyle)}>{`${myImage.length}`}</span>
              {` / ${maxNum}`}
            </div>
          )}
          <div className={'wrapper'}>
            <div className={'container'}>{images()}</div>
          </div>
        </div>
        <button
          className={cx(css`
            position: absolute;
            background-color: red;
            width: 40px;
            height: 30px;
            top: 100px;
            left: 20px;
          `)}
          onClick={request}
        >
          {'호출'}
        </button>
      </>
    );
  } else if (imgs) {
    return (
      <div className={cx(style)}>
        <div className={'wrapper'}>
          <div className={'container'}>{show()}</div>
        </div>
      </div>
    );
  } else {
    const style = css`
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${color.dark1};
    `;
    return <div className={cx(style)}>{'등록된 사진이 없습니다'}</div>;
  }
}
