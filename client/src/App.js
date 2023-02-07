import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { Routes, Route } from "react-router-dom";

import MainPage from './components/MainPage';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/addPage' element={<AddPage />}></Route>
        <Route path='/editPage/:id' element={<EditPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;