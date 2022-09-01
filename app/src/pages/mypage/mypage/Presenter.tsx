/** @format */

import OtherPage from './OtherPage';
import MySelf from './MySelf';

interface Props {
  [key: string]: any;
}

export default function MyPage({ text, posts, actions, checkSelf }: Props) {
  if (checkSelf === 'true') {
    return (
      <MySelf
        text={text}
        posts={posts}
        actions={actions}
        checkSelf={checkSelf}
      />
    );
  } else {
    return (
      <OtherPage
        text={text}
        posts={posts}
        actions={actions}
        checkSelf={checkSelf}
      />
    );
  }
}
