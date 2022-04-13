import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Layout from './styles/Layout/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hg" element={<div>123</div>} />
        <Route path="/hl" element={<div>{'하람 테스트 페이지'}</div>} />
        <Route path="/sj" element={<div>{'성제 테스트 페이지'}</div>} />
      </Routes>
    </Router>
  );
}

export default App;
