import React, { useState } from 'react';
import Presenter from './Presenter';

function Container() {
  const imgs = [
    '/img/guide-01.jpg',
    '/img/guide-02.jpg',
    '/img/guide-03.jpg',
    '/img/guide-04.jpg',
    '/img/guide-05.jpg',
    '/img/guide-06.jpg',
    '/img/guide-07.jpg',
    '/img/guide-08.jpg',
    '/img/guide-09.jpg',
    '/img/guide-10.jpg',
  ];
  const [target, setTarget] = useState(1);
  const [carouselContentsViewBig, setCarouselContentsViewBig] = useState(false);

  const clickMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id === '+') {
      target === imgs.length - 1 ? setTarget(0) : setTarget(target + 1);
    } else if (e.currentTarget.id === '-') {
      !target ? setTarget(imgs.length - 1) : setTarget(target - 1);
    }
  };

  return (
    <Presenter
      imgs={imgs}
      target={target}
      carouselContentsViewBig={carouselContentsViewBig}
      setTarget={setTarget}
      clickMove={clickMove}
      setCarouselContentsViewBig={setCarouselContentsViewBig}
    />
  );
}

export default Container;
