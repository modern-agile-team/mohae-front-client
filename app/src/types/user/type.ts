interface User {
  boardNum: string;
  categories: { [noAndName: string]: string }[];
  createdAt: string;
  email: string;
  isLike: boolean;
  likedUserNum: string;
  majorName: string;
  majorNo: number;
  name: string;
  nickname: string;
  phone: string;
  photo_url: null | string;
  schoolName: string;
  schoolNo: number | null;
  userNo: number;
}

export type { User };
