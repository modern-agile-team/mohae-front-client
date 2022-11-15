import React, { Dispatch } from 'react';

interface PresenterProps {
  onSubmit: (requestForm: RequestForm) => void;
  requestForm: (state: CheckList) => RequestForm;
}

interface ContainerProps {
  reportTarget: 'board' | 'user';
}

interface CheckBoxListProps {
  checkList: CheckList;
  setCheckList: Dispatch<React.SetStateAction<CheckList>>;
}

interface RequestForm {
  checksCount: number[];
  description: string;
}

interface CheckList {
  list: List[];
  text: string;
}

interface List {
  checked: boolean;
  title: string;
}

export type {
  ContainerProps,
  PresenterProps,
  CheckBoxListProps,
  RequestForm,
  CheckList,
  List,
};
