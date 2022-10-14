import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export interface MyPageProps {
  posts: any;
  actions: {
    specs: ActionCreatorWithPayload<any, string>;
    toHelp: ActionCreatorWithPayload<any, string>;
    helpMe: ActionCreatorWithPayload<any, string>;
  };
  checkSelf: string;
}
