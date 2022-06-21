/** @format */

import { useState, useEffect } from 'react';
import { injectGlobal, cx, css } from '@emotion/css';
import {
  Categories,
  Category,
  OrderedImg,
  MarkBox,
  Img,
  NewPost,
  Carousel,
} from '../../components';
import { RootState, AppDispatch } from '../../redux/root';
import { Profile, LoginModal } from '../../pages';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

interface BODY {
  title: string;
  description: string;
  image: FormData;
}

export default function HG() {
  const IMGURL = 'https://mohaeproj.s3.amazonaws.com/';
  const [imgurl, setImgurl] = useState('');
  const { register, handleSubmit } = useForm();
  // useEffect(() => {
  //   axios
  //     .get(`https://mo-hae.site/specs/profile?user=5&take=6&page=1`, {
  //       headers: {
  //         accept: 'application/json',
  //         Authorization:
  //           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzdGFyZzFAaGFubWFpbC5uZXQiLCJ1c2VyTm8iOjUsImlzc3VlciI6Im1vZGVybi1hZ2lsZSIsImV4cGlyYXRpb24iOiIzNjAwMCIsImlhdCI6MTY1NTc4MzQ2OCwiZXhwIjoxNjU1ODE5NDY4fQ.iIyGJSUtyT5d9EW0GdjWJRVRMI5wX_usL2NzP_5-sZc',
  //       },
  //     })
  //     .then((res) => {
  //       console.log(`res`, res.data.response[0].specPhotos[0]['photo_url']);
  //       setImgurl(res.data.response[0].specPhotos[0]['photo_url']);
  //     })
  //     .catch((err) => {
  //       console.log(`err`, err);
  //     });
  // }, []);

  const onSubmit = async (e: any) => {
    const formData = new FormData();
    const EVENT = e;

    formData.append('title', '제목333');
    formData.append('description', '본문333');
    var arr = EVENT.file;
    for (var i = 0; i < arr.length; i++) {
      formData.append('image', EVENT.file[i]);
    }
    // const ITER = formData.entries();
    // console.log('formData :>> ', ITER.next());
    // console.log('formData :>> ', ITER.next());
    // console.log('formData :>> ', ITER.next());
    // File 이 'image' 라는 key 에 잘 할당이 됐는지 확인 법

    axios
      .post('https://mo-hae.site/specs/regist', formData, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzdGFyZzFAaGFubWFpbC5uZXQiLCJ1c2VyTm8iOjUsImlzc3VlciI6Im1vZGVybi1hZ2lsZSIsImV4cGlyYXRpb24iOiIzNjAwMCIsImlhdCI6MTY1NTc4OTE2NiwiZXhwIjoxNjU1ODI1MTY2fQ.AaB2J02i8DE_-w98_AzXkvqT7HIpZm9S1Klmavd4Cpk',
        },
      })
      .then((res) => {
        console.log(`res`, res.data);
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            {...register('file')}
            accept=".jpg,.jpeg,.png"
            multiple
          />

          <input type="submit" />
        </form>

        {/* <div
          className={cx(css`
            width: 300px;
            height: 300px;
          `)}
        >
          <Img src={`${IMGURL}${imgurl}`} />
        </div> */}
      </div>
      {/* <OrderedImg edit /> */}
    </>
  );
}
