const categoryList = (param: { shift: boolean }) => {
  const list = [
    { no: '2', name: '디자인', img: `/img/category-1.png` },
    { no: '3', name: 'IT/개발', img: `/img/category-2.png` },
    { no: '4', name: '사진/영상', img: `/img/category-3.png` },
    { no: '5', name: '기획/마케팅', img: `/img/category-4.png` },
    { no: '6', name: '번역/통역', img: `/img/category-5.png` },
    { no: '7', name: '문서작업', img: `/img/category-6.png` },
    { no: '8', name: '컨설팅', img: `/img/category-7.png` },
    { no: '9', name: '법률', img: `/img/category-8.png` },
    { no: '10', name: '과외/레슨', img: `/img/category-9.png` },
    { no: '11', name: '상담/운세', img: `/img/category-10.png` },
    { no: '12', name: '이벤트', img: `/img/category-11.png` },
    { no: '13', name: '핸드메이드', img: `/img/category-12.png` },
    { no: '14', name: '취미', img: `/img/category-13.png` },
    { no: '15', name: '생활서비스', img: `/img/category-14.png` },
    { no: '16', name: '기타', img: `/img/category-15.png` },
  ];

  !param.shift &&
    list.splice(0, 0, { no: '1', name: '전체', img: `/img/category-0.png` });

  return list;
};

const lists: { [placeholder: string]: { no: string; name: string }[] } = {
  categoryNo: categoryList({ shift: true }),
  areaNo: [
    { no: '1', name: '서울' },
    { no: '2', name: '경기도' },
    { no: '3', name: '강원도' },
    { no: '4', name: '대전' },
    { no: '5', name: '세종시' },
    { no: '6', name: '전라도' },
    { no: '7', name: '광주' },
    { no: '8', name: '경상도' },
    { no: '9', name: '울산' },
    { no: '10', name: '부산' },
    { no: '11', name: '제주도' },
  ],
  deadline: [
    { no: '7', name: '일주일' },
    { no: '30', name: '1개월' },
    { no: '60', name: '3개월' },
    { no: '0', name: '상시' },
  ],
};

export { categoryList, lists };
