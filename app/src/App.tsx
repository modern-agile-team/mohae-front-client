/** @format */

import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { injectGlobal } from '@emotion/css';
import { color, Layout } from './styles';
import {
  Board,
  CreatePost,
  HG,
  Home,
  MyPage,
  Post,
  LoginModal,
  Spec,
} from './pages';
import Edit from './pages/spec/Edit';
import Visit from './pages/spec/Visit';
import Inquire from './pages/inquire/inquire';
import InquireSuccess from './pages/inquire/inquireSuccess';

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box; 
    line-height: 170%;
    /* color: ${color.dark1}; */
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
  li {
    list-style:none;
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

const App: React.SFC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path={'/'} element={<Layout main component={<Home />} />} />
        <Route path={'/hg'} element={<Layout component={<HG />} />} />
        <Route
          path={'/boards/:no'}
          element={<Layout component={<Board />} />}
        />
        <Route
          path={'/mypage/:no'}
          element={<Layout component={<MyPage />} />}
        />
        <Route path={'/spec/:no'} element={<Layout component={<Spec />} />} />
        <Route path={'/post/:no'} element={<Layout component={<Post />} />} />
        <Route
          path={'/createpost'}
          element={<Layout component={<CreatePost />} />}
        />
        <Route
          path={'/edit/:no'}
          element={<Layout component={<CreatePost />} />}
        />
        <Route path={'/inquire'} element={<Layout component={<Inquire />} />} />
        <Route
          path={'/success'}
          element={<Layout component={<InquireSuccess />} />}
        />
      </Routes>
      <Visit />
      <Edit />
      <LoginModal />
      {/* cancel this comment after test*/}
    </Router>
  );
};

export default App;
