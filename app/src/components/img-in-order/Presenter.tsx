import React from 'react';
import styled from '@emotion/styled';
import Img from '../img/Img';
import { ImageInputPresenter } from '../../types/createAndEditPost/type';

function Presenter(props: ImageInputPresenter) {
  const {
    imgBasket,
    edit,
    setImgIndex,
    handlePhotoIndex,
    addImage,
    deleteImg,
  } = props;

  const setIndex = (index: number) => {
    setImgIndex && setImgIndex(index);
  };

  const imgValuesForView = () => {
    return imgBasket.map((each, index: number) => (
      <ImgBox name={`${index}`} key={`${index}-show`} className={`${index}`}>
        <source srcSet={each.img} />
        <Img
          onClick={() => setIndex(index)}
          src={each.img}
          alt={`provide-small-img-${index}`}
        />
      </ImgBox>
    ));
  };

  const imgValuesForEdit = () => {
    return (
      <>
        {imgBasket.map((each, i: number) => {
          return (
            <ImgBox key={`${i}-edit`} name={`${i}`} onClick={handlePhotoIndex}>
              <Img src={each.img} loading={'lazy'} alt={`file-img-${i}`} />
              <PhotoIndex check={each.checked}>{i + 1}</PhotoIndex>
              <DeleteButton onClick={deleteImg} id={`${i}`} name="delete">
                <Img src="/img/delete.png" alt="img-delete" />
              </DeleteButton>
            </ImgBox>
          );
        })}
        {imgBasket.length < 5 && (
          <form>
            <input
              id="input-file"
              type="file"
              onChange={addImage}
              multiple
              accept=".jpg,.jpeg,.png"
            />
            <label htmlFor="input-file">
              <AddImg>
                <div className="icon">
                  <Img src="/img/add-white.png" alt="add-your-img" />
                </div>
              </AddImg>
            </label>
          </form>
        )}
      </>
    );
  };

  return (
    <Container>{edit ? imgValuesForEdit() : imgValuesForView()}</Container>
  );
}
export default Presenter;

const Container = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  align-content: flex-start;
  padding: 0 8px;
  & > * {
    margin: 0 6px;
  }
  & > :first-of-type {
    margin: 0 6px 0 8px;
  }
  & > :nth-of-type(5) {
    margin: 0 8px 0 6px;
  }
  #input-file {
    display: none;
  }
`;
const AddImg = styled.div`
  width: 56px;
  height: 56px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #cacace;
  border-radius: 6px;
  .icon {
    width: 30px;
    height: 30px;
  }
  :hover {
    box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
  }
`;

const ImgBox = styled.button<{ name: string }>`
  width: 56px;
  height: 56px;
  position: relative;
  cursor: pointer;
  :hover {
    & > :nth-of-type(2) {
      transition: 0.2s;
      transform: scale(1.2);
    }
    & > button {
      transition: 0.2s;
      transform: scale(1.2);
    }
    box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
  }
  background-color: white;
`;

const PhotoIndex = styled.div<{ check: boolean }>`
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.check ? '#ff445e' : 'white')};
  color: ${props => (props.check ? 'white' : '#ff445e')};
  border: 1px solid #ff445e;
  border-radius: 50%;
  position: absolute;
  bottom: 20.5px;
  right: 20.5px;
`;

const DeleteButton = styled.button`
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -8px;
`;
