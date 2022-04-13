import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './styles';

function App() {
  const name: string = 'hg';

  return (
    <Router>
      <Routes>
        <Route
          path="/hg"
          element={<Layout component={<div>{'테스트 페이지'}</div>} />}
        />
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
