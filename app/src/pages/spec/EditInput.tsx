/** @format */

import { css, cx } from '@emotion/css';
import { useState, useEffect, SetStateAction } from 'react';
import { color } from '../../styles';
import { Img } from '../../components';
import Style from '../../components/img-in-order/style';
import { add_images } from '../../redux/spec/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/root';
import axios from 'axios';
interface Props {
  [key: string]: any;
}

export interface IMAGE {
  img: string;
  checked: boolean;
  File: FormData | any;
}

export default function EditInputImg({ imgs, inline, editImages }: Props) {
  const clone =
    imgs &&
    imgs.map((img: any) => ({
      img: img,
      checked: false,
    }));

  const [alarm, setAlarm] = useState(true);
  const [myImage, setMyImage] = useState<IMAGE[]>(clone || []);
  const addedImages = useSelector((state: RootState) => state.spec.addImages);

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
        addedImages.append('image', files[count]);
        files &&
          urls.push({ img: imageURL, checked: false, File: files[count] });
      }
      setMyImage(urls);

      dispatch(add_images(addedImages));
    }
  };

  useEffect(() => {
    if (editImages.length) {
      const getImages = async () => {
        const files: File[] = [];
        for (let image of editImages) {
          await axios
            .get<Blob>(
              image.replace(
                'https://d2ffbnf2hpheay.cloudfront.net/',
                'https://mohae-image.s3.ap-northeast-2.amazonaws.com/',
              ),
              { responseType: 'blob' },
            )
            .then(res => {
              const file = new File([res.data], image, {
                type: res.data.type,
              });
              files.push(file);
            });
        }

        const newMyimage = files.map((file: any, i: any) => {
          return { img: file.name, checked: false, File: file };
        });
        setMyImage(newMyimage);
        newMyimage.map((el: any, i: any) =>
          addedImages.append('image', el.File),
        );
        dispatch(add_images(addedImages));
      };
      getImages();
    }
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
  const dispatch = useDispatch();

  const orderingImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    e.stopPropagation();
    e.stopPropagation();
    const idx = Number(e.currentTarget.name);
    const target = myImage[idx];
    if (!target.checked) {
      target.checked = !target.checked;
      const newClone = myImage.filter(
        (each: any, index: number) => index !== idx,
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
      const formData = new FormData();
      for (var i = 0; i < myImage.length; i++) {
        formData.append('image', newClone[i].File);
      }
      dispatch(add_images(formData));
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
      const formData = new FormData();
      for (let i = 0; i < myImage.length; i++) {
        formData.append('image', newClone[i].File);
      }
      dispatch(add_images(formData));
    }
  };

  const deleteImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const index = Number(e.currentTarget.id);
    const newImage = [...myImage];
    newImage.splice(index, 1);
    setMyImage(newImage);
    const targetName = e.currentTarget.name;
    // 삭제버튼을 누른 File.name
    const imagesNumber = addedImages.entries();
    const formDataLenth = Array.from(addedImages.keys()).length;
    const newFormData = new FormData();
    // imagesNumber.next().value[1].name
    // formData 내부의 파일 명
    for (let i = 0; i < formDataLenth; i++) {
      const target = imagesNumber.next().value[1];

      if (targetName !== target.name) {
        newFormData.append('image', target);
      }
    }
    dispatch(add_images(newFormData));
  };

  const request = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', 'newTitle');
    formData.append('description', 'newDescript');
    for (var i = 0; i < myImage.length; i++) {
      formData.append('image', myImage[i].File);
    }
  };

  const images =
    myImage &&
    myImage.map((each: any, index: number) => {
      const order = each.checked ? selected : '';
      return (
        <button
          key={index}
          className={'item-box'}
          name={`${index}`}
          onClick={orderingImg}
        >
          <Img src={each.img} />
          <div className={cx(sequence, order)}>{index + 1}</div>
          <button
            name={each.File.name}
            onClick={deleteImg}
            id={`${index}`}
            className={'delete'}
          />
        </button>
      );
    });
  const maxNum = 10,
    full = myImage.length < maxNum;
  const countStyle = css`
    color: ${color.dark1};
    position: absolute;
    bottom: 16px;
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
          <div className={'container'}>
            {images}
            <>
              {myImage.length < 10 && (
                <form onSubmit={request}>
                  <input
                    id="input-file"
                    type="file"
                    onChange={addImage}
                    multiple
                    accept=".jpg,.jpeg,.png"
                  />
                  <label htmlFor="input-file">
                    <div className={'item-box add'}>
                      <div
                        className={cx(css`
                          width: 24px;
                          height: 24px;
                          background: url('/img/add-dark3.png') no-repeat
                            center/contain;
                        `)}
                      />
                    </div>
                  </label>
                </form>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
