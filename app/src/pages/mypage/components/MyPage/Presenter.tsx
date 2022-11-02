/** @format */

import { MySelf, OtherPage } from './index';
import { MyPageProps } from '../../../../types/myPage/myPage';

export default function MyPage({ posts, actions, checkSelf }: MyPageProps) {
  if (checkSelf === 'true') {
    return <MySelf posts={posts} actions={actions} checkSelf={checkSelf} />;
  } else {
    return <OtherPage posts={posts} actions={actions} checkSelf={checkSelf} />;
  }
}
