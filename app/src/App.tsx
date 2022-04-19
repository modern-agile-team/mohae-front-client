import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { injectGlobal } from '@emotion/css';
import { DefaultLayout, MainLayout } from './styles';
import { HG } from './pages/test';

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    box-sizing: border-box; 
  }
  button {
    cursor: pointer;
  } 
  ul {
    list-style: none;
  }
  a, a:visited, a:link {
    text-decoration: none;
  }

`;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout component={<HG />} />} />
        <Route path="/hg" element={<DefaultLayout component={<HG />} />} />
        <Route
          path="/hl"
          element={<DefaultLayout component={<div>{'테스트 페이지'}</div>} />}
        />
        <Route
          path="/sj"
          element={<DefaultLayout component={<div>{'테스트 '}</div>} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
