import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { injectGlobal } from '@emotion/css';
import { Layout } from './styles';
import { HG, Home } from './pages';

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    -webkit-box-sizing: border-box;
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
        <Route path="/" element={<Layout main component={<Home />} />} />
        <Route path="/hg" element={<Layout component={<HG />} />} />
        <Route path="/hl" element={<Layout component={<div />} />} />
        <Route path="/sj" element={<Layout component={<div />} />} />
      </Routes>
    </Router>
  );
}

export default App;
