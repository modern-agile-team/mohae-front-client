/** @format */

import { css, cx } from '@emotion/css';
import { useState, useEffect, useMemo } from 'react';
import { color } from '../../styles';
import Img from '../img/Img';
import Style from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setImgArr, setImgs } from '../../redux/createpost/reducer';
import { RootState } from '../../redux/root';

interface Props {
  [key: string]: any;
}

interface IMAGE {
  img: string;
  checked: boolean;
  File: FormData | any;
  size: number;
}

export default function OrderedImg({ imgs, edit, inline }: Props) {
  const [clone, setClone] = useState(
    imgs &&
      imgs.map((img: any) => ({
        img: img,
        checked: false,
      })),
  );
  const [alarm, setAlarm] = useState(true);
  const [myImage, setMyImage] = useState<IMAGE[]>(clone || []);
  const formData = useSelector((state: RootState) => state.createPost.form);
  const reduxData: { [key: string]: any } = useSelector(
    (state: RootState) => state.createPost.data,
  );
  const dispatch = useDispatch();

  const refactorPriceData = useMemo((): number => {
    const newData = Number(reduxData.price.replace(/,/g, ''));
    return newData;
  }, [reduxData.price]);
  const refactorCategoryNo = useMemo((): number => {
    const newData = Number(reduxData.categoryNo);
    return newData;
  }, [reduxData.categoryNo]);
  const refactorAreaNo = useMemo((): number => {
    const newData = Number(reduxData.areaNo);
    return newData;
  }, [reduxData.areaNo]);
  const refactorDeadline = useMemo((): number => {
    const newData = Number(reduxData.deadline);
    return newData;
  }, [reduxData.deadline]);
  const refactorSummary = useMemo((): string | null => {
    const newData = reduxData.summary === '' ? null : reduxData.summary;
    return newData;
  }, [reduxData.summary]);
  const refactorDescription = useMemo((): string => {
    const newData = reduxData.description;
    return newData;
  }, [reduxData.description]);
  const refactorTitle = useMemo((): string => {
    const newData = reduxData.title;
    return newData;
  }, [reduxData.title]);

  const refactorReduxData: { [key: string]: string | number | null } = {
    price: refactorPriceData,
    title: refactorTitle,
    description: refactorDescription,
    summary: refactorSummary,
    target: reduxData.target,
    categoryNo: refactorCategoryNo,
    areaNo: refactorAreaNo,
    deadline: refactorDeadline,
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files || [];
    if (inline && files.length + myImage.length > 5) {
      alert('사진은 최대 5개만 업로드 할 수 있습니다.');
    } else {
      const urls = [...myImage];
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
        setMyImage(urls);
      }

      dispatch(setImgs(formData));
      dispatch(setImgArr(urls));
    }
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
      formData.delete('image');
      for (var i = 0; i < myImage.length; i++) {
        formData.append('image', newClone[i].File);
      }

      dispatch(setImgArr(newClone));
      dispatch(setImgs(formData));
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
      formData.delete('image');
      for (var i = 0; i < myImage.length; i++) {
        formData.append('image', newClone[i].File);
      }

      dispatch(setImgArr(newClone));
      dispatch(setImgs(formData));
    }
  };

  const deleteImg = (e: React.MouseEvent<HTMLButtonElement>, num: number) => {
    e.preventDefault();
    e.stopPropagation();

    const newFormData = new FormData();
    for (const key in refactorReduxData) {
      newFormData.set(`${key}`, JSON.stringify(refactorReduxData[key]));
    }

    const index = Number(e.currentTarget.id);
    const newImage = [...myImage];
    newImage.splice(index, 1);
    setMyImage(newImage);

    for (let i = 0; i < newImage.length; i++) {
      newFormData.append('image', newImage[i].File);
    }

    dispatch(setImgArr(newImage));
    dispatch(setImgs(newFormData));
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
                onClick={orderingImg}
              >
                <Img src={each.img} />
                <div className={cx(sequence, order)}>{index + 1}</div>
                <button
                  onClick={e => deleteImg(e, index)}
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
