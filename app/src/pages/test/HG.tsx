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
import TestImg from './test';

interface BODY {
  title: string;
  description: string;
  image: FormData;
}

export default function HG() {
  const IMGURL = 'https://mohaeproj.s3.amazonaws.com/';
  const { register, handleSubmit } = useForm();
  const [testImg, setImg] = useState<any[]>([]);
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
    e.preventDefault();
    const formData = new FormData();
    console.log('e.currenTarget.file :>> ', e.target.firstChild.files);
    const files = e.target.firstChild.files;
    for (let i = 0; i < files.length; i++) {
      setImg([...testImg, URL.createObjectURL(files[i])]);
    }

    formData.append('title', '제목99');
    formData.append('description', '본문99');
    for (var i = 0; i < files.length; i++) {
      formData.append('image', files[i]);
    }

    // const iterator = formData.values();
    // console.log('iterator :>> ', iterator.next().value);
    // console.log('iterator :>> ', iterator.next().value);
    // console.log('iterator :>> ', iterator.next().value);
    // console.log('iterator :>> ', iterator.next().value);
    // console.log('iterator :>> ', iterator.next().value);

    // const ITER = formData.entries();
    // console.log('formData :>> ', ITER.next());
    // console.log('formData :>> ', ITER.next());
    // console.log('formData :>> ', ITER.next());
    // File 이 'image' 라는 key 에 잘 할당이 됐는지 확인 법

    // axios
    //   .post('https://mo-hae.site/specs/regist', formData, {
    //     headers: {
    //       accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //       Authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzdGFyZzFAaGFubWFpbC5uZXQiLCJ1c2VyTm8iOjUsImlzc3VlciI6Im1vZGVybi1hZ2lsZSIsImV4cGlyYXRpb24iOiIzNjAwMCIsImlhdCI6MTY1NTk2NDk1NSwiZXhwIjoxNjU2MDAwOTU1fQ.ACZMCX5BnAx9mA8mj78LCDCWTawX6-wYkXznfnLKhyk',
    //     },
    //   })
    //   .then((res) => {
    //     console.log(`res`, res.data);
    //   })
    //   .catch((err) => {
    //     console.log(`err`, err);
    //   });
  };

  console.log('testImg :>> ', testImg);
  return (
    <>
      {/* <div className="App">
        <form onSubmit={onSubmit}>
          <input
            id="img"
            type="file"
            // {...register('file')}
            accept=".jpg,.jpeg,.png"
            multiple
          />

          <input type="submit" />
        </form>
      </div> */}

      <TestImg edit />
      {/* <OrderedImg edit /> */}
    </>
  );
}
