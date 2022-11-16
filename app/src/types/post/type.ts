import React from 'react';

// ******Posting DATA TYPES******
interface PostData {
  data: {
    date: string;
    response: PostResponse;
  };
}

interface PostResponse {
  authorization: boolean;
  board: PosterDetails;
}

interface PosterDetails {
  areaName: string;
  areaNo: number;
  boardPhotoUrls: string | null;
  categoryName: string;
  categoryNo: number;
  decimalDay: number | null;
  description?: string;
  hit: number;
  createdAt: string;
  endDate: string | null;
  deadline: number;
  isDeadline: number;
  isLike?: boolean | null | number;
  likeCount: number;
  majorName: string;
  nickname: string;
  no: number;
  price: number;
  summary: null | string;
  target: number;
  title: string;
  userNo: number;
  userPhotoUrl: string;
}

// ******Posting DATA TYPES******

// ******ComponentsProps TYPES******
interface PresenterProps {
  requestHandleDeadline: (data: PosterDetails) => void;
}

interface PostUserInteractionProps {
  popupContents: { text: string; children: JSX.Element };
}
// ******ComponentsProps TYPES******

export type {
  PostData,
  PostResponse,
  PosterDetails,
  PresenterProps,
  PostUserInteractionProps,
};
