import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { injectGlobal } from '@emotion/css';
import { Layout } from './styles';
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
`;

function App() {
  const name: string = 'hg';

  return (
    <Router>
      <Routes>
        <Route path="/hg" element={<Layout component={<HG />} />} />
        <Route
          path="/hl"
          element={<Layout component={<div>{'테스트 페이지'}</div>} />}
        />
        <Route
          path="/sj"
          element={<Layout component={<div>{'테스트 '}</div>} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
