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
  if (checkSelf === 'true') {
    return (
      <MySelf
        text={text}
        userInfo={userInfo}
        posts={posts}
        actions={actions}
        checkSelf={checkSelf}
      />
    );
  } else {
    return (
      <OtherPage
        text={text}
        userInfo={userInfo}
        posts={posts}
        actions={actions}
        checkSelf={checkSelf}
      />
    );
  }
}
