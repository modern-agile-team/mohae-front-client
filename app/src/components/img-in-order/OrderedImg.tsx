/** @format */

import { css, cx } from '@emotion/css';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Img from '../img/Img';
import Style from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setImgArr, setImgs } from '../../redux/createpost/reducer';
import { RootState } from '../../redux/root';
import axios from 'axios';
import useRefactorPostingData from '../../customhook/useRefactorPostingData';

interface Props {
  imgs: string[];
  edit: boolean;
  setImgIndex?: Dispatch<SetStateAction<number>>;
}

interface IMAGE {
  img: string;
  checked: boolean;
  File: string | Blob | null;
  size?: number;
}

export default function OrderedImg(props: Props) {
  const { imgs, edit, setImgIndex } = props;
  const dispatch = useDispatch();
  const refactorReduxData = useRefactorPostingData();
  const formData = useSelector((state: RootState) => state.createPost.form);
  const [imgBasket, setImgBasket] = useState<IMAGE[]>(
    imgs.map((img: string) => ({
      img: img,
      checked: false,
      File: '',
    })),
  );

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
  const style = Style({ inline: true });

  const sequence = css`
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid #ff445e;
    color: #ff445e;
    border-radius: 50%;
    position: absolute;
    bottom: 20.5px;
    right: 20.5px;
  `;

  const handlePhotoIndex = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const idx = Number(e.currentTarget.name);
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

  const setIndex = (index: number) => {
    setImgIndex && setImgIndex(index);
  };

  const show = () => {
    return imgBasket.map((each, index: number) => (
      <button key={`${index}`} className={'item-box show'} name={`${index}`}>
        <Img onClick={() => setIndex(index)} src={each.img} />
      </button>
    ));
  };

  const imgInputContainer = () => {
    return (
      <form>
        <input
          id="input-file"
          type="file"
          onChange={addImage}
          multiple
          accept=".jpg,.jpeg,.png"
        />
        <label htmlFor="input-file">
          <div className={'item-box add'}>
            <div className={'icon'} />
          </div>
        </label>
      </form>
    );
  };

  const images = () => {
    const selected = css`
      background-color: #ff445e;
      color: white;
    `;
    return (
      <>
        {imgBasket.map((each, i: number) => {
          const order = each.checked && selected;
          return (
            <button
              key={i}
              className="item-box"
              name={`${i}`}
              onClick={handlePhotoIndex}
            >
              <Img src={each.img} />
              <div className={cx(sequence, order)}>{i + 1}</div>
              <button onClick={deleteImg} id={`${i}`} className="delete" />
            </button>
          );
        })}
        {imgBasket.length < 5 && imgInputContainer()}
      </>
    );
  };

  return (
    <div className={cx(style)}>
      <div className={'wrapper'}>
        <div className={'container'}>{edit ? images() : show()}</div>
      </div>
    </div>
  );
}
