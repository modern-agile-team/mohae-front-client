/** @format */

import { MySelf, OtherPage } from './index';
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

export default function MyPage({ posts, actions, checkSelf }: MyPageProps) {
  if (checkSelf === 'true') {
    return <MySelf posts={posts} actions={actions} checkSelf={checkSelf} />;
  } else {
    return <OtherPage posts={posts} actions={actions} checkSelf={checkSelf} />;
  }
}
