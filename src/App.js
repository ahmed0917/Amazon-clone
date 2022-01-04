import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'

function App() {
  return (
    <>
      <Header/>
      <Home/>


      {/* <Router>
        <Routes>
          <Route exact path="/" element={<Header />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router> */}
    </>
  )
}

export default App;
