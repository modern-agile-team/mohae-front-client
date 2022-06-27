/** @format */

import OtherPage from './OtherPage';
import MySelf from './MySelf';

interface Props {
  [key: string]: any;
}

export default function MyPage({
  text,
  userInfo,
  posts,
  actions,
  checkSelf,
}: Props) {
  console.log('posts :>> ', posts);
  if (checkSelf === 'true') {
    return (
      <MySelf text={text} userInfo={userInfo} posts={posts} actions={actions} />
    );
  } else {
    return (
      <OtherPage
        text={text}
        userInfo={userInfo}
        posts={posts}
        actions={actions}
      />
    );
  }
}
