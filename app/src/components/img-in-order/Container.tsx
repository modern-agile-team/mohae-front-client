import React, { useState, useEffect } from 'react';
import { setImgArr, setImgs } from '../../redux/createpost/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import axios from 'axios';
import Presenter from './Presenter';
import useRefactorPostingData from '../../customhook/useRefactorPostingData';
import {
  ImageInputContainer,
  ImgBasket,
} from '../../types/createAndEditPost/type';

function Container(props: ImageInputContainer) {
  const { imgs, edit, setImgIndex } = props;
  const dispatch = useDispatch();
  const refactorReduxData = useRefactorPostingData();
  const formData = useSelector((state: RootState) => state.createPost.form);
  const [imgBasket, setImgBasket] = useState<ImgBasket[]>(
    imgs.map((img: string) => ({
      img: img,
      checked: false,
      File: '',
    })),
  );

  const getImgFromS3 = async () => {
    const replaceImgURLs = imgBasket.map(object =>
      object.img.replace(
        'https://d2ffbnf2hpheay.cloudfront.net/',
        'https://mohae-image.s3.ap-northeast-2.amazonaws.com/',
      ),
    );
    const requestImgFiles = await Promise.all(
      replaceImgURLs.map(url =>
        axios.get<Blob>(url, { responseType: 'blob' }).then(res => {
          return new File([res.data], url.substring(72), {
            type: res.data.type,
          });
        }),
      ),
    );
    const newImgBasket = imgBasket.map((el, i) => {
      return { img: el.img, checked: false, File: requestImgFiles[i] };
    });
    setImgBasket(newImgBasket);
    newImgBasket.forEach(el => el.File && formData.append('image', el.File));
  };

  useEffect(() => {
    if (edit && imgBasket) getImgFromS3();
  }, []);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files || [];

    if (files.length + imgBasket.length > 5) {
      alert('사진은 최대 5개만 업로드 할 수 있습니다.');
    } else {
      const urls = [...imgBasket];
      for (let count = 0; count < files.length; count++) {
        const imageURL = URL.createObjectURL(files[count]);
        formData.append('image', files[count]);
        files &&
          urls.push({
            img: imageURL,
            checked: false,
            File: files[count],
            size: files[count].size,
          });
        setImgBasket(urls);
      }

      dispatch(setImgs(formData));
      dispatch(setImgArr(urls));
    }
  };

  const deleteImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const newFormData = new FormData();
    const newImage = [...imgBasket];
    const index = Number(e.currentTarget.id);

    for (const key in refactorReduxData) {
      newFormData.set(`${key}`, JSON.stringify(refactorReduxData[key]));
    }

    newImage.splice(index, 1);
    newImage.forEach(el => el.File && newFormData.append('image', el.File));

    setImgBasket(newImage);
    dispatch(setImgArr(newImage));
    dispatch(setImgs(newFormData));
  };

  const handlePhotoIndex = (e: React.MouseEvent<HTMLButtonElement>) => {
    const idx = Number(e.currentTarget.name);
    console.log(idx);
    const target = imgBasket[idx];
    target.checked = !target.checked;
    const newImgBasket = imgBasket.filter((_, index) => index !== idx);

    formData.delete('image');

    if (target.checked) {
      const newPhotoIndex = imgBasket.reduce((checkedNum, nextImg) => {
        if (nextImg.checked) return ++checkedNum;
        else return checkedNum;
      }, 0);

      newImgBasket.splice(newPhotoIndex - 1, 0, target);
    } else {
      const newPhotoIndex = imgBasket.reduce((noneCheckedNum, nextImg) => {
        if (!nextImg.checked) return ++noneCheckedNum;
        else return noneCheckedNum;
      }, 0);

      newImgBasket.splice(newImgBasket.length - (newPhotoIndex - 1), 0, target);
    }

    newImgBasket.forEach(el => el.File && formData.append('image', el.File));

    setImgBasket(newImgBasket);
    dispatch(setImgArr(newImgBasket));
    dispatch(setImgs(formData));
  };

  return (
    <Presenter
      edit={edit}
      imgBasket={imgBasket}
      setImgIndex={setImgIndex}
      handlePhotoIndex={handlePhotoIndex}
      addImage={addImage}
      deleteImg={deleteImg}
    />
  );
}
export default Container;
