/** @format */

import React, { Suspense } from 'react';
import { cx, css } from '@emotion/css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { injectGlobal } from '@emotion/css';
import { color, Layout } from './styles';
import {
  Board,
  CreatePost,
  HG,
  Home,
  // MyPage,
  OtherPage,
  Post,
  LoginModal,
  Spec,
} from './pages';
import SJ from './pages/test/SJ';

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box; 
    line-height: 170%;
    color: ${color.dark1};
  }
  textarea {
    resize: none;
  }
  button {
    cursor: pointer;
    background-color: inherit;
  } 
  ul {
    list-style: none;
  }
  a, a:visited, a:link {
    color: inherit;
    text-decoration: none;
  }
  &::-webkit-scrollbar {
        margin-right: 20px;
        background-color: rgba(0, 0, 0, 0);
        width: 4px;
        height: 0;
        cursor: pointer;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${color.main};
        border-radius: 10px;
      }
      &::-webkit-scrollbar-track {
        background-color: ${color.light4};
        border-radius: 10px;
      }

`;

interface Props {
  [key: string]: any;
}
function App({}: Props) {
  const MyPage = React.lazy(() => import('./pages/mypage/mypage/MyPage'));
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Layout main component={<Home />} />} />
        <Route path={'/hg'} element={<Layout component={<HG />} />} />
        <Route path={'/hl'} element={<Layout component={<div />} />} />
        <Route path={'/sj'} element={<Layout component={<SJ />} />} />
        <Route
          path={'/boards/:no'}
          element={<Layout component={<Board />} />}
        />
        <Route
          path={'/mypage/:no'}
          element={
            <Layout
              component={
                <Suspense
                  fallback={
                    <div
                      className={cx(css`
                        width: 100%;
                        height: 100vh;
                        background-color: red;
                        z-index: 10;
                      `)}
                    />
                  }
                >
                  <MyPage />
                </Suspense>
              }
            />
          }
        />
        <Route path={'/spec/:no'} element={<Layout component={<Spec />} />} />
        <Route path={'/post'} element={<Layout component={<Post />} />} />
        <Route
          path={'/write'}
          element={<Layout component={<CreatePost />} />}
        />
      </Routes>
      <LoginModal />
    </Router>
  );
}

export default App;
