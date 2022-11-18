import React, { useState, lazy, Suspense } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { injectGlobal } from '@emotion/css';
import { color, Layout } from './styles';
import { LoginModal } from './pages';
import ReportModal from './components/report/Container';
import { getToken } from './utils/getToken';
import { ACCESS_TOKEN } from './consts/tokenKey';
import { Popup, Spinner } from './components';

const Visit = lazy(() => import('./pages/mypage/components/Spec/Visit'));
const Edit = lazy(() => import('./pages/mypage/components/Spec/Edit'));
const Inquire = lazy(() => import('./pages/inquire/inquire'));
const InquireSuccess = lazy(() => import('./pages/inquire/inquireSuccess'));
const ChangePassword = lazy(
  () => import('./pages/login/findPassword/setNewPassword/Container'),
);
const Notice = lazy(() => import('./pages/faq/Notice'));
const Board = lazy(() =>
  import('./pages').then(({ Board }) => ({ default: Board })),
);
const CreateAndEditPost = lazy(() =>
  import('./pages').then(({ CreateAndEditPost }) => ({
    default: CreateAndEditPost,
  })),
);
const Main = lazy(() =>
  import('./pages').then(({ Main }) => ({ default: Main })),
);
const MyPage = lazy(() =>
  import('./pages').then(({ MyPage }) => ({ default: MyPage })),
);

const Post = lazy(() =>
  import('./pages').then(({ Post }) => ({ default: Post })),
);

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box; 
    line-height: 170%;
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
  const token = getToken(ACCESS_TOKEN);
  const [snapPageNumber, setSnapPageNumber] = useState(0);
  return (
    <Router>
      <Suspense fallback={<Spinner size="big" />}>
        <Routes>
          <Route
            path={'/'}
            element={
              <Layout
                snapPageNumber={snapPageNumber}
                setSnapPageNumber={setSnapPageNumber}
                main
                component={
                  <Main
                    snapPageNumber={snapPageNumber}
                    setSnapPageNumber={setSnapPageNumber}
                  />
                }
              />
            }
          />
          <Route
            path={'/boards/categories/:no'}
            element={<Layout component={<Board />} />}
          />
          <Route
            path={'/mypage/:no'}
            element={
              <Layout
                component={token ? <MyPage /> : <Navigate replace to="/" />}
              />
            }
          />
          <Route path={'/post/:no'} element={<Layout component={<Post />} />} />
          <Route
            path={'/create/post'}
            element={<Layout component={<CreateAndEditPost />} />}
          />
          <Route
            path={'/edit/post/:no'}
            element={<Layout component={<CreateAndEditPost />} />}
          />
          <Route
            path={`/support/:name`}
            element={<Layout component={<Notice />} />}
          />
          <Route
            path={'/inquire'}
            element={<Layout component={<Inquire />} />}
          />
          <Route
            path={'/success'}
            element={<Layout component={<InquireSuccess />} />}
          />
          <Route
            path={'/users/password/forget'}
            element={<Layout component={<ChangePassword />} />}
          />
        </Routes>
      </Suspense>
      <Visit />
      <Edit />
      <LoginModal />
      <ReportModal />
      <Popup />
    </Router>
  );
};

export default App;
